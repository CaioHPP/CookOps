// hooks/useChartExport.ts
"use client";

import { DashboardData } from "@/types/dashboard.types";
import { useCallback } from "react";

export interface ExportOptions {
  format: "csv" | "xlsx" | "png" | "pdf";
  title: string;
  includeMetadata?: boolean;
}

export function useChartExport() {
  const exportToCSV = useCallback((data: unknown[], filename: string) => {
    if (!data.length) return;

    const headers = Object.keys(data[0] as Record<string, unknown>);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = (row as Record<string, unknown>)[header];
            return typeof value === "string" && value.includes(",")
              ? `"${value}"`
              : value;
          })
          .join(","),
      ),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  const exportToPNG = useCallback(
    (chartRef: React.RefObject<HTMLDivElement>, filename: string) => {
      if (!chartRef.current) return;

      // Implementação básica sem html2canvas por enquanto
      console.log("Exportação PNG não implementada ainda:", filename);
      // TODO: Implementar exportação PNG quando necessário
    },
    [],
  );

  const exportVendasData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const vendasData = [
        {
          metrica: "Receita Total",
          valor: `R$ ${dashboardData.vendas.receitaTotal.toLocaleString()}`,
          periodo: "Últimos 30 dias",
        },
        {
          metrica: "Total de Pedidos",
          valor: dashboardData.vendas.totalPedidos,
          periodo: "Últimos 30 dias",
        },
        {
          metrica: "Ticket Médio",
          valor: `R$ ${dashboardData.vendas.ticketMedio.toFixed(2)}`,
          periodo: "Últimos 30 dias",
        },
        {
          metrica: "Taxa de Conversão",
          valor: `${dashboardData.vendas.taxaConversao.toFixed(1)}%`,
          periodo: "Últimos 30 dias",
        },
      ];

      if (
        options.includeMetadata &&
        dashboardData.vendas.crescimentoReceita !== undefined
      ) {
        vendasData.push({
          metrica: "Crescimento da Receita",
          valor: `${dashboardData.vendas.crescimentoReceita.toFixed(1)}%`,
          periodo: "vs período anterior",
        });
      }

      exportToCSV(
        vendasData,
        `vendas_${options.title.toLowerCase().replace(/\\s+/g, "_")}`,
      );
    },
    [exportToCSV],
  );
  const exportProdutosData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const produtosData = dashboardData.produtos.itensMaisPopulares.map(
        (produto, index) => ({
          posicao: index + 1,
          nome: produto.nome,
          quantidadeVendida: produto.quantidadeVendida,
          receita: produto.receita,
          receitaFormatada: `R$ ${produto.receita.toFixed(2)}`,
          participacao: `${(
            (produto.quantidadeVendida / dashboardData.vendas.totalPedidos) *
            100
          ).toFixed(1)}%`,
        }),
      );

      exportToCSV(
        produtosData,
        `produtos_${options.title.toLowerCase().replace(/\\s+/g, "_")}`,
      );
    },
    [exportToCSV],
  );
  const exportHorariosData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const horariosData = dashboardData.crescimento.horariosPico.map(
        (horario) => ({
          hora: `${horario.hora}:00`,
          pedidos: horario.totalPedidos,
          percentual: `${horario.percentualTotal.toFixed(1)}%`,
          receita: `R$ ${(
            horario.totalPedidos * dashboardData.vendas.ticketMedio
          ).toLocaleString()}`,
          ticketMedio: `R$ ${dashboardData.vendas.ticketMedio.toFixed(2)}`,
        }),
      );

      exportToCSV(
        horariosData,
        `horarios_${options.title.toLowerCase().replace(/\\s+/g, "_")}`,
      );
    },
    [exportToCSV],
  );

  const exportPerformanceData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const performanceData = [
        {
          metrica: "Pedidos em Atraso",
          valor: dashboardData.performance.pedidosEmAtraso,
          status:
            dashboardData.performance.pedidosEmAtraso > 5 ? "Crítico" : "OK",
          limite: 5,
        },
        {
          metrica: "Tempo Médio de Finalização",
          valor: `${dashboardData.performance.tempoMedioFinalizacao} min`,
          status:
            dashboardData.performance.tempoMedioFinalizacao > 30
              ? "Atenção"
              : "OK",
          limite: "30 min",
        },
        {
          metrica: "Taxa de Confirmação Automática",
          valor: `${dashboardData.performance.taxaConfirmacaoAutomatica.toFixed(
            1,
          )}%`,
          status:
            dashboardData.performance.taxaConfirmacaoAutomatica < 80
              ? "Atenção"
              : "OK",
          limite: "80%",
        },
      ];

      exportToCSV(
        performanceData,
        `performance_${options.title.toLowerCase().replace(/\\s+/g, "_")}`,
      );
    },
    [exportToCSV],
  );
  const exportAllData = useCallback(
    (dashboardData: DashboardData) => {
      // Exportar dados completos com todas as métricas
      const summaryData = [
        {
          categoria: "Vendas",
          receita_total: dashboardData.vendas.receitaTotal,
          total_pedidos: dashboardData.vendas.totalPedidos,
          ticket_medio: dashboardData.vendas.ticketMedio,
          taxa_conversao: dashboardData.vendas.taxaConversao,
          crescimento_receita: dashboardData.vendas.crescimentoReceita || 0,
        },
        {
          categoria: "Performance",
          pedidos_atraso: dashboardData.performance.pedidosEmAtraso,
          tempo_medio_finalizacao:
            dashboardData.performance.tempoMedioFinalizacao,
          taxa_confirmacao_auto:
            dashboardData.performance.taxaConfirmacaoAutomatica,
          pedidos_hora_pico: dashboardData.performance.pedidosPorHoraPico,
        },
      ];

      exportToCSV(
        summaryData,
        `dashboard_completo_${new Date().toISOString().split("T")[0]}`,
      );
    },
    [exportToCSV],
  );

  return {
    exportToCSV,
    exportToPNG,
    exportVendasData,
    exportProdutosData,
    exportHorariosData,
    exportPerformanceData,
    exportAllData,
  };
}
