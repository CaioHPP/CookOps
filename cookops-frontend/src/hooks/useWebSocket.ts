"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

interface WebSocketMessage {
  acao: string;
  pedidoId: string;
  data?: unknown;
}

interface UseWebSocketProps {
  empresaId?: string;
  onPedidoCriado?: (message: WebSocketMessage) => void;
  onPedidoAtualizado?: (message: WebSocketMessage) => void;
  onPedidoConcluido?: (message: WebSocketMessage) => void;
  onPedidoMovido?: (message: WebSocketMessage) => void;
  enabled?: boolean;
}

export function useWebSocket({
  empresaId,
  onPedidoCriado,
  onPedidoAtualizado,
  onPedidoConcluido,
  onPedidoMovido,
  enabled = true,
}: UseWebSocketProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectingRef = useRef(false);
  const maxReconnectAttempts = 3; // Limitar tentativas de reconexão

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setIsConnected(false);
  }; // Usar useCallback para estabilizar as referências das funções
  const stableOnPedidoCriado = useRef(onPedidoCriado);
  const stableOnPedidoAtualizado = useRef(onPedidoAtualizado);
  const stableOnPedidoConcluido = useRef(onPedidoConcluido);
  const stableOnPedidoMovido = useRef(onPedidoMovido);

  // Atualizar as referências quando as funções mudarem
  useEffect(() => {
    stableOnPedidoCriado.current = onPedidoCriado;
    stableOnPedidoAtualizado.current = onPedidoAtualizado;
    stableOnPedidoConcluido.current = onPedidoConcluido;
    stableOnPedidoMovido.current = onPedidoMovido;
  }, [onPedidoCriado, onPedidoAtualizado, onPedidoConcluido, onPedidoMovido]);

  useEffect(() => {
    const connectToWebSocket = () => {
      if (!enabled || !empresaId) {
        console.log("WebSocket não habilitado ou empresaId ausente");
        return;
      }

      // Evitar múltiplas conexões
      if (socketRef.current?.connected) {
        console.log("WebSocket já conectado, ignorando tentativa");
        return;
      }

      if (reconnectingRef.current) {
        console.log("Já está tentando reconectar, ignorando");
        return;
      }

      // Marcar que estamos tentando reconectar
      reconnectingRef.current = true;
      console.log("Iniciando conexão WebSocket...");

      try {
        // Desconectar socket existente se houver
        if (socketRef.current) {
          socketRef.current.removeAllListeners();
          socketRef.current.disconnect();
          socketRef.current = null;
        } // URL do WebSocket
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000";
        console.log("Conectando ao WebSocket:", `${wsUrl}/ws/pedidos`);

        // Configurar socket com opções otimizadas para evitar loops
        const socket = io(`${wsUrl}/ws/pedidos`, {
          transports: ["websocket"],
          autoConnect: true,
          reconnection: false, // Desativar reconexão automática
          timeout: 20000, // Aumentar timeout para 20s
          forceNew: true, // Forçar nova conexão
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          console.log("WebSocket conectado com sucesso");
          setIsConnected(true);
          setError(null);
          reconnectAttempts.current = 0;
          reconnectingRef.current = false;

          // Entrar na sala da empresa após conectar
          socket.emit("entrarNaEmpresa", { empresaId });
        });

        socket.on("pedidoCriado", (message: WebSocketMessage) => {
          stableOnPedidoCriado.current?.(message);
          toast.success("Novo pedido criado!");
        });

        socket.on("pedidoAtualizado", (message: WebSocketMessage) => {
          stableOnPedidoAtualizado.current?.(message);
        });

        socket.on("pedidoConcluido", (message: WebSocketMessage) => {
          stableOnPedidoConcluido.current?.(message);
          toast.success("Pedido concluído!");
        });

        socket.on("pedidoMovido", (message: WebSocketMessage) => {
          stableOnPedidoMovido.current?.(message);
        });
        socket.on("disconnect", (reason) => {
          console.log("WebSocket desconectado. Motivo:", reason);
          setIsConnected(false);

          // Resetar o flag de reconexão e tentar reconectar com backoff exponencial
          // apenas se a quantidade de tentativas for menor que o máximo
          if (reconnectAttempts.current < maxReconnectAttempts) {
            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttempts.current),
              10000
            );
            console.log(
              `Tentativa de reconexão ${
                reconnectAttempts.current + 1
              }/${maxReconnectAttempts} em ${delay}ms`
            );

            reconnectingRef.current = false;
            reconnectAttempts.current++;

            reconnectTimeoutRef.current = setTimeout(() => {
              if (!socketRef.current?.connected) {
                console.log("Executando reconexão agendada");
                connectToWebSocket();
              }
            }, delay);
          } else {
            console.log(
              `Máximo de tentativas (${maxReconnectAttempts}) atingido. Parando reconexão.`
            );
            reconnectingRef.current = false;
          }
        });
        socket.on("connect_error", (socketError: Error) => {
          console.error("Erro de conexão WebSocket:", socketError.message);
          setError("Erro na conexão em tempo real");
          setIsConnected(false);

          // Tentar reconectar com backoff exponencial
          if (reconnectAttempts.current < maxReconnectAttempts) {
            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttempts.current),
              10000
            );
            console.log(
              `Tentativa de reconexão após erro ${
                reconnectAttempts.current + 1
              }/${maxReconnectAttempts} em ${delay}ms`
            );

            reconnectingRef.current = false;
            reconnectAttempts.current++;

            reconnectTimeoutRef.current = setTimeout(() => {
              if (!socketRef.current?.connected) {
                console.log("Executando reconexão após erro");
                connectToWebSocket();
              }
            }, delay);
          } else {
            console.log(
              `Máximo de tentativas (${maxReconnectAttempts}) atingido. Parando reconexão.`
            );
            reconnectingRef.current = false;
          }
        });

        socket.on("error", (socketError: Error) => {
          console.error("Erro no WebSocket:", socketError.message);
          setError("Erro na conexão em tempo real");
          reconnectingRef.current = false; // Reset flag on error
        });

        // Evento para confirmar entrada na empresa
        socket.on(
          "empresaEntrada",
          (data: { empresaId: string; success: boolean }) => {
            console.log(
              `Confirmação de entrada na empresa: ${data.empresaId}`,
              data.success
            );

            if (data.success) {
              console.log("Conexão WebSocket estável com a empresa");
            }
          }
        );
      } catch (err) {
        console.error("Erro ao conectar WebSocket:", err);
        setError("Falha ao estabelecer conexão em tempo real");
        reconnectingRef.current = false; // Reset flag on catch
      }
    };

    // Limpar conexão anterior antes de criar nova
    if (socketRef.current) {
      socketRef.current.removeAllListeners();
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    if (enabled && empresaId) {
      // Adicionar pequeno delay para evitar múltiplas tentativas rápidas
      const timeoutId = setTimeout(connectToWebSocket, 100);

      return () => {
        clearTimeout(timeoutId);
        disconnect();
      };
    }

    return () => {
      disconnect();
    };
  }, [enabled, empresaId]); // Remover callbacks das dependências

  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return {
    isConnected,
    error,
    disconnect,
  };
}
