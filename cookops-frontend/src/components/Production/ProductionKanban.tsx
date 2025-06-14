"use client";

import { BoardService } from "@/api/services/board.service";
import { usePedidos } from "@/hooks/usePedidos";
import { usePedidoStatus } from "@/hooks/usePedidoStatus";
import { usePedidoWebSocket } from "@/hooks/usePedidoWebSocket";
import { obterTempoPreparoMedio } from "@/lib/tempo-utils";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BoardSelector } from "./BoardSelector";
import { FilterArea } from "./FilterArea";
import { KanbanBoard } from "./KanbanBoard";
import { NovoBoardDialog } from "./NovoBoardDialog";
import { BoardConfigDialog } from "./BoardConfigDialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

// Definir interface para WebSocket messages localmente se necessário
interface WebSocketMessage {
  acao: string;
  pedidoId: string;
  data?: unknown;
}

export default function ProductionKanban() {
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isNewBoardDialogOpen, setIsNewBoardDialogOpen] = useState(false);
  const [isBoardConfigDialogOpen, setIsBoardConfigDialogOpen] = useState(false);
  const [selectedBoardForConfig, setSelectedBoardForConfig] =
    useState<BoardResponseDto | null>(null);

  // Hook para gerenciar pedidos
  const { concluirPedido } = usePedidos(); // Hook para gerenciar status dos pedidos
  const {
    statusList: statusColumns,
    loading: statusLoading,
    error: statusError,
    mostrarConcluidos,
    alternarMostrarConcluidos,
    fonteSelecionada,
    alterarFonteSelecionada,
    filtroEntrega,
    alterarFiltroEntrega,
    fontesPedido,
    obterUltimoStatus,
    atualizarAposMudanca,
    moverPedidoOtimista,
    reverterMovimentacaoPedido,
    concluirPedidoOtimista,
  } = usePedidoStatus(selectedBoard); // WebSocket para atualizações em tempo real
  const { isConnected } = usePedidoWebSocket({
    onPedidoCriado: (message: WebSocketMessage) => {
      console.log("Pedido criado via WebSocket:", message.pedidoId);
      atualizarAposMudanca(true); // Atualização silenciosa
    },
    onPedidoAtualizado: () => {
      console.log("Pedido atualizado via WebSocket");
      atualizarAposMudanca(true); // Atualização silenciosa
    },
    onPedidoConcluido: (message: WebSocketMessage) => {
      console.log("Pedido concluído via WebSocket:", message.pedidoId);
      atualizarAposMudanca(true); // Atualização silenciosa
    },
    onPedidoMovido: () => {
      console.log("Pedido movido via WebSocket");
      atualizarAposMudanca(true); // Atualização silenciosa
    },
    enabled: !!selectedBoard,
  });

  // Carregar boards disponíveis
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const boardsData = await BoardService.getBoardsByEmpresa();

        if (Array.isArray(boardsData)) {
          setBoards(boardsData);

          // Selecionar o primeiro board automaticamente se houver
          if (boardsData.length > 0) {
            setSelectedBoard(boardsData[0].id);
          }
        } else {
          console.warn("Resposta de boards não é um array:", boardsData);
          setBoards([]);
        }
      } catch (err) {
        console.error("Erro ao carregar boards:", err);
        setError("Erro ao carregar boards. Verifique sua conexão.");
        setBoards([]);
        toast.error("Erro ao carregar boards");
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
  };
  // Função para completar pedido
  const handleCompleteOrder = async (orderId: string) => {
    try {
      // Aplicar mudança otimisticamente primeiro
      concluirPedidoOtimista(orderId);
      toast.success("Pedido concluído com sucesso!");

      // Fazer a chamada para o backend de forma silenciosa
      await concluirPedido(orderId);
    } catch (error) {
      console.error("Erro ao concluir pedido:", error);
      toast.error("Erro ao concluir pedido. Tente novamente.");
      // Em caso de erro, atualizar para reverter mudanças otimistas
      atualizarAposMudanca(true);
    }
  };

  // Obter o último status (com maior ordem)
  const ultimoStatus = obterUltimoStatus();

  // Função para atualizar após operações
  const handleRefresh = () => {
    atualizarAposMudanca();
  };

  // Obter estatísticas dos pedidos
  const getEstatisticas = () => {
    const totalPedidos = statusColumns.reduce(
      (total, column) => total + column.pedidos.length,
      0,
    );

    const pedidosAtrasados = statusColumns.reduce((total, column) => {
      return (
        total +
        column.pedidos.filter((pedido) => {
          if (pedido.concluidoEm) return false;
          const tempoMedio = obterTempoPreparoMedio();
          const agora = new Date();
          const criacao = new Date(pedido.criadoEm);
          const diffMs = agora.getTime() - criacao.getTime();
          const diffMinutos = Math.floor(diffMs / (1000 * 60));
          return diffMinutos > tempoMedio;
        }).length
      );
    }, 0);

    return { totalPedidos, pedidosAtrasados };
  };

  const { totalPedidos, pedidosAtrasados } = getEstatisticas();

  // Mostrar loading se ainda está carregando boards ou status
  const isLoading = loading || statusLoading;

  // Combinar erros
  const combinedError = error || statusError;

  const handleBoardCreated = async () => {
    try {
      const boardsData = await BoardService.getBoardsByEmpresa();
      setBoards(boardsData);

      // Select the newly created board if it's the first one
      if (boardsData.length === 1) {
        setSelectedBoard(boardsData[0].id);
      }
    } catch (error) {
      console.error("Erro ao atualizar lista de boards:", error);
      toast.error("Erro ao atualizar lista de boards");
    }
  };

  const handleConfigureBoard = (board: BoardResponseDto) => {
    setSelectedBoardForConfig(board);
    setIsBoardConfigDialogOpen(true);
  };

  const handleBoardConfigSuccess = async () => {
    // Refresh boards list and status
    await handleBoardCreated();
    atualizarAposMudanca(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header com informações e controles */}
      <div className="border-b border-gray-200 p-4 bg-background">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Produção - Painel Kanban</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>Total de pedidos: {totalPedidos}</span>
              {pedidosAtrasados > 0 && (
                <span className="text-red-600 font-medium">
                  Atrasados: {pedidosAtrasados}
                </span>
              )}
              <span
                className={`flex items-center gap-1 ${
                  isConnected ? "text-green-600" : "text-red-600"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {isConnected ? "Conectado" : "Desconectado"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsNewBoardDialogOpen(true)}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo Board
            </Button>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? "Carregando..." : "Atualizar"}
            </button>
            <BoardSelector
              boards={boards}
              selectedBoard={selectedBoard}
              onBoardChange={handleBoardChange}
              loading={loading}
              onCreateBoard={() => setIsNewBoardDialogOpen(true)}
              onConfigureBoard={handleConfigureBoard}
            />
          </div>
        </div>{" "}
        {/* Área de filtros separada */}
        {selectedBoard && (
          <FilterArea
            mostrarConcluidos={mostrarConcluidos}
            onToggleConcluidos={alternarMostrarConcluidos}
            fonteSelecionada={fonteSelecionada}
            onFonteChange={alterarFonteSelecionada}
            filtroEntrega={filtroEntrega}
            onFiltroEntregaChange={alterarFiltroEntrega}
            fontesPedido={fontesPedido}
          />
        )}
      </div>

      {/* Área de conteúdo */}
      <div className="flex-1 overflow-hidden justify-items-center p-4">
        {combinedError ? (
          <div className="p-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="text-red-800">
                  <h3 className="text-sm font-medium">Erro</h3>
                  <div className="mt-2 text-sm">{combinedError}</div>
                </div>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mt-10"></div>
              <p className="mt-4 text-gray-600">Carregando pedidos...</p>
            </div>
          </div>
        ) : !selectedBoard ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-600">
                Selecione um board para visualizar os pedidos
              </p>
            </div>
          </div>
        ) : (
          <KanbanBoard
            statusColumns={statusColumns}
            loading={statusLoading}
            lastStatusId={ultimoStatus?.id}
            onMoveOrder={(orderId, fromStatusId, toStatusId) => {
              moverPedidoOtimista(orderId, fromStatusId, toStatusId);
            }}
            onMoveError={(
              orderId: string,
              fromStatusId: number,
              toStatusId: number,
            ) => {
              reverterMovimentacaoPedido(orderId, fromStatusId, toStatusId);
            }}
            onCompleteOrder={handleCompleteOrder}
          />
        )}
      </div>

      <NovoBoardDialog
        open={isNewBoardDialogOpen}
        onOpenChange={setIsNewBoardDialogOpen}
        onSuccess={handleBoardCreated}
      />

      <BoardConfigDialog
        open={isBoardConfigDialogOpen}
        onOpenChange={setIsBoardConfigDialogOpen}
        board={selectedBoardForConfig}
        onSuccess={handleBoardConfigSuccess}
      />
    </div>
  );
}
