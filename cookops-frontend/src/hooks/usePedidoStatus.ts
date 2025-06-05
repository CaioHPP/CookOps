"use client";

import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export function usePedidoStatus(boardId?: string) {
  // Estado dos dados brutos (sem filtro)
  const [statusListRaw, setStatusListRaw] = useState<
    PedidoStatusResponseWithPedidosAndItensDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mostrarConcluidos, setMostrarConcluidos] = useState(false);

  // Controla se deve ignorar atualizações via WebSocket para evitar loops
  const ignorarProximaAtualizacao = useRef(false);

  // Dados filtrados (computed) - atualiza automaticamente quando filtro muda
  const statusList = useMemo(() => {
    return statusListRaw.map((status) => ({
      ...status,
      pedidos: mostrarConcluidos
        ? status.pedidos
        : status.pedidos.filter((pedido) => !pedido.concluidoEm),
    }));
  }, [statusListRaw, mostrarConcluidos]);

  // Função para alternar filtro de pedidos concluídos (sem recarregar dados)
  const alternarMostrarConcluidos = useCallback(() => {
    setMostrarConcluidos((prev) => !prev);
  }, []);

  // Função para obter o status com maior ordem (último status)
  const obterUltimoStatus = useCallback(() => {
    if (statusList.length === 0) return null;
    return statusList.reduce((maior, status) =>
      status.ordem > maior.ordem ? status : maior
    );
  }, [statusList]);

  // Carregar status com pedidos e itens (agora salva dados brutos)
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

        // Salvar dados brutos (sem filtro) - o useMemo se encarrega da filtragem
        setStatusListRaw(data);
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

  // Função para mover pedido otimisticamente (atualiza dados brutos)
  const moverPedidoOtimista = useCallback(
    (pedidoId: string, fromStatusId: number, toStatusId: number) => {
      setStatusListRaw((prevStatusList) => {
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
        } // Remover pedido do status de origem
        const pedidoIndex = novaLista[fromIndex].pedidos.findIndex(
          (p) => p.id === pedidoId
        );
        if (pedidoIndex !== -1) {
          pedidoMovido = novaLista[fromIndex].pedidos[pedidoIndex];

          // Se o pedido estava concluído, limpar a data de conclusão ao mover
          if (pedidoMovido.concluidoEm) {
            pedidoMovido = {
              ...pedidoMovido,
              concluidoEm: undefined,
            };
          }

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

  // Função para atualizar pedido otimisticamente ao concluir
  const concluirPedidoOtimista = useCallback((pedidoId: string) => {
    setStatusListRaw((prevStatusList) => {
      const novaLista = [...prevStatusList];

      // Encontrar o pedido em qualquer status e atualizar concluidoEm
      for (const status of novaLista) {
        const pedidoIndex = status.pedidos.findIndex((p) => p.id === pedidoId);
        if (pedidoIndex !== -1) {
          status.pedidos[pedidoIndex] = {
            ...status.pedidos[pedidoIndex],
            concluidoEm: new Date().toISOString(),
          };
          break;
        }
      }

      return novaLista;
    });

    // Marcar para ignorar a próxima atualização via WebSocket
    ignorarProximaAtualizacao.current = true;

    // Resetar flag após um tempo para evitar que fique permanentemente true
    setTimeout(() => {
      ignorarProximaAtualizacao.current = false;
    }, 2000);
  }, []);

  // Obter quantidade total de pedidos (usa dados filtrados)
  const getTotalPedidos = useCallback(() => {
    return statusList.reduce(
      (total, status) => total + status.pedidos.length,
      0
    );
  }, [statusList]);

  // Obter pedidos por status (usa dados filtrados)
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
    mostrarConcluidos,
    alternarMostrarConcluidos,
    obterUltimoStatus,
    carregarStatusComPedidosEItens,
    getTotalPedidos,
    getPedidosPorStatus,
    atualizarAposMudanca,
    moverPedidoOtimista,
    reverterMovimentacaoPedido,
    concluirPedidoOtimista,
  };
}
