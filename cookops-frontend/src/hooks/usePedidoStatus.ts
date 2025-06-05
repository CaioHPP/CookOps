"use client";

import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function usePedidoStatus(boardId?: string) {
  const [statusList, setStatusList] = useState<
    PedidoStatusResponseWithPedidosAndItensDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controla se deve ignorar atualizações via WebSocket para evitar loops
  const ignorarProximaAtualizacao = useRef(false); // Carregar status com pedidos e itens
  const carregarStatusComPedidosEItens = useCallback(
    async (silencioso = false) => {
      if (!boardId) return;

      try {
        if (!silencioso) {
          setLoading(true);
        }
        setError(null);
        const data =
          await PedidoStatusService.getPedidoStatusWithPedidosAndItens(boardId);
        setStatusList(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao carregar status dos pedidos";
        setError(errorMessage);
        if (!silencioso) {
          toast.error(errorMessage);
        }
      } finally {
        if (!silencioso) {
          setLoading(false);
        }
      }
    },
    [boardId]
  );

  // Função para mover pedido otimisticamente (antes da confirmação da API)
  const moverPedidoOtimista = useCallback(
    (pedidoId: string, fromStatusId: number, toStatusId: number) => {
      setStatusList((prevStatusList) => {
        const novaLista = [...prevStatusList];

        // Encontrar o pedido no status de origem
        let pedidoMovido: PedidoResponseDto | null = null;
        const fromIndex = novaLista.findIndex(
          (status) => status.statusId === fromStatusId
        );
        const toIndex = novaLista.findIndex(
          (status) => status.statusId === toStatusId
        );

        if (fromIndex === -1 || toIndex === -1) {
          console.warn("Status não encontrado para movimentação", {
            fromStatusId,
            toStatusId,
          });
          return prevStatusList;
        }

        // Remover pedido do status de origem
        const pedidoIndex = novaLista[fromIndex].pedidos.findIndex(
          (p) => p.id === pedidoId
        );
        if (pedidoIndex !== -1) {
          pedidoMovido = novaLista[fromIndex].pedidos[pedidoIndex];
          novaLista[fromIndex].pedidos.splice(pedidoIndex, 1);

          // Adicionar pedido ao status de destino
          novaLista[toIndex].pedidos.push(pedidoMovido);
        }

        return novaLista;
      });

      // Marcar para ignorar a próxima atualização via WebSocket
      ignorarProximaAtualizacao.current = true;

      // Resetar flag após um tempo para evitar que fique permanentemente true
      setTimeout(() => {
        ignorarProximaAtualizacao.current = false;
      }, 2000);
    },
    []
  );

  // Função para reverter movimentação em caso de erro
  const reverterMovimentacaoPedido = useCallback(
    (pedidoId: string, fromStatusId: number, toStatusId: number) => {
      // Reverter = mover de volta do destino para a origem
      moverPedidoOtimista(pedidoId, toStatusId, fromStatusId);
    },
    [moverPedidoOtimista]
  );

  // Obter quantidade total de pedidos
  const getTotalPedidos = useCallback(() => {
    return statusList.reduce(
      (total, status) => total + status.pedidos.length,
      0
    );
  }, [statusList]);

  // Obter pedidos por status
  const getPedidosPorStatus = useCallback(
    (statusId: number) => {
      const status = statusList.find((s) => s.statusId === statusId);
      return status?.pedidos || [];
    },
    [statusList]
  );
  // Atualizar lista após mudança de status do pedido
  const atualizarAposMudanca = useCallback(
    (silencioso = false) => {
      // Se deve ignorar esta atualização (movimentação local recente)
      if (ignorarProximaAtualizacao.current) {
        console.log(
          "Ignorando atualização via WebSocket (movimentação local recente)"
        );
        return;
      }

      carregarStatusComPedidosEItens(silencioso);
    },
    [carregarStatusComPedidosEItens]
  );
  // Carregar dados na inicialização
  useEffect(() => {
    if (boardId) {
      carregarStatusComPedidosEItens();
    }
  }, [boardId, carregarStatusComPedidosEItens]);

  return {
    statusList,
    loading,
    error,
    carregarStatusComPedidosEItens,
    getTotalPedidos,
    getPedidosPorStatus,
    atualizarAposMudanca,
    moverPedidoOtimista,
    reverterMovimentacaoPedido,
  };
}
