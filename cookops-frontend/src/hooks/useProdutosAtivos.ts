"use client";
import { useProdutosContext } from "@/contexts/ProdutosContext";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { useMemo } from "react";

export function useProdutosAtivos() {
  const {
    produtos,
    loading,
    error,
    isInitialized,
    carregarProdutos,
    toggleStatusProduto,
    excluirProduto,
    getProdutoById,
    buscarProdutos,
    formatarPreco,
  } = useProdutosContext();

  // Filtrar apenas produtos ativos
  const produtosAtivos = useMemo(() => {
    return produtos.filter((produto) => produto.ativo);
  }, [produtos]);

  // Buscar produtos ativos por termo
  const buscarProdutosAtivos = (termo: string): ProdutoResponseDto[] => {
    const resultados = buscarProdutos(termo);
    return resultados.filter((produto) => produto.ativo);
  };

  // Desativar produto (mudança de status)
  const desativarProduto = async (id: string) => {
    return await toggleStatusProduto(id, false);
  };
  return {
    produtos: produtosAtivos,
    loading,
    error,
    isInitialized,
    carregarProdutos,
    toggleStatusProduto,
    desativarProduto,
    excluirProduto,
    getProdutoById,
    buscarProdutos: buscarProdutosAtivos,
    formatarPreco,
  };
}
