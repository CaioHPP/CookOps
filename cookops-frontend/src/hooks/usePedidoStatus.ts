"use client";

import { FontePedidoService } from "@/api/services/fontepedido.service";
import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { FontePedidoResponseDto } from "@/types/dto/fontepedido/response/fontepedido-response.dto";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// Chaves para session storage
const STORAGE_KEYS = {
  MOSTRAR_CONCLUIDOS: "production-filters-mostrar-concluidos",
  FONTE_SELECIONADA: "production-filters-fonte-selecionada",
  MOSTRAR_ENTREGA: "production-filters-mostrar-entrega",
};

// Tipo para o filtro de entrega
export type TipoFiltroEntrega = "todos" | "apenas-entrega" | "apenas-balcao";

export const OPCOES_FILTRO_ENTREGA = {
  TODOS: "todos" as const,
  APENAS_ENTREGA: "apenas-entrega" as const,
  APENAS_BALCAO: "apenas-balcao" as const,
};

export const LABELS_FILTRO_ENTREGA = {
  todos: "Todos os pedidos",
  "apenas-entrega": "Apenas delivery",
  "apenas-balcao": "Apenas balcão",
};

export function usePedidoStatus(boardId?: string) {
  // Estado dos dados brutos (sem filtro)
  const [statusListRaw, setStatusListRaw] = useState<
    PedidoStatusResponseWithPedidosAndItensDto[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados dos filtros com persistência
  const [mostrarConcluidos, setMostrarConcluidos] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(STORAGE_KEYS.MOSTRAR_CONCLUIDOS);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [fonteSelecionada, setFonteSelecionada] = useState<number | null>(
    () => {
      if (typeof window !== "undefined") {
        const saved = sessionStorage.getItem(STORAGE_KEYS.FONTE_SELECIONADA);
        return saved ? JSON.parse(saved) : null;
      }
      return null;
    }
  );
  const [filtroEntrega, setFiltroEntrega] = useState<TipoFiltroEntrega>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(STORAGE_KEYS.MOSTRAR_ENTREGA);
      return saved ? JSON.parse(saved) : OPCOES_FILTRO_ENTREGA.TODOS;
    }
    return OPCOES_FILTRO_ENTREGA.TODOS;
  });

  // Estado para fontes de pedido
  const [fontesPedido, setFontesPedido] = useState<FontePedidoResponseDto[]>(
    []
  );

  // Controla se deve ignorar atualizações via WebSocket para evitar loops
  const ignorarProximaAtualizacao = useRef(false);
  // Dados filtrados (computed) - atualiza automaticamente quando filtros mudam
  const statusList = useMemo(() => {
    return statusListRaw.map((status) => ({
      ...status,
      pedidos: status.pedidos.filter((pedido) => {
        // Filtro de pedidos concluídos
        if (!mostrarConcluidos && pedido.concluidoEm) {
          return false;
        }

        // Filtro por fonte do pedido
        if (
          fonteSelecionada !== null &&
          pedido.fonte?.id !== fonteSelecionada
        ) {
          return false;
        } // Filtro de pedidos de entrega
        if (
          filtroEntrega === OPCOES_FILTRO_ENTREGA.APENAS_ENTREGA &&
          !pedido.endereco
        ) {
          return false;
        }

        // Filtro de pedidos de balcão
        if (
          filtroEntrega === OPCOES_FILTRO_ENTREGA.APENAS_BALCAO &&
          pedido.endereco
        ) {
          return false;
        }

        return true;
      }),
    }));
  }, [statusListRaw, mostrarConcluidos, fonteSelecionada, filtroEntrega]);

  // Carregar fontes de pedido
  const carregarFontesPedido = useCallback(async () => {
    try {
      const fontes = await FontePedidoService.getFontesPagamento();
      setFontesPedido(fontes);
    } catch (err) {
      console.error("Erro ao carregar fontes de pedido:", err);
    }
  }, []);

  // Função para alternar filtro de pedidos concluídos (com persistência)
  const alternarMostrarConcluidos = useCallback(() => {
    setMostrarConcluidos((prev: boolean) => {
      const newValue = !prev;
      sessionStorage.setItem(
        STORAGE_KEYS.MOSTRAR_CONCLUIDOS,
        JSON.stringify(newValue)
      );
      return newValue;
    });
  }, []);

  // Função para alterar fonte selecionada (com persistência)
  const alterarFonteSelecionada = useCallback((fonteId: number | null) => {
    setFonteSelecionada(fonteId);
    sessionStorage.setItem(
      STORAGE_KEYS.FONTE_SELECIONADA,
      JSON.stringify(fonteId)
    );
  }, []);
  // Função para alterar filtro de entrega (com persistência)
  const alterarFiltroEntrega = useCallback((novoFiltro: TipoFiltroEntrega) => {
    setFiltroEntrega(novoFiltro);
    sessionStorage.setItem(
      STORAGE_KEYS.MOSTRAR_ENTREGA,
      JSON.stringify(novoFiltro)
    );
  }, []);

  // Função para obter o status com maior ordem (último status)
  const obterUltimoStatus = useCallback(() => {
    if (statusList.length === 0) return null;
    return statusList.reduce((maior, status) =>
      status.ordem > maior.ordem ? status : maior
    );
  }, [statusList]);

  // Carregar status com pedidos e itens (agora salva dados brutos)
  const carregarStatusComPedidosEItens = useCallback(
    async (silencioso = false) => {
      if (!boardId) return;

      try {
        if (!silencioso) {
          setLoading(true);
        }
        setError(null);

        const data =
          await PedidoStatusService.getPedidoStatusWithPedidosAndItens(boardId);

        // Salvar dados brutos (sem filtro) - o useMemo se encarrega da filtragem
        setStatusListRaw(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao carregar status dos pedidos";
        setError(errorMessage);
        if (!silencioso) {
          toast.error(errorMessage);
        }
      } finally {
        if (!silencioso) {
          setLoading(false);
        }
      }
    },
    [boardId]
  );

  // Função para mover pedido otimisticamente (atualiza dados brutos)
  const moverPedidoOtimista = useCallback(
    (pedidoId: string, fromStatusId: number, toStatusId: number) => {
      setStatusListRaw((prevStatusList) => {
        const novaLista = [...prevStatusList];

        // Encontrar o pedido no status de origem
        let pedidoMovido: PedidoResponseDto | null = null;
        const fromIndex = novaLista.findIndex(
          (status) => status.statusId === fromStatusId
        );
        const toIndex = novaLista.findIndex(
          (status) => status.statusId === toStatusId
        );

        if (fromIndex === -1 || toIndex === -1) {
          console.warn("Status não encontrado para movimentação", {
            fromStatusId,
            toStatusId,
          });
          return prevStatusList;
        } // Remover pedido do status de origem
        const pedidoIndex = novaLista[fromIndex].pedidos.findIndex(
          (p) => p.id === pedidoId
        );
        if (pedidoIndex !== -1) {
          pedidoMovido = novaLista[fromIndex].pedidos[pedidoIndex];

          // Se o pedido estava concluído, limpar a data de conclusão ao mover
          if (pedidoMovido.concluidoEm) {
            pedidoMovido = {
              ...pedidoMovido,
              concluidoEm: undefined,
            };
          }

          novaLista[fromIndex].pedidos.splice(pedidoIndex, 1);

          // Adicionar pedido ao status de destino
          novaLista[toIndex].pedidos.push(pedidoMovido);
        }

        return novaLista;
      });

      // Marcar para ignorar a próxima atualização via WebSocket
      ignorarProximaAtualizacao.current = true;

      // Resetar flag após um tempo para evitar que fique permanentemente true
      setTimeout(() => {
        ignorarProximaAtualizacao.current = false;
      }, 2000);
    },
    []
  );

  // Função para reverter movimentação em caso de erro
  const reverterMovimentacaoPedido = useCallback(
    (pedidoId: string, fromStatusId: number, toStatusId: number) => {
      // Reverter = mover de volta do destino para a origem
      moverPedidoOtimista(pedidoId, toStatusId, fromStatusId);
    },
    [moverPedidoOtimista]
  );

  // Função para atualizar pedido otimisticamente ao concluir
  const concluirPedidoOtimista = useCallback((pedidoId: string) => {
    setStatusListRaw((prevStatusList) => {
      const novaLista = [...prevStatusList];

      // Encontrar o pedido em qualquer status e atualizar concluidoEm
      for (const status of novaLista) {
        const pedidoIndex = status.pedidos.findIndex((p) => p.id === pedidoId);
        if (pedidoIndex !== -1) {
          status.pedidos[pedidoIndex] = {
            ...status.pedidos[pedidoIndex],
            concluidoEm: new Date().toISOString(),
          };
          break;
        }
      }

      return novaLista;
    });

    // Marcar para ignorar a próxima atualização via WebSocket
    ignorarProximaAtualizacao.current = true;

    // Resetar flag após um tempo para evitar que fique permanentemente true
    setTimeout(() => {
      ignorarProximaAtualizacao.current = false;
    }, 2000);
  }, []);

  // Obter quantidade total de pedidos (usa dados filtrados)
  const getTotalPedidos = useCallback(() => {
    return statusList.reduce(
      (total, status) => total + status.pedidos.length,
      0
    );
  }, [statusList]);

  // Obter pedidos por status (usa dados filtrados)
  const getPedidosPorStatus = useCallback(
    (statusId: number) => {
      const status = statusList.find((s) => s.statusId === statusId);
      return status?.pedidos || [];
    },
    [statusList]
  );

  // Atualizar lista após mudança de status do pedido
  const atualizarAposMudanca = useCallback(
    (silencioso = false) => {
      // Se deve ignorar esta atualização (movimentação local recente)
      if (ignorarProximaAtualizacao.current) {
        console.log(
          "Ignorando atualização via WebSocket (movimentação local recente)"
        );
        return;
      }

      carregarStatusComPedidosEItens(silencioso);
    },
    [carregarStatusComPedidosEItens]
  );
  // Carregar dados na inicialização
  useEffect(() => {
    if (boardId) {
      carregarStatusComPedidosEItens();
    }
  }, [boardId, carregarStatusComPedidosEItens]);

  // Carregar fontes de pedido na inicialização
  useEffect(() => {
    carregarFontesPedido();
  }, [carregarFontesPedido]);
  return {
    statusList,
    loading,
    error,
    mostrarConcluidos,
    fonteSelecionada,
    filtroEntrega,
    fontesPedido,
    alternarMostrarConcluidos,
    alterarFonteSelecionada,
    alterarFiltroEntrega,
    obterUltimoStatus,
    carregarStatusComPedidosEItens,
    getTotalPedidos,
    getPedidosPorStatus,
    atualizarAposMudanca,
    moverPedidoOtimista,
    reverterMovimentacaoPedido,
    concluirPedidoOtimista,
  };
}
