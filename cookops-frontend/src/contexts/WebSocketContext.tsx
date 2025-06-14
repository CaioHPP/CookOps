"use client";

import { AuthService } from "@/api/services/auth.service";
import {
  useWebSocketManager,
  WebSocketCallbacks,
} from "@/hooks/useWebSocketManager";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface WebSocketContextType {
  isConnected: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  forceDisconnect: () => void;
  subscribe: (id: string, callbacks: WebSocketCallbacks) => void;
  unsubscribe: (id: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  // Obter empresa ID do token
  const empresaId = AuthService.getDecodedToken()?.empresaId;
  const {
    isConnected,
    error,
    connect,
    disconnect,
    forceDisconnect,
    subscribe,
    unsubscribe,
  } = useWebSocketManager({
    empresaId,
    enabled: !!empresaId, // Só habilitar se tiver empresaId
  });
  // Log do status da conexão apenas em desenvolvimento
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `WebSocket Provider - Status: ${
          isConnected ? "Conectado" : "Desconectado"
        }`,
      );
      if (error) {
        console.error("WebSocket Provider - Erro:", error);
      }
    }
  }, [isConnected, error]);
  // Escutar evento de logout para desconectar WebSocket
  useEffect(() => {
    const handleLogout = () => {
      console.log("Evento de logout detectado - desconectando WebSocket");
      forceDisconnect(); // Usar forceDisconnect para logout
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth:logout", handleLogout);

      return () => {
        window.removeEventListener("auth:logout", handleLogout);
      };
    }
  }, [forceDisconnect]);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        error,
        connect,
        disconnect,
        forceDisconnect,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext(): WebSocketContextType {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketContext deve ser usado dentro de um WebSocketProvider",
    );
  }
  return context;
}
