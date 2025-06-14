"use client";

import { ChartTheme } from "@/lib/chart-themes";
import { useCallback, useEffect, useState } from "react";

export interface DashboardChart {
  id: string;
  name: string;
  description: string;
  category: "vendas" | "operacional" | "produtos" | "performance";
  defaultVisible: boolean;
  component: string;
}

export interface DashboardSettings {
  visibleCharts: string[];
  autoRefresh: boolean;
  refreshInterval: number; // em segundos
  defaultPeriod: string;
  showComparison: boolean;
  alertsEnabled: boolean;
  chartTheme: ChartTheme; // Novo: tema de cores dos gráficos
  // Configurações avançadas
  enableNotifications: boolean;
  enableAlerts: boolean;
  enableMetricUpdates: boolean;
  enableOrderStatus: boolean;
  chartAnimations: boolean;
  darkMode: boolean;
  cacheEnabled: boolean;
  cacheTTL: number; // em segundos
}

const DEFAULT_CHARTS: DashboardChart[] = [
  {
    id: "vendas_trend",
    name: "Tendência de Vendas",
    description: "Evolução dos pedidos ao longo do tempo",
    category: "vendas",
    defaultVisible: true,
    component: "LineChart",
  },
  {
    id: "vendas_dia_semana",
    name: "Vendas por Dia da Semana",
    description: "Distribuição de pedidos nos dias da semana",
    category: "vendas",
    defaultVisible: true,
    component: "BarChart",
  },
  {
    id: "status_distribution",
    name: "Distribuição por Status",
    description: "Proporção de pedidos por status atual",
    category: "operacional",
    defaultVisible: true,
    component: "PieChart",
  },
  {
    id: "top_produtos",
    name: "Produtos Mais Vendidos",
    description: "Top 8 produtos por quantidade vendida",
    category: "produtos",
    defaultVisible: true,
    component: "BarChart",
  },
  {
    id: "horarios_pico",
    name: "Horários de Pico",
    description: "Distribuição de pedidos por horário",
    category: "operacional",
    defaultVisible: true,
    component: "AreaChart",
  },
  {
    id: "receita_produto",
    name: "Receita por Produto",
    description: "Análise detalhada de receita e performance por produto",
    category: "produtos",
    defaultVisible: true,
    component: "Table",
  },
  {
    id: "performance_fonte",
    name: "Performance por Fonte",
    description: "Comparativo de pedidos e valor médio por fonte",
    category: "performance",
    defaultVisible: true,
    component: "MultiBarChart",
  },
  {
    id: "produtos_baixo_desempenho",
    name: "Produtos Baixo Desempenho",
    description: "Produtos que precisam de atenção para melhorar vendas",
    category: "produtos",
    defaultVisible: true,
    component: "Table",
  },
  {
    id: "formas_pagamento",
    name: "Formas de Pagamento",
    description: "Métodos de pagamento mais utilizados",
    category: "operacional",
    defaultVisible: true,
    component: "HorizontalBarChart",
  },
];

const DEFAULT_SETTINGS: DashboardSettings = {
  visibleCharts: DEFAULT_CHARTS.filter((chart) => chart.defaultVisible).map(
    (chart) => chart.id
  ),
  autoRefresh: false,
  refreshInterval: 30, // 30 segundos
  defaultPeriod: "30",
  showComparison: false,
  alertsEnabled: true,
  chartTheme: "purple", // Tema padrão: Roxo & Dourado
  // Configurações avançadas
  enableNotifications: true,
  enableAlerts: true,
  enableMetricUpdates: true,
  enableOrderStatus: true,
  chartAnimations: true,
  darkMode: false,
  cacheEnabled: true,
  cacheTTL: 300, // 5 minutos
};

const STORAGE_KEY = "cookops_dashboard_settings";

