"use client";

import { useProdutosContext } from "@/contexts/ProdutosContext";
import { useMemo } from "react";

export function useEstatisticasProdutos() {
  const { produtos } = useProdutosContext();

  const estatisticas = useMemo(() => {
    const total = produtos.length;
    const ativos = produtos.filter((p) => p.ativo).length;
    const inativos = total - ativos;

    // Estatísticas de preço
    const precos = produtos
      .map((p) => p.precoBase)
      .filter(
        (preco): preco is number => typeof preco === "number" && preco > 0,
      );

    const precoMedio =
      precos.length > 0
        ? precos.reduce((acc, preco) => acc + preco, 0) / precos.length
        : 0;

    const precoMinimo = precos.length > 0 ? Math.min(...precos) : 0;
    const precoMaximo = precos.length > 0 ? Math.max(...precos) : 0; // Produtos por descrição (simulando categorias)
    const categorias = produtos.reduce(
      (acc, produto) => {
        // Como não temos categoria, vamos agrupar por primeira palavra da descrição
        const primeiraDescricao =
          produto.descricao?.split(" ")[0] || "Sem categoria";
        acc[primeiraDescricao] = (acc[primeiraDescricao] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Produtos mais caros (top 5)
    const produtosMaisCaros = produtos
      .filter((p) => p.precoBase && p.precoBase > 0)
      .sort((a, b) => (b.precoBase || 0) - (a.precoBase || 0))
      .slice(0, 5);

    // Produtos mais baratos (top 5)
    const produtosMaisBaratos = produtos
      .filter((p) => p.precoBase && p.precoBase > 0)
      .sort((a, b) => (a.precoBase || 0) - (b.precoBase || 0))
      .slice(0, 5);

    // Porcentagens
    const porcentagemAtivos = total > 0 ? (ativos / total) * 100 : 0;
    const porcentagemInativos = total > 0 ? (inativos / total) * 100 : 0;

    return {
      // Contadores básicos
      total,
      ativos,
      inativos,

      // Porcentagens
      porcentagemAtivos: Math.round(porcentagemAtivos * 100) / 100,
      porcentagemInativos: Math.round(porcentagemInativos * 100) / 100,

      // Estatísticas de preço
      precoMedio: Math.round(precoMedio * 100) / 100,
      precoMinimo,
      precoMaximo,

      // Agrupamentos
      categorias,
      produtosMaisCaros,
      produtosMaisBaratos,

      // Status
      temProdutos: total > 0,
      temProdutosAtivos: ativos > 0,
      temProdutosSemPreco: produtos.some(
        (p) => !p.precoBase || p.precoBase <= 0,
      ),
    };
  }, [produtos]);

  // Função para obter produtos em uma faixa de preço
  const getProdutosPorFaixaPreco = (min: number, max: number) => {
    return produtos.filter((produto) => {
      const preco = produto.precoBase || 0;
      return preco >= min && preco <= max;
    });
  };
  // Função para obter produtos por categoria
  const getProdutosPorCategoria = (categoria: string) => {
    return produtos.filter((produto) =>
      produto.descricao?.toLowerCase().includes(categoria.toLowerCase()),
    );
  };

  // Função para formatar estatísticas como texto
  const getResumoEstatisticas = () => {
    const { total, ativos, inativos, precoMedio, porcentagemAtivos } =
      estatisticas;

    return {
      resumoGeral: `${total} produtos cadastrados (${ativos} ativos, ${inativos} inativos)`,
      resumoPrecos: `Preço médio: R$ ${precoMedio
        .toFixed(2)
        .replace(".", ",")}`,
      resumoStatus: `${porcentagemAtivos.toFixed(
        1,
      )}% dos produtos estão ativos`,
    };
  };

  return {
    ...estatisticas,
    getProdutosPorFaixaPreco,
    getProdutosPorCategoria,
    getResumoEstatisticas,
  };
}
