"use client";

import { useProdutosContext } from "@/contexts/ProdutosContext";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { useMemo, useState } from "react";

export function useBuscaProdutos() {
  const { produtos, buscarProdutos } = useProdutosContext();
  const [termoBusca, setTermoBusca] = useState("");

  // Resultados da busca baseados no termo atual
  const resultadosBusca = useMemo(() => {
    if (!termoBusca.trim()) {
      return produtos;
    }
    return buscarProdutos(termoBusca);
  }, [produtos, termoBusca, buscarProdutos]);

  // Filtrar apenas produtos ativos dos resultados
  const resultadosAtivos = useMemo(() => {
    return resultadosBusca.filter((produto) => produto.ativo);
  }, [resultadosBusca]);

  // Filtrar apenas produtos inativos dos resultados
  const resultadosInativos = useMemo(() => {
    return resultadosBusca.filter((produto) => !produto.ativo);
  }, [resultadosBusca]);
  // Buscar por categoria específica (se o produto tiver categoria no futuro)
  const buscarPorCategoria = (categoria: string): ProdutoResponseDto[] => {
    return produtos.filter((produto) =>
      produto.descricao?.toLowerCase().includes(categoria.toLowerCase()),
    );
  };

  // Buscar por faixa de preço
  const buscarPorPreco = (
    precoMin: number,
    precoMax: number,
  ): ProdutoResponseDto[] => {
    return produtos.filter((produto) => {
      const preco = produto.precoBase || 0;
      return preco >= precoMin && preco <= precoMax;
    });
  };

  // Limpar busca
  const limparBusca = () => {
    setTermoBusca("");
  };

  return {
    termoBusca,
    setTermoBusca,
    resultadosBusca,
    resultadosAtivos,
    resultadosInativos,
    buscarPorCategoria,
    buscarPorPreco,
    limparBusca,
    totalResultados: resultadosBusca.length,
    totalAtivos: resultadosAtivos.length,
    totalInativos: resultadosInativos.length,
  };
}
