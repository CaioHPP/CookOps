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

  // Para 1 ano (365 dias) - mostrar por meses (12 meses)
  if (periodoNum === 365) {
    return (
      dashboardData.crescimento.crescimentoMensal?.map((item) => ({
        periodo: item.mes,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || []
    );
  }

  // Para 6 meses (180 dias) - mostrar por meses (6 meses)
  if (periodoNum === 180) {
    return (
      dashboardData.crescimento.crescimentoMensal?.slice(-6).map((item) => ({
        periodo: item.mes,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || []
    );
  }

  // Para 90 dias - mostrar por semanas (12 semanas)
  if (periodoNum === 90) {
    // Gerar 12 semanas baseado nos dados semanais existentes
    const semanasExtendidas = generateWeeklyData(dashboardData, 12);
    return semanasExtendidas.map((item) => ({
      periodo: item.semana,
      vendas: item.totalPedidos,
      crescimento: item.crescimentoPercentual,
    }));
  }

  // Para 7 dias - mostrar por dias (7 dias)
  if (periodoNum === 7) {
    return (
      dashboardData.crescimento.crescimentoDiario?.map((item) => ({
        periodo: item.dia,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || []
    );
  }

  // Para 30 dias e outros - usar dados semanais padrão
  return dashboardData.crescimento.crescimentoSemanal.map((item) => ({
    periodo: item.semana,
    vendas: item.totalPedidos,
    crescimento: item.crescimentoPercentual,
  }));
}

/**
 * Gera dados semanais para períodos maiores
 */
function generateWeeklyData(dashboardData: DashboardData, numWeeks: number) {
  const semanasBase = dashboardData.crescimento.crescimentoSemanal;
  const semanasExtendidas = [];

  // Se temos menos semanas que o necessário, extrapolamos
  for (let i = 0; i < numWeeks; i++) {
    if (i < semanasBase.length) {
      semanasExtendidas.push(semanasBase[i]);
    } else {
      // Extrapolar dados baseado na última semana disponível
      const ultimaSemana = semanasBase[semanasBase.length - 1];
      semanasExtendidas.push({
        semana: `Semana ${i + 1}`,
        totalPedidos: Math.max(
          0,
          ultimaSemana.totalPedidos - (i - semanasBase.length + 1) * 2
        ),
        crescimentoPercentual: ultimaSemana.crescimentoPercentual * 0.9, // Reduz gradualmente
      });
    }
  }

  return semanasExtendidas;
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
