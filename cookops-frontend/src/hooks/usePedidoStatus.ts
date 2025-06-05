"use client";

import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function usePedidoStatus(boardId?: string) {
  const [statusList, setStatusList] = useState<
    PedidoStatusResponseWithPedidosAndItensDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Carregar status com pedidos e itens
  const carregarStatusComPedidosEItens = useCallback(async () => {
    if (!boardId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await PedidoStatusService.getPedidoStatusWithPedidosAndItens(
        boardId
      );
      setStatusList(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao carregar status dos pedidos";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

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
  const atualizarAposMudanca = useCallback(() => {
    carregarStatusComPedidosEItens();
  }, [carregarStatusComPedidosEItens]);

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
  };
}
