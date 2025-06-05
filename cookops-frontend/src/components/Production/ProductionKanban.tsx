"use client";

import { BoardService } from "@/api/services/board.service";
import { useAuth } from "@/hooks/useAuth";
import { usePedidoStatus } from "@/hooks/usePedidoStatus";
import { useWebSocket } from "@/hooks/useWebSocket";
import { obterTempoPreparoMedio } from "@/lib/tempo-utils";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BoardSelector } from "./BoardSelector";
import { KanbanBoard } from "./KanbanBoard";

// Definir interface para WebSocket messages localmente se necessário
interface WebSocketMessage {
  acao: string;
  pedidoId: string;
  data?: unknown;
}

export default function ProductionKanban() {
  const { empresaId } = useAuth();
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Hook para gerenciar status dos pedidos
  const {
    statusList: statusColumns,
    loading: statusLoading,
    error: statusError,
    atualizarAposMudanca,
  } = usePedidoStatus(selectedBoard);
  // WebSocket para atualizações em tempo real
  const { isConnected } = useWebSocket({
    empresaId,
    onPedidoCriado: (message: WebSocketMessage) => {
      console.log("Pedido criado via WebSocket:", message.pedidoId);
      atualizarAposMudanca();
    },
    onPedidoAtualizado: () => {
      console.log("Pedido atualizado via WebSocket");
      atualizarAposMudanca();
    },
    onPedidoConcluido: (message: WebSocketMessage) => {
      console.log("Pedido concluído via WebSocket:", message.pedidoId);
      atualizarAposMudanca();
    },
    onPedidoMovido: () => {
      console.log("Pedido movido via WebSocket");
      atualizarAposMudanca();
    },
    enabled: !!selectedBoard,
  });

  // Carregar boards disponíveis
  useEffect(() => {
    const loadBoards = async () => {
      try {
        console.log("Carregando boards...");
        const boardsData = await BoardService.getBoardsByEmpresa();
        console.log("Boards carregados:", boardsData);

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

  // Função para atualizar após operações
  const handleRefresh = () => {
    atualizarAposMudanca();
  };

  // Obter estatísticas dos pedidos
  const getEstatisticas = () => {
    const totalPedidos = statusColumns.reduce(
      (total, column) => total + column.pedidos.length,
      0
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
            onMoveOrder={(orderId, fromStatusId, toStatusId) => {
              console.log("Pedido movido:", {
                orderId,
                fromStatusId,
                toStatusId,
              });
              handleRefresh();
            }}
          />
        )}
      </div>
    </div>
  );
}
