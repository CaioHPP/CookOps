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
  dataInicio?: string,
  dataFim?: string
): ChartDataPoint[] {
  if (!dashboardData) return [];

  // Para período personalizado, determinar granularidade baseada no número de dias
  if (periodo === "personalizado" && dataInicio && dataFim) {
    const dias = calcularDiasEntreDatas(dataInicio, dataFim);
    let baseData: ChartDataPoint[] = [];

    // Aplicar regras de granularidade
    if (dias <= 14) {
      // até 14 dias: granularidade de dias
      baseData =
        dashboardData.crescimento.crescimentoDiario?.map((item) => ({
          periodo: item.dia,
          vendas: item.totalPedidos,
          crescimento: item.crescimentoPercentual,
        })) || [];
    } else if (dias <= 90) {
      // Entre 15 a 90 dias: granularidade de semanas
      baseData = dashboardData.crescimento.crescimentoSemanal.map((item) => ({
        periodo: item.semana,
        vendas: item.totalPedidos,
        crescimento: item.crescimentoPercentual,
      }));
    } else if (dias <= 365) {
      // Entre 90 a 365 dias: granularidade de meses
      baseData =
        dashboardData.crescimento.crescimentoMensal?.map((item) => ({
          periodo: item.mes,
          vendas: item.totalPedidos,
          crescimento: item.crescimentoPercentual,
        })) || [];
    } else {
      // Mais que 365 dias: granularidade de anos
      baseData =
        dashboardData.crescimento.crescimentoMensal?.map((item) => ({
          periodo: item.mes,
          vendas: item.totalPedidos,
          crescimento: item.crescimentoPercentual,
        })) || [];
    }

    return calculateTrendLine(baseData);
  }

  // Para períodos predefinidos, usar a lógica existente
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
 * Calcula o número de dias entre duas datas
 */
export function calcularDiasEntreDatas(
  dataInicio: string,
  dataFim: string
): number {
  // ✅ CORREÇÃO: Evitar problemas de timezone ao criar Date objects
  const [anoInicio, mesInicio, diaInicio] = dataInicio.split("-").map(Number);
  const [anoFim, mesFim, diaFim] = dataFim.split("-").map(Number);

  const inicio = new Date(anoInicio, mesInicio - 1, diaInicio); // mês é 0-indexed
  const fim = new Date(anoFim, mesFim - 1, diaFim);

  const diferencaMs = fim.getTime() - inicio.getTime();
  return Math.ceil(diferencaMs / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o último dia
}

/**
 * Obtém o rótulo do período para exibição
 */
export function getPeriodLabel(
  periodo: string,
  dataInicio?: string,
  dataFim?: string
): string {
  if (periodo === "personalizado" && dataInicio && dataFim) {
    const dias = calcularDiasEntreDatas(dataInicio, dataFim);

    // Para períodos personalizados, mostrar formato mais amigável
    // ✅ CORREÇÃO: Evitar problemas de timezone ao criar Date objects
    const [anoInicio, mesInicio, diaInicio] = dataInicio.split("-").map(Number);
    const [anoFim, mesFim, diaFim] = dataFim.split("-").map(Number);

    const inicioDate = new Date(anoInicio, mesInicio - 1, diaInicio); // mês é 0-indexed
    const fimDate = new Date(anoFim, mesFim - 1, diaFim);

    const opcoes: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const inicioFormatado = inicioDate.toLocaleDateString("pt-BR", opcoes);
    const fimFormatado = fimDate.toLocaleDateString("pt-BR", opcoes);

    if (dias === 1) {
      return inicioFormatado;
    } else if (dias <= 7) {
      return `${dias} dias (${inicioFormatado} a ${fimFormatado})`;
    } else if (dias <= 30) {
      return `${inicioFormatado} a ${fimFormatado}`;
    } else if (dias <= 90) {
      return `${inicioFormatado} a ${fimFormatado}`;
    } else if (dias <= 365) {
      const meses = Math.round(dias / 30);
      return `${meses} ${
        meses === 1 ? "mês" : "meses"
      } (${inicioFormatado} a ${fimFormatado})`;
    } else {
      const anos = Math.round(dias / 365);
      return `${anos} ${
        anos === 1 ? "ano" : "anos"
      } (${inicioFormatado} a ${fimFormatado})`;
    }
  }

  const labels: Record<string, string> = {
    "7": "7 dias",
    "30": "30 dias",
    "90": "90 dias",
    "180": "6 meses",
    "365": "1 ano",
    personalizado: "Período personalizado",
  };

  return labels[periodo] || `${periodo} dias`;
}

/**
 * Obtém a unidade de tempo baseada no período
 */
export function getTimeUnit(
  periodo: string,
  dataInicio?: string,
  dataFim?: string
): string {
  if (periodo === "personalizado" && dataInicio && dataFim) {
    const dias = calcularDiasEntreDatas(dataInicio, dataFim);

    // Aplicar regras de granularidade para período personalizado:
    // até 14 dias: granularidade de dias
    // Entre 15 a 90 dias: granularidade de semanas
    // Entre 90 a 365 dias: granularidade de meses
    // Mais que 365 dias: granularidade de anos
    if (dias <= 14) return "dias";
    if (dias <= 90) return "semanas";
    if (dias <= 365) return "meses";
    return "anos";
  }

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
export function getTooltipDescription(
  periodo: string,
  dataInicio?: string,
  dataFim?: string
): string {
  const unidade = getTimeUnit(periodo, dataInicio, dataFim);
  const label = getPeriodLabel(periodo, dataInicio, dataFim);
  return `Vendas por ${unidade} nos últimos ${label}`;
}

/**
 * Obtém o título específico para o gráfico de tendências
 */
export function getTrendChartTitle(
  periodo: string,
  dataInicio?: string,
  dataFim?: string
): string {
  if (periodo === "personalizado" && dataInicio && dataFim) {
    const dias = calcularDiasEntreDatas(dataInicio, dataFim);

    if (dias <= 14) {
      return "Tendência de Pedidos - Diário";
    } else if (dias <= 90) {
      return "Tendência de Pedidos - Semanal";
    } else if (dias <= 365) {
      return "Tendência de Pedidos - Mensal";
    } else {
      return "Tendência de Pedidos - Anual";
    }
  }

  const periodoNum = parseInt(periodo);

  if (periodoNum === 7) return "Tendência de Pedidos - Diário";
  if (periodoNum === 30) return "Tendência de Pedidos - Semanal";
  if (periodoNum === 90) return "Tendência de Pedidos - Semanal";
  if (periodoNum === 180) return "Tendência de Pedidos - Mensal";
  if (periodoNum === 365) return "Tendência de Pedidos - Mensal";

  return "Tendência de Pedidos";
}

/**
 * Obtém o subtítulo específico para o gráfico de tendências
 */
export function getTrendChartSubtitle(
  periodo: string,
  dataInicio?: string,
  dataFim?: string
): string {
  const unidade = getTimeUnit(periodo, dataInicio, dataFim);
  const label = getPeriodLabel(periodo, dataInicio, dataFim);

  return `Pedidos por ${unidade} com linha de tendência (${label})`;
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
