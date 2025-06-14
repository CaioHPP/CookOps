import {
  DashboardData,
  MetricasCrescimento,
  MetricasFinanceiras,
  MetricasOperacionais,
  MetricasPerformance,
  MetricasProdutos,
  MetricasVendas,
} from "@/types/dashboard.types";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export interface DashboardFilters {
  periodo: string;
  status?: string;
  fonte?: string;
  comparativo?: boolean;
}

export class DashboardService {
  /**
   * Obter todos os dados do dashboard com filtros avançados
   */
  static async getDashboardData(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<DashboardData> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    if (filters.comparativo) {
      params.append("comparativo", "true");
    }

    const response = await api.get<DashboardData>(
      `${API_ROUTES.DASHBOARD.GET_TODAS_METRICAS}?${params.toString()}`,
    );

    return response.data;
  }

  /**
   * Obter dados comparativos de períodos
   */
  static async getDashboardComparativo(
    periodo: string = "30",
    status?: string,
    fonte?: string,
  ): Promise<{
    atual: DashboardData;
    anterior: DashboardData;
    crescimento: Record<string, number>;
  }> {
    const params = new URLSearchParams({
      periodo,
      comparativo: "true",
    });

    if (status && status !== "todos") {
      params.append("status", status);
    }

    if (fonte && fonte !== "todas") {
      params.append("fonte", fonte);
    }

    const response = await api.get(
      `${
        API_ROUTES.DASHBOARD.GET_TODAS_METRICAS
      }/comparativo?${params.toString()}`,
    );
    return response.data;
  }

  /**
   * Obter apenas métricas de vendas com filtros
   */
  static async getMetricasVendas(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<MetricasVendas> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    const response = await api.get<MetricasVendas>(
      `${API_ROUTES.DASHBOARD.GET_METRICAS_VENDAS}?${params.toString()}`,
    );
    return response.data;
  }

  /**
   * Obter apenas métricas de performance com filtros
   */
  static async getMetricasPerformance(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<MetricasPerformance> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    const response = await api.get<MetricasPerformance>(
      `${API_ROUTES.DASHBOARD.GET_METRICAS_PERFORMANCE}?${params.toString()}`,
    );
    return response.data;
  }

  /**
   * Obter apenas métricas de produtos com filtros
   */
  static async getMetricasProdutos(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<MetricasProdutos> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    const response = await api.get<MetricasProdutos>(
      `${API_ROUTES.DASHBOARD.GET_METRICAS_PRODUTOS}?${params.toString()}`,
    );
    return response.data;
  }

  /**
   * Obter apenas métricas de crescimento com filtros
   */
  static async getMetricasCrescimento(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<MetricasCrescimento> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    const response = await api.get<MetricasCrescimento>(
      `${API_ROUTES.DASHBOARD.GET_METRICAS_CRESCIMENTO}?${params.toString()}`,
    );
    return response.data;
  }

  /**
   * Obter apenas métricas financeiras com filtros
   */
  static async getMetricasFinanceiras(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<MetricasFinanceiras> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    const response = await api.get<MetricasFinanceiras>(
      `${API_ROUTES.DASHBOARD.GET_METRICAS_FINANCEIRAS}?${params.toString()}`,
    );
    return response.data;
  }

  /**
   * Obter apenas métricas operacionais com filtros
   */
  static async getMetricasOperacionais(
    filters: DashboardFilters = { periodo: "30" },
  ): Promise<MetricasOperacionais> {
    const params = new URLSearchParams({
      periodo: filters.periodo,
    });

    if (filters.status && filters.status !== "todos") {
      params.append("status", filters.status);
    }

    if (filters.fonte && filters.fonte !== "todas") {
      params.append("fonte", filters.fonte);
    }

    const response = await api.get<MetricasOperacionais>(
      `${API_ROUTES.DASHBOARD.GET_METRICAS_OPERACIONAIS}?${params.toString()}`,
    );
    return response.data;
  }
}
