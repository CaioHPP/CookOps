"use client";

import { ProdutoService } from "@/api/services/produto.service";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export function useProdutos() {
  const [produtos, setProdutos] = useState<ProdutoResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cache para prevenir atualizações duplas em um curto período
  const lastUpdateRef = useRef<Map<string, number>>(new Map());

  // Carregar produtos
  const carregarProdutos = useCallback(async (showToast = true) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProdutoService.getProdutos();
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
        // 0. Verificar se o produto já tem esse status
        const produtoAtual = produtos.find((p) => p.id === id);
        if (produtoAtual?.ativo === ativo) {
          console.log(`Produto ${id} já tem status ${ativo}, ignorando`);
          return true;
        }

        // 1. Atualização otimista - atualizar UI primeiro
        setProdutos((prev) =>
          prev.map((produto) =>
            produto.id === id ? { ...produto, ativo } : produto
          )
        );

        // 2. Fazer chamada API em background (silenciosa)
        await ProdutoService.updateProduto(id, { ativo });

        // 3. Toast de sucesso apenas (sem recarregar)
        toast.success(
          `Produto ${ativo ? "ativado" : "desativado"} com sucesso.`
        );
        return true;
      } catch (err) {
        // 4. Em caso de erro, reverter a mudança otimista
        setProdutos((prev) =>
          prev.map((produto) =>
            produto.id === id ? { ...produto, ativo: !ativo } : produto
          )
        );

        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao atualizar status do produto";
        setError(errorMessage);
        toast.error("Não foi possível atualizar o status do produto.");
        throw err;
      }
    },
    [produtos]
  );

  // Excluir produto
  const excluirProduto = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await ProdutoService.deleteProduto(id);

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
  // Atualizar produto específico (para websockets) - com debounce para evitar atualizações duplas
  const atualizarProduto = useCallback(
    (produtoAtualizado: ProdutoResponseDto) => {
      const now = Date.now();
      const lastUpdate = lastUpdateRef.current.get(produtoAtualizado.id);

      // Se a última atualização foi há menos de 500ms, ignorar (evitar duplicatas)
      if (lastUpdate && now - lastUpdate < 500) {
        console.log(
          `Ignorando atualização duplicada para produto ${produtoAtualizado.id}`
        );
        return;
      }

      // Registrar timestamp da atualização
      lastUpdateRef.current.set(produtoAtualizado.id, now);

      // Limpar timestamps antigos (> 5 segundos) para não crescer indefinidamente
      if (lastUpdateRef.current.size > 100) {
        const cutoff = now - 5000;
        for (const [id, timestamp] of lastUpdateRef.current.entries()) {
          if (timestamp < cutoff) {
            lastUpdateRef.current.delete(id);
          }
        }
      }

      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === produtoAtualizado.id ? produtoAtualizado : produto
        )
      );
    },
    []
  );

  // Adicionar novo produto (para websockets)
  const adicionarProduto = useCallback((novoProduto: ProdutoResponseDto) => {
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
          produto.codigoBarras?.toLowerCase().includes(termoLower) ||
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
