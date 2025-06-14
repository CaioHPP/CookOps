"use client";

import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { useEffect, useState } from "react";

export function WebSocketStatus() {
  const { isConnected, error } = useWebSocketContext();
  const [connectionTime, setConnectionTime] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  useEffect(() => {
    if (isConnected && !connectionTime) {
      setConnectionTime(new Date().toLocaleTimeString());
    }
  }, [isConnected, connectionTime]);

  useEffect(() => {
    if (!isConnected) {
      setConnectionAttempts((prev) => prev + 1);
    }
  }, [isConnected]);

  if (process.env.NODE_ENV !== "development") {
    return null; // Só mostrar em desenvolvimento
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`px-3 py-2 rounded-lg text-sm font-medium ${
          isConnected
            ? "bg-green-100 text-green-800 border border-green-200"
            : error
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>WebSocket: {isConnected ? "Conectado" : "Desconectado"}</span>
        </div>

        {connectionTime && (
          <div className="text-xs opacity-75 mt-1">
            Conectado às {connectionTime}
          </div>
        )}

        {!isConnected && connectionAttempts > 1 && (
          <div className="text-xs opacity-75 mt-1">
            Tentativas: {connectionAttempts}
          </div>
        )}

        {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
      </div>
    </div>
  );
}
