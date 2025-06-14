/**
 * Utilitários para manipulação de dados do dashboard
 */

import { DashboardData } from "@/types/dashboard.types";

export interface ChartDataPoint {
  periodo: string;
  vendas: number;
  crescimento?: number;
  tendencia?: number;
}

/**
 * Gera dados para o gráfico de tendência baseado no período selecionado
 */
export function generateTrendChartData(
  dashboardData: DashboardData,
  periodo: string,
): ChartDataPoint[] {
  if (!dashboardData) return [];

  const periodoNum = parseInt(periodo);
  let baseData: ChartDataPoint[] = [];

  // Para 1 ano (365 dias) - mostrar por meses (dados disponíveis)
  if (periodoNum === 365) {
    baseData =
      dashboardData.crescimento.crescimentoMensal?.map((item) => ({
        periodo: item.mes,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || [];
  }
  // Para 6 meses (180 dias) - mostrar por meses (dados disponíveis)
  else if (periodoNum === 180) {
    baseData =
      dashboardData.crescimento.crescimentoMensal?.map((item) => ({
        periodo: item.mes,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || [];
  }
  // Para 90 dias - mostrar por semanas (dados disponíveis)
  else if (periodoNum === 90) {
    baseData = dashboardData.crescimento.crescimentoSemanal.map((item) => ({
      periodo: item.semana,
      vendas: item.totalPedidos,
      crescimento: item.crescimentoPercentual,
    }));
  }
  // Para 30 dias - mostrar por semanas (dados disponíveis)
  else if (periodoNum === 30) {
    baseData = dashboardData.crescimento.crescimentoSemanal.map((item) => ({
      periodo: item.semana,
      vendas: item.totalPedidos,
      crescimento: item.crescimentoPercentual,
    }));
  }
  // Para 7 dias e outros - usar dados semanais padrão
  else if (periodoNum === 7) {
    baseData =
      dashboardData.crescimento.crescimentoDiario?.map((item) => ({
        periodo: item.dia,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      })) || [];
  }
  // Fallback para outros períodos - usar dados semanais padrão
  else {
    baseData = dashboardData.crescimento.crescimentoSemanal.map((item) => ({
      periodo: item.semana,
      vendas: item.totalPedidos,
      crescimento: item.crescimentoPercentual,
    }));
  }

  // Calcular linha de tendência
  return calculateTrendLine(baseData);
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

/**
 * Calcula a linha de tendência usando regressão linear simples
 */
export function calculateTrendLine(data: ChartDataPoint[]): ChartDataPoint[] {
  if (data.length < 2) return data;

  // Preparar dados para regressão linear
  const n = data.length;
  const points = data.map((point, index) => ({
    x: index, // posição no array como x
    y: point.vendas, // vendas como y
  }));

  // Calcular somas necessárias para regressão linear
  const sumX = points.reduce((sum, point) => sum + point.x, 0);
  const sumY = points.reduce((sum, point) => sum + point.y, 0);
  const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumXX = points.reduce((sum, point) => sum + point.x * point.x, 0);

  // Calcular coeficientes da linha de tendência (y = ax + b)
  const denominator = n * sumXX - sumX * sumX;

  // Evitar divisão por zero
  if (denominator === 0) {
    // Se não há variação nos dados x, retornar uma linha horizontal com a média
    const avgY = sumY / n;
    return data.map((point) => ({
      ...point,
      tendencia: Math.max(0, Math.round(avgY)),
    }));
  }

  const a = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - a * sumX) / n;

  // Aplicar linha de tendência aos dados
  return data.map((point, index) => ({
    ...point,
    tendencia: Math.max(0, Math.round(a * index + b)), // Garante que não seja negativo
  }));
}
