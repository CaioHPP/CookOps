/**
 * Utilitários para manipulação de dados do dashboard
 */

import { DashboardData } from "@/types/dashboard.types";

export interface ChartDataPoint {
  periodo: string;
  vendas: number;
  crescimento?: number;
}

/**
 * Gera dados para o gráfico de tendência baseado no período selecionado
 */
export function generateTrendChartData(
  dashboardData: DashboardData,
  periodo: string
): ChartDataPoint[] {
  if (!dashboardData) return [];

  const periodoNum = parseInt(periodo);
  // Para 1 ano (365 dias) - mostrar por meses (dados disponíveis)
  if (periodoNum === 365) {
    return (
      dashboardData.crescimento.crescimentoMensal?.map((item) => ({
        periodo: item.mes,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || []
    );
  }

  // Para 6 meses (180 dias) - mostrar por meses (dados disponíveis)
  if (periodoNum === 180) {
    return (
      dashboardData.crescimento.crescimentoMensal?.map((item) => ({
        periodo: item.mes,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || []
    );
  }

  // Para 90 dias - mostrar por semanas (dados disponíveis)
  if (periodoNum === 90) {
    return dashboardData.crescimento.crescimentoSemanal.map((item) => ({
      periodo: item.semana,
      vendas: item.totalPedidos,
      crescimento: item.crescimentoPercentual,
    }));
  }

  // Para 30 dias - mostrar por semanas (dados disponíveis)
  if (periodoNum === 30) {
    return dashboardData.crescimento.crescimentoSemanal.map((item) => ({
      periodo: item.semana,
      vendas: item.totalPedidos,
      crescimento: item.crescimentoPercentual,
    }));
  }

  // Para 7 dias e outros - usar dados semanais padrão
  if (periodoNum === 7) {
    return (
      dashboardData.crescimento.crescimentoDiario?.map((item) => ({
        periodo: item.dia,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || []
    );
  }

  // Fallback para outros períodos - usar dados semanais padrão
  return dashboardData.crescimento.crescimentoSemanal.map((item) => ({
    periodo: item.semana,
    vendas: item.totalPedidos,
    crescimento: item.crescimentoPercentual,
  }));
}

/**
 * Obtém o rótulo do período para exibição
 */
export function getPeriodLabel(periodo: string): string {
  const labels: Record<string, string> = {
    "7": "7 dias",
    "30": "30 dias",
    "90": "90 dias",
    "180": "6 meses",
    "365": "1 ano",
  };

  return labels[periodo] || `${periodo} dias`;
}

/**
 * Obtém a unidade de tempo baseada no período
 */
export function getTimeUnit(periodo: string): string {
  const periodoNum = parseInt(periodo);

  if (periodoNum === 365) return "meses";
  if (periodoNum === 180) return "meses";
  if (periodoNum === 90) return "semanas";
  if (periodoNum === 30) return "semanas";
  if (periodoNum === 7) return "dias";

  return "semanas"; // padrão
}

/**
 * Gera descrição do tooltip baseada no período
 */
export function getTooltipDescription(periodo: string): string {
  const unidade = getTimeUnit(periodo);
  const label = getPeriodLabel(periodo);
  return `Vendas por ${unidade} nos últimos ${label}`;
}
