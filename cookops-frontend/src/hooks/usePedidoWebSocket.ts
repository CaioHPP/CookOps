"use client";

import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useEffect, useRef } from "react";

// Tipos para eventos de pedidos WebSocket
interface PedidoWebSocketData {
  acao: string;
  pedidoId: string;
  data?: unknown;
}

interface UsePedidoWebSocketProps {
  onPedidoCriado?: (message: PedidoWebSocketData) => void;
  onPedidoAtualizado?: (message: PedidoWebSocketData) => void;
  onPedidoConcluido?: (message: PedidoWebSocketData) => void;
  onPedidoMovido?: (message: PedidoWebSocketData) => void;
  enabled?: boolean;
}

export function usePedidoWebSocket({
  onPedidoCriado,
  onPedidoAtualizado,
  onPedidoConcluido,
  onPedidoMovido,
  enabled = true,
}: UsePedidoWebSocketProps) {
  const { subscribe, unsubscribe, isConnected } = useWebSocketContext();
  const idRef = useRef(`pedido-ws-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!enabled) return;

    const id = idRef.current;
    const callbacks = {
      onPedidoCriado: (data: PedidoWebSocketData | undefined) => {
        if (onPedidoCriado && data) {
          onPedidoCriado(data);
        }
      },
      onPedidoAtualizado: (data: PedidoWebSocketData | undefined) => {
        if (onPedidoAtualizado && data) {
          onPedidoAtualizado(data);
        }
      },
      onPedidoConcluido: (data: PedidoWebSocketData | undefined) => {
        if (onPedidoConcluido && data) {
          onPedidoConcluido(data);
        }
      },
      onPedidoMovido: (data: PedidoWebSocketData | undefined) => {
        if (onPedidoMovido && data) {
          onPedidoMovido(data);
        }
      },
    };

    subscribe(id, callbacks);

    return () => {
      unsubscribe(id);
    };
  }, [
    enabled,
    onPedidoCriado,
    onPedidoAtualizado,
    onPedidoConcluido,
    onPedidoMovido,
    subscribe,
    unsubscribe,
  ]);

  return {
    isConnected,
  };
}
