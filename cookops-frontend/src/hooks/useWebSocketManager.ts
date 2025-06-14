"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// Tipos para diferentes tipos de eventos WebSocket
interface WebSocketEventData {
  // Eventos de Pedidos
  pedidoCriado?: {
    acao: string;
    pedidoId: string;
    data?: unknown;
  };
  pedidoAtualizado?: {
    acao: string;
    pedidoId: string;
    data?: unknown;
  };
  pedidoConcluido?: {
    acao: string;
    pedidoId: string;
    data?: unknown;
  };
  pedidoMovido?: {
    acao: string;
    pedidoId: string;
    data?: unknown;
  };

  // Eventos de Produtos
  produtoCriado?: {
    type: "PRODUTO_CRIADO";
    produto: unknown;
  };
  produtoAtualizado?: {
    type: "PRODUTO_ATUALIZADO";
    produto: unknown;
  };
  produtoRemovido?: {
    type: "PRODUTO_REMOVIDO";
    produtoId: string;
  };
  produtoStatusAlterado?: {
    type: "PRODUTO_STATUS_ALTERADO";
    produto: unknown;
  };
}

// Callbacks para diferentes tipos de eventos
export interface WebSocketCallbacks {
  // Callbacks de Pedidos
  onPedidoCriado?: (data: WebSocketEventData["pedidoCriado"]) => void;
  onPedidoAtualizado?: (data: WebSocketEventData["pedidoAtualizado"]) => void;
  onPedidoConcluido?: (data: WebSocketEventData["pedidoConcluido"]) => void;
  onPedidoMovido?: (data: WebSocketEventData["pedidoMovido"]) => void;

  // Callbacks de Produtos
  onProdutoCriado?: (data: WebSocketEventData["produtoCriado"]) => void;
  onProdutoAtualizado?: (data: WebSocketEventData["produtoAtualizado"]) => void;
  onProdutoRemovido?: (data: WebSocketEventData["produtoRemovido"]) => void;
  onProdutoStatusAlterado?: (
    data: WebSocketEventData["produtoStatusAlterado"],
  ) => void;
}

interface UseWebSocketManagerProps {
  empresaId?: string;
  enabled?: boolean;
}

