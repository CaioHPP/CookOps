"use client";

import { PedidoService } from "@/api/services/pedido.service";
import { Order } from "@/components/OrderPanel/types";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./useAuth";
import { usePedidoWebSocket } from "./usePedidoWebSocket";

export interface PedidosPageFilters {
  todos: boolean; // Pedidos de balcão + app que precisam de confirmação
  balcao: boolean; // Apenas pedidos de balcão
  app: boolean; // Apenas pedidos de app que precisam de confirmação
}

export function usePedidosPage() {
  const [pedidosData, setpedidosData] = useState<PedidoResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Estados de loading para ações específicas
  const [confirmarLoading, setConfirmarLoading] = useState<Set<string>>(
    new Set()
  );
  const [cancelarLoading, setCancelarLoading] = useState<Set<string>>(
    new Set()
  );

  const info = useAuth();
  const empresaId = info.empresaId;

  // Carregar dados do status com pedidos das últimas horas
  const carregarPedidosStatusItens = useCallback(async () => {
    try {
      const data = await PedidoService.getPedidosByEmpresaWithTimeLimit();

      setpedidosData(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar pedidos";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []); // Confirmar pedido com atualização otimista
  const confirmarPedido = useCallback(
    async (pedidoId: string) => {
      // Adicionar loading para este pedido específico
      setConfirmarLoading((prev) => new Set(prev).add(pedidoId));

      try {
        // 1. Atualização otimista - atualizar UI imediatamente
        setpedidosData((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === pedidoId
              ? {
                  ...pedido,
                  confirmado: true,
                  dataConfirmacao: new Date().toISOString(),
                }
              : pedido
          )
        );

        // 2. Mostrar feedback de sucesso imediatamente
        toast.success("Pedido confirmado com sucesso!");

        // 3. Fazer a chamada da API em background (silenciosamente)
        await PedidoService.confirmarPedido(pedidoId);

        // 4. Atualizar dados para garantir consistência (silencioso)
        await carregarPedidosStatusItens();
      } catch (err: unknown) {
        // 5. Em caso de erro, reverter a mudança otimista
        setpedidosData((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === pedidoId
              ? {
                  ...pedido,
                  confirmado: false,
                  dataConfirmacao: undefined,
                }
              : pedido
          )
        );

        const errorMessage =
          err instanceof Error ? err.message : "Erro ao confirmar pedido";
        toast.error(errorMessage);
      } finally {
        // Remover loading para este pedido específico
        setConfirmarLoading((prev) => {
          const newSet = new Set(prev);
          newSet.delete(pedidoId);
          return newSet;
        });
      }
    },
    [carregarPedidosStatusItens]
  ); // Cancelar pedido com atualização otimista
  const cancelarPedido = useCallback(
    async (pedidoId: string) => {
      // Adicionar loading para este pedido específico
      setCancelarLoading((prev) => new Set(prev).add(pedidoId));

      try {
        // 1. Atualização otimista - remover pedido da UI imediatamente
        setpedidosData((prevPedidos) =>
          prevPedidos.filter((pedido) => pedido.id !== pedidoId)
        );

        // 2. Mostrar feedback de sucesso imediatamente
        toast.success("Pedido cancelado com sucesso!");

        // 3. Fazer a chamada da API em background (silenciosamente)
        await PedidoService.deletePedido(pedidoId);

        // 4. Atualizar dados para garantir consistência (silencioso)
        await carregarPedidosStatusItens();
      } catch {
        // 5. Em caso de erro, restaurar pedido na lista
        toast.error("Erro ao cancelar pedido. Atualizando lista...");

        // Recarregar dados para restaurar o estado correto
        await carregarPedidosStatusItens();
      } finally {
        // Remover loading para este pedido específico
        setCancelarLoading((prev) => {
          const newSet = new Set(prev);
          newSet.delete(pedidoId);
          return newSet;
        });
      }
    },
    [carregarPedidosStatusItens]
  );

  // Calcular tempo restante para confirmação
  const calcularTempoRestanteConfirmacao = useCallback(
    (pedido: PedidoResponseDto): number => {
      if (!pedido.fonte?.tempoLimiteConfirma) return 0;

      const criadoEm = new Date(pedido.criadoEm);
      const agora = new Date();
      const tempoLimiteMs = pedido.fonte.tempoLimiteConfirma * 60 * 1000; // converter para milissegundos
      const tempoDecorridoMs = agora.getTime() - criadoEm.getTime();
      const tempoRestanteMs = tempoLimiteMs - tempoDecorridoMs;

      return Math.max(0, Math.floor(tempoRestanteMs / (60 * 1000))); // retornar em minutos
    },
    []
  );

  // Formattar tempo restante para exibição
  const formatarTempoRestante = useCallback((minutos: number): string => {
    if (minutos <= 0) return "Expirado";

    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horas > 0) {
      return `${horas}h ${minutosRestantes}m`;
    }

    return `${minutosRestantes}m`;
  }, []);

  // Extrair todos os pedidos do pedidosData
  const todosPedidos = useMemo(() => {
    const pedidos: PedidoResponseDto[] = [];

    pedidosData.forEach((pedido) => {
      // Filtrar pedidos concluídos - não mostrar pedidos com concluidoEm
      if (pedido.concluidoEm) {
        return;
      }

      // Mostrar pedidos confirmados dos últimos 5 minutos
      if (pedido.confirmado) {
        const confirmadoEm = pedido.dataConfirmacao
          ? new Date(pedido.dataConfirmacao)
          : new Date(pedido.criadoEm); // fallback para criadoEm se não tiver dataConfirmacao

        const agora = new Date();
        const diffMinutos =
          (agora.getTime() - confirmadoEm.getTime()) / (1000 * 60);

        if (diffMinutos <= 5) {
          pedidos.push(pedido);
        }
      } else {
        // Mostrar todos os pedidos não confirmados
        pedidos.push(pedido);
      }
    });

    return pedidos;
  }, [pedidosData]);

  // Converter PedidoResponseDto para Order (formato esperado pelo OrderPanel)
  const converterPedidoParaOrder = useCallback(
    (pedido: PedidoResponseDto): Order => {
      const tempoRestante = calcularTempoRestanteConfirmacao(pedido);
      const tempoFormatado = formatarTempoRestante(tempoRestante);

      const order: Order = {
        id: pedido.id,
        codigo: pedido.codigo || "",
        itemCount: pedido.itens?.length || 0,
        totalValue: pedido.valorTotal || 0,
        time: new Date(pedido.criadoEm).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        source: pedido.fonte?.nome || "",
        customerName: undefined,
        customerPhone: undefined,
        items:
          pedido.itens?.map((item) => ({
            id: item.id,
            name: item.produto?.nome || "Item",
            quantity: item.quantidade,
            price: item.precoUnitario,
          })) || [],
        subtotal:
          pedido.valorTotal -
          (pedido.taxaEntrega || 0) -
          (pedido.desconto || 0),
        fees: pedido.taxaEntrega || 0,
        orderTime: new Date(pedido.criadoEm).toLocaleString("pt-BR"),
        needsConfirmation: !pedido.confirmado && pedido.fonte?.exigeConfirmacao,
        timeRemaining: tempoFormatado,
        isExpired: tempoRestante <= 0,
        tempoRestanteMinutos: tempoRestante,
      };

      return order;
    },
    [calcularTempoRestanteConfirmacao, formatarTempoRestante]
  );

  // Filtrar pedidos para cada aba
  const pedidosFiltrados = useMemo(() => {
    const todos: Order[] = [];
    const balcao: Order[] = [];
    const app: Order[] = [];

    // Processar todos os pedidos
    todosPedidos.forEach((pedido) => {
      const order = converterPedidoParaOrder(pedido);
      const isBalcao =
        pedido.fonte?.nome?.toLowerCase() === "balcão" ||
        pedido.fonte?.nome?.toLowerCase() === "balcao";

      if (isBalcao) {
        balcao.push(order);
        todos.push(order);
      } else {
        // Para pedidos de app: mostrar não confirmados que precisam de confirmação
        // E também mostrar confirmados dos últimos 5 minutos
        if (!pedido.confirmado && pedido.fonte?.exigeConfirmacao) {
          app.push(order);
          todos.push(order);
        } else if (pedido.confirmado) {
          // Pedidos confirmados também vão para a aba app e todos
          app.push(order);
          todos.push(order);
        }
      }
    });

    // Ordenar pedidos não confirmados no topo para a aba "Todos"
    todos.sort((a, b) => {
      // Primeiro: pedidos que precisam de confirmação
      if (a.needsConfirmation && !b.needsConfirmation) return -1;
      if (!a.needsConfirmation && b.needsConfirmation) return 1;

      // Entre pedidos que precisam de confirmação: os mais próximos do vencimento primeiro
      if (a.needsConfirmation && b.needsConfirmation) {
        return (a.tempoRestanteMinutos || 0) - (b.tempoRestanteMinutos || 0);
      }

      // Para os demais: mais recentes primeiro
      return (
        new Date(b.orderTime || 0).getTime() -
        new Date(a.orderTime || 0).getTime()
      );
    });

    // Ordenar pedidos de app por tempo restante (mais urgentes primeiro)
    app.sort(
      (a, b) => (a.tempoRestanteMinutos || 0) - (b.tempoRestanteMinutos || 0)
    );

    // Ordenar pedidos de balcão por horário (mais recentes primeiro)
    balcao.sort(
      (a, b) =>
        new Date(b.orderTime || 0).getTime() -
        new Date(a.orderTime || 0).getTime()
    );

    return { todos, balcao, app };
  }, [todosPedidos, converterPedidoParaOrder]);

  // Atualizar dados
  const atualizarDados = useCallback(async () => {
    setLoading(true);
    try {
      await carregarPedidosStatusItens();
    } finally {
      setLoading(false);
    }
  }, [carregarPedidosStatusItens]);

  // Carregar dados na inicialização
  useEffect(() => {
    atualizarDados();
  }, [atualizarDados]);

  // Callbacks do WebSocket
  const handlePedidoCriado = useCallback(() => {
    // Recarregar dados quando um novo pedido for criado
    carregarPedidosStatusItens();
  }, [carregarPedidosStatusItens]);

  const handlePedidoAtualizado = useCallback(() => {
    // Recarregar dados quando um pedido for atualizado
    carregarPedidosStatusItens();
  }, [carregarPedidosStatusItens]);

  const handlePedidoConcluido = useCallback(() => {
    // Recarregar dados quando um pedido for concluído
    carregarPedidosStatusItens();
  }, [carregarPedidosStatusItens]);
  // Integração WebSocket
  const { isConnected: wsConnected } = usePedidoWebSocket({
    onPedidoCriado: handlePedidoCriado,
    onPedidoAtualizado: handlePedidoAtualizado,
    onPedidoConcluido: handlePedidoConcluido,
    enabled: !!empresaId,
  });
  const result = {
    pedidosFiltrados,
    loading,
    error,
    confirmarPedido,
    cancelarPedido,
    atualizarDados,
    calcularTempoRestanteConfirmacao,
    formatarTempoRestante,
    wsConnected,
    // Estados de loading para ações específicas
    isConfirmandoPedido: (pedidoId: string) => confirmarLoading.has(pedidoId),
    isCancelandoPedido: (pedidoId: string) => cancelarLoading.has(pedidoId),
  };

  return result;
}
