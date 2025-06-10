"use client";

import { Produto } from "@/api/produtos";
import { useProdutosContext } from "@/contexts/ProdutosContext";
import { useMemo } from "react";

export function useProdutosInativos() {
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

  // Filtrar apenas produtos inativos
  const produtosInativos = useMemo(() => {
    return produtos.filter((produto) => !produto.ativo);
  }, [produtos]);

  // Buscar produtos inativos por termo
  const buscarProdutosInativos = (termo: string): Produto[] => {
    const resultados = buscarProdutos(termo);
    return resultados.filter((produto) => !produto.ativo);
  };

  // Ativar produto (mudança de status)
  const ativarProduto = async (id: string) => {
    return await toggleStatusProduto(id, true);
  };
  return {
    produtos: produtosInativos,
    loading,
    error,
    isInitialized,
    carregarProdutos,
    toggleStatusProduto,
    ativarProduto,
    excluirProduto,
    getProdutoById,
    buscarProdutos: buscarProdutosInativos,
    formatarPreco,
  };
}
