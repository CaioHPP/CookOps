"use client";

import { BoardService } from "@/api/services/board.service";
import { useAuth } from "@/hooks/useAuth";
import { usePedidos } from "@/hooks/usePedidos";
import { usePedidoStatus } from "@/hooks/usePedidoStatus";
import { useWebSocket } from "@/hooks/useWebSocket";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { BoardConfigDialog } from "./BoardConfigDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BoardSelector } from "./BoardSelector";
import { FilterArea } from "./FilterArea";
import { KanbanBoard } from "./KanbanBoard";


interface WebSocketMessage {
  acao: string;
  pedidoId: string;
  data?: unknown;
}

export function ProductionKanban() {
  // Estados
  const { empresaId } = useAuth();
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isBoardConfigOpen, setIsBoardConfigOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<BoardResponseDto | null>(null);
  // Board state

  // Hooks personalizados
  const { concluirPedido } = usePedidos();
  const {
    statusList: statusColumns,
    loading: statusLoading,
    error: statusError,
    mostrarConcluidos,
    alternarMostrarConcluidos,
    obterUltimoStatus,
    atualizarAposMudanca,
    moverPedidoOtimista,
    reverterMovimentacaoPedido,
    concluirPedidoOtimista,
  } = usePedidoStatus(selectedBoard);

  // WebSocket
  const { isConnected } = useWebSocket({
    empresaId,
    onPedidoCriado: (message: WebSocketMessage) => {
      console.log("Pedido criado via WebSocket:", message.pedidoId);
      atualizarAposMudanca(true);
    },
    onPedidoAtualizado: () => {
      console.log("Pedido atualizado via WebSocket");
      atualizarAposMudanca(true);
    },
    onPedidoConcluido: (message: WebSocketMessage) => {
      console.log("Pedido concluído via WebSocket:", message.pedidoId);
      atualizarAposMudanca(true);
    },
    onPedidoMovido: () => {
      console.log("Pedido movido via WebSocket");
      atualizarAposMudanca(true);
    },
    enabled: !!selectedBoard,
  });

  // Funções auxiliares
  const getEstatisticas = () => {
    if (!statusColumns) {
      return { totalPedidos: 0, pedidosAtrasados: 0 };
    }

    const total = statusColumns.reduce((acc, column) => acc + column.pedidos.length, 0);
    const agora = new Date();
    
    // Tempo padrão de 30 minutos para considerar um pedido atrasado
    const TEMPO_PADRAO_MINUTOS = 30;
    
    const atrasados = statusColumns.reduce((acc, column) => {
      if (!column.pedidos) return acc;
      
      return acc + column.pedidos.filter(pedido => {
        if (pedido.concluidoEm) return false; // Pedidos concluídos não contam como atrasados
        
        const dataCriacao = new Date(pedido.criadoEm);
        const tempoDecorridoMinutos = (agora.getTime() - dataCriacao.getTime()) / (1000 * 60);
        
        return tempoDecorridoMinutos > TEMPO_PADRAO_MINUTOS;
      }).length;
    }, 0);

    return { totalPedidos: total, pedidosAtrasados: atrasados };
  };

  const handleRefresh = () => {
    atualizarAposMudanca(true);
  };

  const handleBoardChange = (boardId: string) => {
    setSelectedBoard(boardId);
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await concluirPedido(orderId);
      concluirPedidoOtimista(orderId);
      toast.success("Pedido concluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao concluir pedido");
      console.error("Erro ao concluir pedido:", error);
    }
  };

  const handleBoardCreated = async () => {
    try {
      const boardsData = await BoardService.getBoardsByEmpresa();
      setBoards(boardsData);

      if (boardsData.length === 1) {
        setSelectedBoard(boardsData[0].id);
      }
    } catch (error) {
      console.error("Erro ao atualizar lista de boards:", error);
      toast.error("Erro ao atualizar lista de boards");
    }
  };

  const handleSaveBoard = async (data: { titulo: string; status: { id: string; titulo: string; }[] }) => {
    try {
      // Criar novo board
      await BoardService.addBoard({
        titulo: data.titulo,
        status: data.status.map((s) => s.titulo),
      });
      toast.success("Board criado com sucesso!");

      // Recarregar lista de boards
      const boardsData = await BoardService.getBoardsByEmpresa();
      setBoards(boardsData);

      if (!selectedBoard && boardsData.length > 0) {
        setSelectedBoard(boardsData[0].id);
      }

      setIsBoardConfigOpen(false);
    } catch (error) {
      console.error("Erro ao salvar board:", error);
      toast.error("Erro ao salvar board");
    }
  };

  // Board management is now handled in the configuration section

  // Effects
  useEffect(() => {
    const loadBoards = async () => {
      try {
        setLoading(true);
        setError("");

        // Verificar token
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Não autorizado. Por favor, faça login novamente.");
        }

        const boardsData = await BoardService.getBoardsByEmpresa();
        console.log("Boards carregados:", boardsData);

        if (!boardsData || !Array.isArray(boardsData)) {
          throw new Error("Resposta inválida do servidor: boards não encontrados");
        }

        setBoards(boardsData);

        if (boardsData.length > 0) {
          setSelectedBoard(boardsData[0].id);
        } else {
          setError("Nenhum board encontrado. Crie um novo board para começar.");
        }
      } catch (error) {
        const errorMessage = 
          (error instanceof Error ? error.message : "Erro ao carregar boards. Tente novamente.");
        
        console.error("Erro detalhado ao carregar boards:", {
          error,
          message: errorMessage,
          token: sessionStorage.getItem("token") ? "Presente" : "Ausente",
          empresaId: sessionStorage.getItem("empresaId")
        });
        
        setError(errorMessage);
        setBoards([]);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

  // Valores computados
  const { totalPedidos, pedidosAtrasados } = getEstatisticas();
  const combinedError = error || statusError;
  const isLoading = loading || statusLoading;
  const ultimoStatus = obterUltimoStatus();

  return (
    <div className="h-full flex flex-col">
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
              onClick={() => {
                setEditingBoard(null);
                setIsBoardConfigOpen(true);
              }}
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
            />
          </div>
        </div>

        {selectedBoard && (
          <FilterArea
            mostrarConcluidos={mostrarConcluidos}
            onToggleConcluidos={alternarMostrarConcluidos}
          />
        )}
      </div>

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
            lastStatusId={ultimoStatus?.statusId}
            onMoveOrder={(orderId, fromStatusId, toStatusId) => {
              console.log("Pedido movido:", {
                orderId,
                fromStatusId,
                toStatusId,
              });
              moverPedidoOtimista(orderId, fromStatusId, toStatusId);
            }}
            onMoveError={(orderId, fromStatusId, toStatusId) => {
              console.log("Erro ao mover pedido, revertendo:", {
                orderId,
                fromStatusId,
                toStatusId,
              });
              reverterMovimentacaoPedido(orderId, fromStatusId, toStatusId);
            }}
            onCompleteOrder={handleCompleteOrder}
          />
        )}
      </div>

      <BoardConfigDialog
        open={isBoardConfigOpen}
        onOpenChange={setIsBoardConfigOpen}
        onSave={handleSaveBoard}
      />
    </div>
  );
}
export default ProductionKanban;
