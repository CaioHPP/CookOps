// hooks/useChartDrilldown.ts
"use client";

import { DashboardData } from "@/types/dashboard.types";
import { useCallback, useState } from "react";

export interface DrilldownData {
  chartType: string;
  title: string;
  period: string;
  data: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface ChartDrilldownState {
  isOpen: boolean;
  data: DrilldownData | null;
}

export function useChartDrilldown() {
  const [drilldownState, setDrilldownState] = useState<ChartDrilldownState>({
    isOpen: false,
    data: null,
  });

  const openDrilldown = useCallback((data: DrilldownData) => {
    setDrilldownState({
      isOpen: true,
      data,
    });
  }, []);

  const closeDrilldown = useCallback(() => {
    setDrilldownState({
      isOpen: false,
      data: null,
    });
  }, []);

  // Gerar dados de drill-down para diferentes tipos de gráficos
  const generateDrilldownData = useCallback(
    (chartType: string, dashboardData: DashboardData): DrilldownData => {
      switch (chartType) {
        case "vendas":
          return {
            chartType: "vendas",
            title: "Detalhes de Vendas",
            period: "Últimos 30 dias",
            data: [
              {
                periodo: "Semana 1",
                receita: dashboardData.vendas.receitaTotal * 0.25,
                pedidos: Math.round(dashboardData.vendas.totalPedidos * 0.23),
                ticketMedio: dashboardData.vendas.ticketMedio * 0.95,
              },
              {
                periodo: "Semana 2",
                receita: dashboardData.vendas.receitaTotal * 0.28,
                pedidos: Math.round(dashboardData.vendas.totalPedidos * 0.27),
                ticketMedio: dashboardData.vendas.ticketMedio * 1.02,
              },
              {
                periodo: "Semana 3",
                receita: dashboardData.vendas.receitaTotal * 0.22,
                pedidos: Math.round(dashboardData.vendas.totalPedidos * 0.24),
                ticketMedio: dashboardData.vendas.ticketMedio * 0.98,
              },
              {
                periodo: "Semana 4",
                receita: dashboardData.vendas.receitaTotal * 0.25,
                pedidos: Math.round(dashboardData.vendas.totalPedidos * 0.26),
                ticketMedio: dashboardData.vendas.ticketMedio * 1.05,
              },
            ],
            metadata: {
              totalReceita: dashboardData.vendas.receitaTotal,
              totalPedidos: dashboardData.vendas.totalPedidos,
              crescimento: dashboardData.vendas.crescimentoReceita,
            },
          };

        case "performance":
          return {
            chartType: "performance",
            title: "Análise de Performance",
            period: "Últimos 30 dias",
            data: [
              {
                metrica: "Pedidos em Atraso",
                valor: dashboardData.performance.pedidosEmAtraso,
                limite: 5,
                status:
                  dashboardData.performance.pedidosEmAtraso > 5
                    ? "crítico"
                    : "ok",
              },
              {
                metrica: "Tempo Médio de Finalização",
                valor: dashboardData.performance.tempoMedioFinalizacao,
                limite: 30,
                status:
                  dashboardData.performance.tempoMedioFinalizacao > 30
                    ? "atenção"
                    : "ok",
                unidade: "min",
              },
              {
                metrica: "Taxa de Confirmação Auto",
                valor: dashboardData.performance.taxaConfirmacaoAutomatica,
                limite: 80,
                status:
                  dashboardData.performance.taxaConfirmacaoAutomatica < 80
                    ? "atenção"
                    : "ok",
                unidade: "%",
              },
              {
                metrica: "Taxa de Conversão",
                valor: dashboardData.vendas.taxaConversao,
                limite: 70,
                status:
                  dashboardData.vendas.taxaConversao < 70 ? "atenção" : "ok",
                unidade: "%",
              },
            ],
          };
        case "produtos":
          return {
            chartType: "produtos",
            title: "Produtos Mais Vendidos",
            period: "Últimos 30 dias",
            data: dashboardData.produtos.itensMaisPopulares.map(
              (produto, index) => ({
                ...produto,
                posicao: index + 1,
                participacao: (
                  (produto.quantidadeVendida /
                    dashboardData.vendas.totalPedidos) *
                  100
                ).toFixed(1),
                receitaGerada: produto.receita,
              })
            ),
            metadata: {
              totalProdutos: dashboardData.produtos.itensMaisPopulares.length,
              totalVendas: dashboardData.produtos.itensMaisPopulares.reduce(
                (sum, p) => sum + p.quantidadeVendida,
                0
              ),
            },
          };
        case "horarios":
          return {
            chartType: "horarios",
            title: "Análise por Horários",
            period: "Últimos 30 dias",
            data: dashboardData.crescimento.horariosPico.map((horario) => ({
              ...horario,
              ocupacao: horario.percentualTotal.toFixed(0),
              receitaMedia: (
                horario.totalPedidos * dashboardData.vendas.ticketMedio
              ).toFixed(2),
            })),
            metadata: {
              horarioPico: dashboardData.crescimento.horariosPico.reduce(
                (prev, current) =>
                  prev.totalPedidos > current.totalPedidos ? prev : current
              ),
              totalReceita: dashboardData.crescimento.horariosPico.reduce(
                (sum, h) =>
                  sum + h.totalPedidos * dashboardData.vendas.ticketMedio,
                0
              ),
            },
          };

        default:
          return {
            chartType: "geral",
            title: "Detalhes Gerais",
            period: "Últimos 30 dias",
            data: [],
          };
      }
    },
    []
  );

  return {
    drilldownState,
    openDrilldown,
    closeDrilldown,
    generateDrilldownData,
  };
}