// Singleton para manter uma única conexão WebSocket
class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: Socket | null = null;
  private callbacks: Map<string, WebSocketCallbacks> = new Map();
  private isConnecting = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeoutId: NodeJS.Timeout | null = null;

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }
  connect(empresaId: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.socket?.connected) {
        resolve(true);
        return;
      }

      if (this.isConnecting) {
        // Se já está conectando, esperar um pouco e tentar novamente
        setTimeout(() => resolve(this.socket?.connected || false), 1000);
        return;
      }

      this.isConnecting = true;
      let connectionTimeout: NodeJS.Timeout;

      try {
        // Limpar socket anterior se existir
        if (this.socket) {
          this.socket.removeAllListeners();
          this.socket.disconnect();
          this.socket = null;
        }

        // URL do WebSocket (conectar ao namespace correto)
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000";
        const fullUrl = `${wsUrl}/ws`; // Configurações otimizadas do socket.io
        this.socket = io(fullUrl, {
          transports: ["websocket", "polling"], // Fallback para polling se websocket falhar
          autoConnect: true,
          reconnection: false, // Controlar reconexão manualmente
          timeout: 20000, // Timeout menor para detectar falhas mais rápido
          forceNew: true,
          // Configurações para melhor compatibilidade e performance
          rememberUpgrade: false,
          upgrade: true,
          rejectUnauthorized: false, // Para desenvolvimento
          closeOnBeforeunload: false,
        });

        // Timeout para a conexão inicial
        connectionTimeout = setTimeout(() => {
          if (this.isConnecting) {
            this.isConnecting = false;
            if (process.env.NODE_ENV === "development") {
              console.log("WebSocket Manager - Timeout na conexão inicial");
            }
            resolve(false);
          }
        }, 15000); // 15 segundos de timeout

        this.socket.on("connect", () => {
          clearTimeout(connectionTimeout);
          this.isConnecting = false;
          this.reconnectAttempts = 0;

          if (process.env.NODE_ENV === "development") {
            console.log("WebSocket Manager - Conectado com sucesso");
          }

          // Entrar nas salas necessárias
          this.socket?.emit("entrarNaEmpresa", { empresaId });
          resolve(true);
        });

        this.socket.on("disconnect", (reason) => {
          clearTimeout(connectionTimeout);
          this.isConnecting = false;

          if (process.env.NODE_ENV === "development") {
            console.log("WebSocket Manager - Desconectado:", reason);
          }

          // Só tentar reconectar se não foi uma desconexão intencional
          if (reason !== "io client disconnect") {
            this.handleReconnection(empresaId);
          }
        });

        this.socket.on("connect_error", (error) => {
          clearTimeout(connectionTimeout);
          this.isConnecting = false;

          if (process.env.NODE_ENV === "development") {
            console.log("WebSocket Manager - Erro de conexão:", error.message);
          }

          // Tentar reconectar em caso de erro
          this.handleReconnection(empresaId);
          resolve(false);
        });

        // Configurar listeners para eventos apenas após a conexão
        this.socket.on("connect", () => {
          this.setupPedidosListeners();
          this.setupProdutosListeners();
          this.setupConfirmationListeners();
        });
      } catch (error) {
        clearTimeout(connectionTimeout!);
        console.error("Erro ao conectar WebSocket Manager:", error);
        this.isConnecting = false;
        resolve(false);
      }
    });
  }
  private setupConfirmationListeners() {
    if (!this.socket) return;

    // Confirmação de conexão inicial
    this.socket.on(
      "connection_confirmed",
      (data: { clientId: string; timestamp: string }) => {
        if (process.env.NODE_ENV === "development") {
          console.log("WebSocket Manager - Conexão confirmada:", data);
        }
      },
    );

    // Confirmação de entrada na empresa
    this.socket.on(
      "empresaEntrada",
      (data: { empresaId: string; success: boolean }) => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            `WebSocket Manager - Confirmação de entrada na empresa: ${data.empresaId}`,
            data.success,
          );
        }
      },
    );
  }
  private setupPedidosListeners() {
    if (!this.socket) return;

    this.socket.on("novoPedido", (data: WebSocketEventData["pedidoCriado"]) => {
      this.notifyCallbacks("onPedidoCriado", data);
      toast.success("Novo pedido criado!");
    });

    this.socket.on(
      "pedidoAtualizado",
      (data: WebSocketEventData["pedidoAtualizado"]) => {
        this.notifyCallbacks("onPedidoAtualizado", data);
      },
    );

    this.socket.on(
      "statusPedidoAlterado",
      (data: WebSocketEventData["pedidoConcluido"]) => {
        this.notifyCallbacks("onPedidoConcluido", data);
        if (data?.acao === "concluido") {
          toast.success("Pedido concluído!");
        }
      },
    );
  }
  private setupProdutosListeners() {
    if (!this.socket) return;

    // Escutar eventos de produtos na mesma conexão
    this.socket.on(
      "produtoCriado",
      (data: WebSocketEventData["produtoCriado"]) => {
        this.notifyCallbacks("onProdutoCriado", data);
        toast.success(`Novo produto foi adicionado`);
      },
    );

    this.socket.on(
      "produtoAtualizado",
      (data: WebSocketEventData["produtoAtualizado"]) => {
        this.notifyCallbacks("onProdutoAtualizado", data);
        toast.info(`Produto foi atualizado`);
      },
    );

    this.socket.on(
      "produtoRemovido",
      (data: WebSocketEventData["produtoRemovido"]) => {
        this.notifyCallbacks("onProdutoRemovido", data);
        toast.warning("Um produto foi removido");
      },
    );

    this.socket.on(
      "statusProdutoAlterado",
      (data: WebSocketEventData["produtoStatusAlterado"]) => {
        this.notifyCallbacks("onProdutoStatusAlterado", data);
        toast.info(`Status do produto foi alterado`);
      },
    );
  }
  private notifyCallbacks(event: keyof WebSocketCallbacks, data: unknown) {
    this.callbacks.forEach((callbacks) => {
      const callback = callbacks[event];
      if (callback) {
        (callback as (data: unknown) => void)(data);
      }
    });
  }
  private handleReconnection(empresaId: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "WebSocket Manager - Máximo de tentativas de reconexão atingido",
        );
      }
      toast.error("Não foi possível conectar ao servidor de atualizações");
      return;
    }

    // Limpar timeout anterior se existir
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
    }

    // Backoff exponencial mais agressivo para as primeiras tentativas
    let delay;
    if (this.reconnectAttempts === 0) {
      delay = 500; // Primeira tentativa rápida (500ms)
    } else if (this.reconnectAttempts === 1) {
      delay = 2000; // Segunda tentativa (2s)
    } else {
      delay = Math.min(3000 * Math.pow(1.8, this.reconnectAttempts - 2), 20000);
    }

    this.reconnectAttempts++;

    if (process.env.NODE_ENV === "development") {
      console.log(
        `WebSocket Manager - Tentativa de reconexão ${this.reconnectAttempts}/${this.maxReconnectAttempts} em ${delay}ms`,
      );
    }

    this.reconnectTimeoutId = setTimeout(async () => {
      if (!this.socket?.connected && !this.isConnecting) {
        try {
          await this.connect(empresaId);
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.log(
              "WebSocket Manager - Erro na tentativa de reconexão:",
              error,
            );
          }
        }
      }
    }, delay);
  }

  subscribe(id: string, callbacks: WebSocketCallbacks) {
    this.callbacks.set(id, callbacks);
  }

  unsubscribe(id: string) {
    this.callbacks.delete(id);
  }
  disconnect() {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    this.callbacks.clear();
    this.isConnecting = false;
    this.reconnectAttempts = 0;
  } // Método específico para logout que força a desconexão completa
  forceDisconnect() {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "WebSocket Manager - Forçando desconexão completa para logout",
      );
    }

    // Limpar todos os timeouts
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }

    // Desconectar socket de forma forçada
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.close();
      this.socket.disconnect(); // Força desconexão
      this.socket = null;
    }

    // Limpar completamente
    this.callbacks.clear();
    this.isConnecting = false;
    this.reconnectAttempts = 0;

    // Destruir instância singleton para garantir limpeza completa no próximo acesso
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (WebSocketManager as any).instance = undefined;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Hook para usar o WebSocket Manager
export function useWebSocketManager({
  empresaId,
  enabled = true,
}: UseWebSocketManagerProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const managerRef = useRef<WebSocketManager | undefined>(undefined);

  useEffect(() => {
    managerRef.current = WebSocketManager.getInstance();
  }, []); // Função para conectar
  const connect = useCallback(async () => {
    if (!enabled || !empresaId || !managerRef.current) {
      return;
    }

    try {
      // Primeira tentativa de conexão
      let success = await managerRef.current.connect(empresaId);

      // Se a primeira tentativa falhar, fazer mais algumas tentativas rápidas
      if (!success) {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "WebSocket Manager - Primeira tentativa falhou, tentando novamente...",
          );
        }

        // Esperar um pouco e tentar novamente
        await new Promise((resolve) => setTimeout(resolve, 1500));
        success = await managerRef.current.connect(empresaId);

        // Uma última tentativa se ainda não conectou
        if (!success) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          success = await managerRef.current.connect(empresaId);
        }
      }

      setIsConnected(success);
      if (!success) {
        setError("Falha ao conectar com o servidor");
      } else {
        setError(null);
      }
    } catch (error) {
      setError("Erro ao estabelecer conexão");
      setIsConnected(false);
      if (process.env.NODE_ENV === "development") {
        console.error("WebSocket Manager - Erro na conexão:", error);
      }
    }
  }, [enabled, empresaId]);
  // Função para desconectar
  const disconnect = useCallback(() => {
    if (managerRef.current) {
      managerRef.current.disconnect();
      setIsConnected(false);
    }
  }, []);

  // Função para logout (desconexão forçada)
  const forceDisconnect = useCallback(() => {
    if (managerRef.current) {
      managerRef.current.forceDisconnect();
      setIsConnected(false);
      setError(null);
    }
  }, []);

  // Função para subscrever callbacks
  const subscribe = useCallback((id: string, callbacks: WebSocketCallbacks) => {
    if (managerRef.current) {
      managerRef.current.subscribe(id, callbacks);
    }
  }, []);

  // Função para cancelar subscrição
  const unsubscribe = useCallback((id: string) => {
    if (managerRef.current) {
      managerRef.current.unsubscribe(id);
    }
  }, []); // Conectar automaticamente quando habilitado
  useEffect(() => {
    if (enabled && empresaId) {
      // Delay inicial menor para primeira tentativa
      const timeoutId = setTimeout(() => {
        connect();
      }, 500); // 500ms de delay inicial

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return () => {
      // Não desconectar aqui para manter a conexão entre páginas
    };
  }, [enabled, empresaId, connect]);

  // Verificar status de conexão periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (managerRef.current) {
        const connected = managerRef.current.isConnected();
        if (connected !== isConnected) {
          setIsConnected(connected);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);
  return {
    isConnected,
    error,
    connect,
    disconnect,
    forceDisconnect,
    subscribe,
    unsubscribe,
  };
}
