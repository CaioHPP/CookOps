"use client";

import {
  Produto,
  deleteProduto,
  getProdutos,
  updateProduto,
} from "@/api/produtos";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar produtos
  const carregarProdutos = useCallback(async (showToast = true) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProdutos();
      setProdutos(data);
      setIsInitialized(true);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar produtos";
      setError(errorMessage);
      if (showToast) {
        toast.error("Não foi possível carregar a lista de produtos.");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar status do produto
  const toggleStatusProduto = useCallback(
    async (id: string, ativo: boolean) => {
      try {
        setLoading(true);
        await updateProduto(id, { ativo });

        // Atualizar o produto na lista local
        setProdutos((prev) =>
          prev.map((produto) =>
            produto.id === id ? { ...produto, ativo } : produto
          )
        );

        toast.success(
          `Produto ${ativo ? "ativado" : "desativado"} com sucesso.`
        );
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao atualizar status do produto";
        setError(errorMessage);
        toast.error("Não foi possível atualizar o status do produto.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Excluir produto
  const excluirProduto = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteProduto(id);

      // Remover o produto da lista local
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));

      toast.success("Produto excluído com sucesso.");
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o produto.";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar produto específico (para websockets)
  const atualizarProduto = useCallback((produtoAtualizado: Produto) => {
    setProdutos((prev) =>
      prev.map((produto) =>
        produto.id === produtoAtualizado.id ? produtoAtualizado : produto
      )
    );
  }, []);

  // Adicionar novo produto (para websockets)
  const adicionarProduto = useCallback((novoProduto: Produto) => {
    setProdutos((prev) => {
      // Verificar se o produto já existe para evitar duplicatas
      const existe = prev.some((produto) => produto.id === novoProduto.id);
      if (existe) {
        return prev.map((produto) =>
          produto.id === novoProduto.id ? novoProduto : produto
        );
      }
      return [...prev, novoProduto];
    });
  }, []);

  // Remover produto (para websockets)
  const removerProduto = useCallback((produtoId: string) => {
    setProdutos((prev) => prev.filter((produto) => produto.id !== produtoId));
  }, []);

  // Buscar produto por ID
  const getProdutoById = useCallback(
    (id: string) => {
      return produtos.find((produto) => produto.id === id);
    },
    [produtos]
  );

  // Buscar produtos por filtro de texto
  const buscarProdutos = useCallback(
    (termo: string) => {
      if (!termo.trim()) return produtos;

      const termoLower = termo.toLowerCase();
      return produtos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(termoLower) ||
          produto.codigo.toLowerCase().includes(termoLower) ||
          produto.descricao?.toLowerCase().includes(termoLower)
      );
    },
    [produtos]
  );

  // Formatar preço
  const formatarPreco = useCallback(
    (price: number | null | undefined): string => {
      if (typeof price !== "number") return "R$ 0,00";
      return `R$ ${price.toFixed(2).replace(".", ",")}`;
    },
    []
  );

  return {
    produtos,
    loading,
    error,
    isInitialized,
    carregarProdutos,
    toggleStatusProduto,
    excluirProduto,
    atualizarProduto,
    adicionarProduto,
    removerProduto,
    getProdutoById,
    buscarProdutos,
    formatarPreco,
  };
}
