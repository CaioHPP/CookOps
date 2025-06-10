"use client";

import { useWebSocketContext } from "@/contexts/WebSocketContext";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { useEffect, useRef } from "react";

interface UseProdutoWebSocketProps {
  onProdutoCriado?: (produto: ProdutoResponseDto) => void;
  onProdutoAtualizado?: (produto: ProdutoResponseDto) => void;
  onProdutoRemovido?: (produtoId: string) => void;
  onProdutoStatusAlterado?: (produto: ProdutoResponseDto) => void;
  enabled?: boolean;
}

export function useProdutoWebSocket({
  onProdutoCriado,
  onProdutoAtualizado,
  onProdutoRemovido,
  onProdutoStatusAlterado,
  enabled = true,
}: UseProdutoWebSocketProps) {
  const { subscribe, unsubscribe, isConnected } = useWebSocketContext();
  const idRef = useRef(`produto-ws-${Math.random().toString(36).substr(2, 9)}`);
  useEffect(() => {
    if (!enabled) return;

    const id = idRef.current;
    const callbacks = {
      onProdutoCriado: (
        data: { type: "PRODUTO_CRIADO"; produto: unknown } | undefined
      ) => {
        console.log("useProdutoWebSocket - Produto criado:", data);
        if (data?.produto && onProdutoCriado) {
          onProdutoCriado(data.produto as ProdutoResponseDto);
        }
      },
      onProdutoAtualizado: (
        data: { type: "PRODUTO_ATUALIZADO"; produto: unknown } | undefined
      ) => {
        console.log("useProdutoWebSocket - Produto atualizado:", data);
        if (data?.produto && onProdutoAtualizado) {
          onProdutoAtualizado(data.produto as ProdutoResponseDto);
        }
      },
      onProdutoRemovido: (
        data: { type: "PRODUTO_REMOVIDO"; produtoId: string } | undefined
      ) => {
        console.log("useProdutoWebSocket - Produto removido:", data);
        if (data?.produtoId && onProdutoRemovido) {
          onProdutoRemovido(data.produtoId);
        }
      },
      onProdutoStatusAlterado: (
        data: { type: "PRODUTO_STATUS_ALTERADO"; produto: unknown } | undefined
      ) => {
        console.log("useProdutoWebSocket - Status do produto alterado:", data);
        if (data?.produto && onProdutoStatusAlterado) {
          onProdutoStatusAlterado(data.produto as ProdutoResponseDto);
        }
      },
    };

    subscribe(id, callbacks);

    return () => {
      unsubscribe(id);
    };
  }, [
    enabled,
    onProdutoCriado,
    onProdutoAtualizado,
    onProdutoRemovido,
    onProdutoStatusAlterado,
    subscribe,
    unsubscribe,
  ]);
  return {
    isConnected,
  };
}
