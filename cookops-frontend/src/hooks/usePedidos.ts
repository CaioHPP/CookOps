"use client";

import { PedidoService } from "@/api/services/pedido.service";
import {
  calcularTempoDecorrido,
  calcularTempoRestante,
  verificarPedidoAtrasado,
} from "@/lib/tempo-utils";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function usePedidos() {
  const [pedidos, setPedidos] = useState<PedidoResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar pedidos da empresa
  const carregarPedidos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PedidoService.getPedidosByEmpresaWithTimeLimit();
      setPedidos(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar pedidos";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Concluir pedido
  const concluirPedido = useCallback(async (pedidoId: string) => {
    try {
      setLoading(true);
      const pedidoAtualizado = await PedidoService.concluirPedido(pedidoId);

      // Atualizar o pedido na lista local
      setPedidos((prev) =>
        prev.map((pedido) =>
          pedido.id === pedidoId ? pedidoAtualizado : pedido,
        ),
      );

      toast.success("Pedido concluído com sucesso!");
      return pedidoAtualizado;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao concluir pedido";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar se pedido está concluído
  const isPedidoConcluido = useCallback((pedido: PedidoResponseDto) => {
    return !!pedido.concluidoEm;
  }, []);
  // Obter tempo decorrido desde a criação do pedido
  const getTempoDecorrido = useCallback((pedido: PedidoResponseDto) => {
    return calcularTempoDecorrido(pedido.criadoEm);
  }, []);

  // Verificar se pedido está atrasado baseado no tempo médio de preparo
  const isPedidoAtrasado = useCallback(
    (pedido: PedidoResponseDto, tempoPreparoMedio?: number) => {
      return verificarPedidoAtrasado(
        pedido.criadoEm,
        pedido.concluidoEm,
        tempoPreparoMedio,
      );
    },
    [],
  );

  // Calcular tempo restante para conclusão
  const getTempoRestante = useCallback(
    (pedido: PedidoResponseDto, tempoPreparoMedio: number) => {
      if (isPedidoConcluido(pedido)) return null;
      return calcularTempoRestante(pedido.criadoEm, tempoPreparoMedio);
    },
    [isPedidoConcluido],
  );

  // Carregar pedidos na inicialização
  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);
  return {
    pedidos,
    loading,
    error,
    carregarPedidos,
    concluirPedido,
    isPedidoConcluido,
    getTempoDecorrido,
    isPedidoAtrasado,
    getTempoRestante,
  };
}
