"use client";

import { useProdutos } from "@/hooks/useProdutos";
import { useProdutoWebSocket } from "@/hooks/useProdutoWebSocket";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface ProdutosContextType {
  produtos: ProdutoResponseDto[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  carregarProdutos: (showToast?: boolean) => Promise<ProdutoResponseDto[]>;
  toggleStatusProduto: (id: string, ativo: boolean) => Promise<boolean>;
  excluirProduto: (id: string) => Promise<boolean>;
  atualizarProduto: (produto: ProdutoResponseDto) => void;
  adicionarProduto: (produto: ProdutoResponseDto) => void;
  removerProduto: (produtoId: string) => void;
  getProdutoById: (id: string) => ProdutoResponseDto | undefined;
  buscarProdutos: (termo: string) => ProdutoResponseDto[];
  formatarPreco: (price: number | null | undefined) => string;
}

const ProdutosContext = createContext<ProdutosContextType | undefined>(
  undefined,
);

interface ProdutosProviderProps {
  children: ReactNode;
}

export function ProdutosProvider({ children }: ProdutosProviderProps) {
  const produtosHook = useProdutos();
  // Configurar WebSocket para receber atualizações em tempo real
  useProdutoWebSocket({
    onProdutoCriado: produtosHook.adicionarProduto,
    onProdutoAtualizado: produtosHook.atualizarProduto,
    onProdutoRemovido: produtosHook.removerProduto,
    onProdutoStatusAlterado: produtosHook.atualizarProduto,
    enabled: true,
  }); // Carregar produtos na inicialização
  useEffect(() => {
    if (!produtosHook.isInitialized) {
      produtosHook.carregarProdutos(false); // Não mostrar toast no carregamento inicial
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produtosHook.isInitialized, produtosHook.carregarProdutos]);

  return (
    <ProdutosContext.Provider value={produtosHook}>
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutosContext(): ProdutosContextType {
  const context = useContext(ProdutosContext);
  if (context === undefined) {
    throw new Error(
      "useProdutosContext deve ser usado dentro de um ProdutosProvider",
    );
  }
  return context;
}