export function useDashboardSettings() {
  const [settings, setSettings] = useState<DashboardSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Debug: Monitora mudanças no estado settings
  useEffect(() => {
    console.log("🔄 Estado settings mudou:", settings);
  }, [settings]);

  // Carregar configurações do localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error("Erro ao carregar configurações do dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  // Salvar configurações no localStorage
  const saveSettings = useCallback(
    (newSettings: Partial<DashboardSettings>) => {
      console.log("💾 saveSettings chamado:", newSettings);
      const updatedSettings = { ...settings, ...newSettings };
      console.log("🔄 Settings atualizados:", updatedSettings);
      console.log("📝 Chamando setSettings...");
      setSettings(updatedSettings);
      console.log("✅ setSettings chamado com:", updatedSettings);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
        console.log("✅ Salvo no localStorage");
      } catch (error) {
        console.error("Erro ao salvar configurações do dashboard:", error);
      }
    },
    [settings]
  );

  // Funções específicas para atualizar configurações
  const toggleChart = useCallback(
    (chartId: string) => {
      console.log("🔀 toggleChart chamado:", chartId);
      const isVisible = settings.visibleCharts.includes(chartId);
      const newVisibleCharts = isVisible
        ? settings.visibleCharts.filter((id) => id !== chartId)
        : [...settings.visibleCharts, chartId];

      console.log("📊 Novos charts visíveis:", newVisibleCharts);
      saveSettings({ visibleCharts: newVisibleCharts });
    },
    [settings.visibleCharts, saveSettings]
  );

  const setAutoRefresh = useCallback(
    (enabled: boolean) => {
      saveSettings({ autoRefresh: enabled });
    },
    [saveSettings]
  );

  const setRefreshInterval = useCallback(
    (interval: number) => {
      saveSettings({ refreshInterval: interval });
    },
    [saveSettings]
  );

  const setDefaultPeriod = useCallback(
    (period: string) => {
      saveSettings({ defaultPeriod: period });
    },
    [saveSettings]
  );

  const setShowComparison = useCallback(
    (show: boolean) => {
      saveSettings({ showComparison: show });
    },
    [saveSettings]
  );

  const setAlertsEnabled = useCallback(
    (enabled: boolean) => {
      saveSettings({ alertsEnabled: enabled });
    },
    [saveSettings]
  );
  const setChartTheme = useCallback(
    (chartTheme: ChartTheme) => {
      console.log("🎨 setChartTheme chamado:", chartTheme);
      saveSettings({ chartTheme });
    },
    [saveSettings]
  );

  const setEnableNotifications = useCallback(
    (enabled: boolean) => {
      saveSettings({ enableNotifications: enabled });
    },
    [saveSettings]
  );

  const setEnableAlerts = useCallback(
    (enabled: boolean) => {
      saveSettings({ enableAlerts: enabled });
    },
    [saveSettings]
  );

  const setEnableMetricUpdates = useCallback(
    (enabled: boolean) => {
      saveSettings({ enableMetricUpdates: enabled });
    },
    [saveSettings]
  );

  const setEnableOrderStatus = useCallback(
    (enabled: boolean) => {
      saveSettings({ enableOrderStatus: enabled });
    },
    [saveSettings]
  );

  const setChartAnimations = useCallback(
    (enabled: boolean) => {
      saveSettings({ chartAnimations: enabled });
    },
    [saveSettings]
  );

  const setDarkMode = useCallback(
    (enabled: boolean) => {
      saveSettings({ darkMode: enabled });
    },
    [saveSettings]
  );

  const setCacheEnabled = useCallback(
    (enabled: boolean) => {
      saveSettings({ cacheEnabled: enabled });
    },
    [saveSettings]
  );

  const setCacheTTL = useCallback(
    (ttl: number) => {
      saveSettings({ cacheTTL: ttl });
    },
    [saveSettings]
  );

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao resetar configurações:", error);
    }
  }, []);

  // Obter gráficos visíveis
  const visibleCharts = DEFAULT_CHARTS.filter((chart) =>
    settings.visibleCharts.includes(chart.id)
  );

  // Obter gráficos por categoria
  const getChartsByCategory = useCallback(
    (category: DashboardChart["category"]) => {
      return DEFAULT_CHARTS.filter((chart) => chart.category === category);
    },
    []
  );

  // Verificar se um gráfico está visível
  const isChartVisible = useCallback(
    (chartId: string) => {
      return settings.visibleCharts.includes(chartId);
    },
    [settings.visibleCharts]
  );

  // Exportar configurações
  const exportSettings = useCallback(() => {
    const dataToExport = {
      settings,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-settings-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [settings]);

  // Importar configurações
  const importSettings = useCallback(
    (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const data = JSON.parse(content);

            if (data.settings) {
              saveSettings(data.settings);
              resolve();
            } else {
              reject(new Error("Formato de arquivo inválido"));
            }
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
        reader.readAsText(file);
      });
    },
    [saveSettings]
  );

  return {
    // Estados
    settings,
    isLoading,
    visibleCharts,
    availableCharts: DEFAULT_CHARTS, // Funções de atualização
    saveSettings,
    toggleChart,
    setAutoRefresh,
    setRefreshInterval,
    setDefaultPeriod,
    setShowComparison,
    setAlertsEnabled,
    setChartTheme,
    setEnableNotifications,
    setEnableAlerts,
    setEnableMetricUpdates,
    setEnableOrderStatus,
    setChartAnimations,
    setDarkMode,
    setCacheEnabled,
    setCacheTTL,
    resetToDefaults,

    // Funções utilitárias
    getChartsByCategory,
    isChartVisible,
    exportSettings,
    importSettings,
  };
}

export default useDashboardSettings;
