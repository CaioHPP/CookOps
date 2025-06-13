"use client";

import { DashboardService } from "@/api/services/dashboard.service";
import { AdvancedExport } from "@/components/Dashboard/AdvancedExport";
import { AdvancedSettings } from "@/components/Dashboard/AdvancedSettings";
import { ChartDrilldown } from "@/components/Dashboard/ChartDrilldown";
import { DashboardConfig } from "@/components/Dashboard/DashboardConfig";
import { PeriodComparison } from "@/components/Dashboard/PeriodComparison";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useChartDrilldown } from "@/hooks/useChartDrilldown";
import { useChartExport } from "@/hooks/useChartExport";
import { useDashboardSettings } from "@/hooks/useDashboardSettings";
import {
  generateTrendChartData,
  getPeriodLabel,
  getTimeUnit,
} from "@/lib/dashboard-utils";
import { DashboardData, DashboardFilters } from "@/types/dashboard.types";
import {
  AlertTriangle,
  BarChartHorizontal,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  RefreshCw,
  Settings,
  ShoppingBag,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

interface ComparisonData {
  atual: DashboardData;
  anterior: DashboardData;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [filters, setFilters] = useState<DashboardFilters>({
    periodo: "30",
    status: "todos",
    fonte: "todas",
  });
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showAdvancedExport, setShowAdvancedExport] = useState(false);

  // Configurações do dashboard
  const { settings, isChartVisible } = useDashboardSettings();

  // Drill-down functionality
  const {
    drilldownState,
    openDrilldown,
    closeDrilldown,
    generateDrilldownData,
  } = useChartDrilldown();

  // Export functionality
  const {
    exportVendasData,
    exportProdutosData,
    exportHorariosData,
    exportAllData,
  } = useChartExport();

  // Sincronizar configurações com estado local
  useEffect(() => {
    setShowComparison(settings.showComparison);
  }, [settings.showComparison]);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // Carregar dados diretamente do backend
      const data = await DashboardService.getDashboardData(filters);
      setDashboardData(data);

      // Carregar dados comparativos se solicitado
      if (showComparison) {
        const comparativeData = await DashboardService.getDashboardComparativo(
          filters.periodo,
          filters.status,
          filters.fonte
        );
        setComparisonData(comparativeData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, showComparison]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Auto-refresh dos dados
  useEffect(() => {
    if (!settings.autoRefresh || !settings.refreshInterval) return;

    const interval = setInterval(() => {
      loadDashboardData();
    }, settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [settings.autoRefresh, settings.refreshInterval, loadDashboardData]);

  // Configurações dos gráficos
  const chartConfigs: Record<string, ChartConfig> = useMemo(
    () => ({
      vendas: {
        vendas: {
          label: "Vendas",
          color: "hsl(var(--chart-1))",
        },
        receita: {
          label: "Receita",
          color: "hsl(var(--chart-2))",
        },
      },
      status: {
        pendente: {
          label: "Pendente",
          color: "#f59e0b",
        },
        preparando: {
          label: "Preparando",
          color: "#3b82f6",
        },
        pronto: {
          label: "Pronto",
          color: "#10b981",
        },
        entregue: {
          label: "Entregue",
          color: "#6366f1",
        },
      },
      produtos: {
        vendas: {
          label: "Vendas",
          color: "hsl(var(--chart-1))",
        },
      },
      horarios: {
        pedidos: {
          label: "Pedidos",
          color: "hsl(var(--chart-1))",
        },
      },
      receitaPorProduto: {
        receita: {
          label: "Receita (R$)",
          color: "hsl(var(--chart-2))",
        },
        quantidade: {
          label: "Quantidade",
          color: "hsl(var(--chart-3))",
        },
      },
      performancePorFonte: {
        totalPedidos: {
          label: "Total de Pedidos",
          color: "hsl(var(--chart-1))",
        },
        valorMedio: {
          label: "Valor Médio (R$)",
          color: "hsl(var(--chart-2))",
        },
      },
    }),
    []
  );

  // Dados para os gráficos com otimização
  const chartData = useMemo(() => {
    if (!dashboardData) return {};

    // Usar a função utilitária para gerar dados dinâmicos baseados no período
    const trendData = dashboardData.crescimento?.crescimentoSemanal
      ? generateTrendChartData(dashboardData, filters.periodo)
      : [];

    return {
      crescimento: trendData,
      status: dashboardData.operacional.pedidosPorStatus.map((status) => ({
        name: status.titulo,
        value: status.totalPedidos,
        percentage: status.percentualTotal,
        fill:
          chartConfigs.status[status.titulo.toLowerCase()]?.color || "#8884d8",
      })),
      produtos: dashboardData.produtos.itensMaisPopulares
        .slice(0, 8)
        .map((produto) => ({
          nome:
            produto.nome.length > 15
              ? produto.nome.substring(0, 15) + "..."
              : produto.nome,
          vendas: produto.quantidadeVendida,
          receita: produto.receita,
        })),
      horarios: dashboardData.crescimento.horariosPico.map((horario) => ({
        hora: `${horario.hora}:00`,
        pedidos: horario.totalPedidos,
        percentual: horario.percentualTotal,
      })),
      receitaPorProduto:
        dashboardData.produtos.receitaPorProduto?.map((produto) => ({
          nome:
            produto.nome.length > 20
              ? produto.nome.substring(0, 20) + "..."
              : produto.nome,
          nomeCompleto: produto.nome,
          receita: produto.receita,
          quantidade: produto.quantidadeVendida,
          ticketMedio: produto.receita / produto.quantidadeVendida,
        })) || [],
      performancePorFonte:
        dashboardData.crescimento.performancePorFonte?.map((fonte) => ({
          nome: fonte.nome,
          totalPedidos: fonte.totalPedidos,
          valorMedio: fonte.valorMedio,
          percentual: fonte.percentualTotal,
        })) || [],
    };
  }, [dashboardData, chartConfigs, filters.periodo]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin mr-2" />
            <span>Carregando dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Erro ao carregar dados
            </h2>
            <p className="text-muted-foreground mb-4">
              Não foi possível carregar os dados do dashboard.
            </p>
            <Button onClick={loadDashboardData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Cabeçalho do Dashboard */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard CookOps</h1>
            <p className="text-muted-foreground">Análise das operações</p>
            {/* Indicador do período atual */}
            <div className="mt-2 flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Período: {getPeriodLabel(filters.periodo)}
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
                <BarChartHorizontal className="h-4 w-4 mr-1" />
                Granularidade: {getTimeUnit(filters.periodo)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Toggle para comparação */}
            <div className="flex items-center gap-2">
              <Switch
                id="comparison"
                checked={showComparison}
                onCheckedChange={setShowComparison}
              />
              <Label htmlFor="comparison">Comparar períodos</Label>
            </div>
            {/* Filtros */}
            <div className="flex items-center gap-2">
              <Label htmlFor="periodo">Período:</Label>
              <Select
                value={filters.periodo}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    periodo: value as "7" | "30" | "90" | "180" | "365",
                  }))
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="90">90 dias</SelectItem>
                  <SelectItem value="180">6 meses</SelectItem>
                  <SelectItem value="365">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Botões de ação */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportAllData(dashboardData)}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Tudo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfig(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadDashboardData}
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
          </div>
        </div>

        {/* 1. Cards de Métricas Principais */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Métricas Principais</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Receita Total */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Receita Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    R${" "}
                    {dashboardData.vendas.receitaTotal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  {dashboardData.vendas.crescimentoReceita !== undefined && (
                    <div className="flex items-center gap-1">
                      {dashboardData.vendas.crescimentoReceita >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={
                          dashboardData.vendas.crescimentoReceita >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {dashboardData.vendas.crescimentoReceita.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Total de Pedidos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  Total de Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {dashboardData.vendas.totalPedidos.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Período de {filters.periodo} dias
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Ticket Médio */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Ticket Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    R$ {dashboardData.vendas.ticketMedio.toFixed(2)}
                  </p>
                  {dashboardData.vendas.variacaoTicketMedio !== undefined && (
                    <div className="flex items-center gap-1">
                      {dashboardData.vendas.variacaoTicketMedio >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={
                          dashboardData.vendas.variacaoTicketMedio >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {dashboardData.vendas.variacaoTicketMedio.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Tempo Médio */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-orange-600" />
                  Tempo Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {dashboardData.performance.tempoMedioFinalizacao}min
                  </p>
                  <div className="flex items-center gap-1">
                    {dashboardData.performance.tempoMedioFinalizacao <= 30 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-500" />
                    )}
                    <span
                      className={
                        dashboardData.performance.tempoMedioFinalizacao <= 30
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {dashboardData.performance.tempoMedioFinalizacao <= 30
                        ? "Ótimo"
                        : "Atenção"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 2. Resumo Financeiro, Entregas e Descontos */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resumo Financeiro</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Resumo Financeiro */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Resumo Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Receita Bruta:</span>
                    <span className="font-bold">
                      R${" "}
                      {dashboardData.vendas.receitaTotal.toLocaleString(
                        "pt-BR",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Receita Líquida:</span>
                    <span className="font-semibold text-green-500">
                      R${" "}
                      {dashboardData.financeiro.receitaLiquida.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Descontos:</span>
                    <span className="text-red-500 font-semibold">
                      R${" "}
                      {dashboardData.financeiro.valorTotalDescontos.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Taxas de Entrega:</span>
                    <span className="text-green-500 font-semibold">
                      R${" "}
                      {dashboardData.financeiro.valorTotalTaxasEntrega.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">
                      % Taxas de Entrega sobre Bruto:
                    </span>
                    <span className="text-green-500 font-semibold">
                      {(
                        (dashboardData.financeiro.valorTotalTaxasEntrega /
                          dashboardData.vendas.receitaTotal) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">% Descontos sobre Bruto:</span>
                    <span className="text-red-500 font-semibold">
                      {(
                        (dashboardData.financeiro.valorTotalDescontos /
                          dashboardData.vendas.receitaTotal) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insights de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Insights de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total de Pedidos:</span>
                    <span className="font-semibold">
                      {dashboardData.vendas.totalPedidos}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pedidos com Entrega:</span>
                    <span className="font-semibold">
                      {dashboardData.financeiro.numeroPedidosEntrega}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entregas Tarifadas:</span>
                    <span className="font-semibold">
                      {dashboardData.financeiro.numeroPedidosEntregaCobradas}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entregas Gratuitas:</span>
                    <span className="font-semibold">
                      {dashboardData.financeiro.numeroPedidosEntrega -
                        dashboardData.financeiro.numeroPedidosEntregaCobradas}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>% do Total com Entrega:</span>
                    <span className="font-semibold">
                      {dashboardData.financeiro.porcentagemPedidosEntrega.toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Receita de Entregas:</span>
                    <span className="font-semibold text-green-500">
                      R${" "}
                      {dashboardData.financeiro.valorTotalTaxasEntrega.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insights de Descontos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Insights de Descontos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total de Pedidos:</span>
                    <span className="font-semibold">
                      {dashboardData.vendas.totalPedidos}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pedidos com Desconto:</span>
                    <span className="font-semibold">
                      {dashboardData.financeiro.numeroPedidosComDesconto}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>% de Pedidos com Desconto:</span>
                    <span className="font-semibold">
                      {dashboardData.financeiro.porcentagemPedidosComDesconto.toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-500">Total de Descontos:</span>
                    <span className="text-red-500 font-semibold">
                      R${" "}
                      {dashboardData.financeiro.valorTotalDescontos.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-500">
                      Ticket Médio de Desconto:
                    </span>
                    <span className="text-red-500 font-semibold">
                      R${" "}
                      {dashboardData.financeiro.valorMedioDesconto.toLocaleString(
                        "pt-BR",
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3. Taxa de Conversão, Pedidos em Atraso, Confirmação Automática, Movimentações Board */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Performance Operacional
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Taxa de Conversão */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Taxa de Conversão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {dashboardData.vendas.taxaConversao.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pedidos confirmados vs total
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pedidos em Atraso */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Pedidos em Atraso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {dashboardData.performance.pedidosEmAtraso}
                  </p>
                  <div className="flex items-center gap-1">
                    {dashboardData.performance.pedidosEmAtraso === 0 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        dashboardData.performance.pedidosEmAtraso === 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {dashboardData.performance.pedidosEmAtraso === 0
                        ? "Tudo em dia"
                        : "Requer atenção"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Taxa de Confirmação Automática */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Confirmação Auto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {dashboardData.performance.taxaConfirmacaoAutomatica.toFixed(
                      1
                    )}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pedidos confirmados automaticamente
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Movimentações no Board */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  Movimentações Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {dashboardData.operacional.movimentacoesBoard}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mudanças de status no período
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comparação de Períodos */}
        {showComparison && comparisonData && (
          <PeriodComparison data={comparisonData} />
        )}

        {/* 4. Gráficos Visuais */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Análise Visual</h3>

          {/* Primeira linha de gráficos */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Gráfico de Tendência de Vendas */}
            {isChartVisible("vendas_trend") && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle>
                        Tendência de Vendas - {getPeriodLabel(filters.periodo)}
                      </CardTitle>
                      <CardDescription>
                        Evolução dos pedidos por {getTimeUnit(filters.periodo)}{" "}
                        ({getPeriodLabel(filters.periodo)})
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          exportVendasData(dashboardData, {
                            format: "csv",
                            title: "Tendência de Vendas",
                            includeMetadata: true,
                          })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openDrilldown(
                            generateDrilldownData("vendas", dashboardData)
                          )
                        }
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfigs.vendas}
                    className="h-[300px]"
                  >
                    <LineChart data={chartData.crescimento}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periodo" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="vendas"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={{ fill: "var(--chart-1)" }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {/* Gráfico de Pizza - Status dos Pedidos */}
            {isChartVisible("status_distribution") && (
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Status</CardTitle>
                  <CardDescription>
                    Proporção de pedidos por status atual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfigs.status}
                    className="h-[300px]"
                  >
                    <PieChart>
                      <Pie
                        data={chartData.status}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percentage }) =>
                          `${name}: ${percentage.toFixed(1)}%`
                        }
                      >
                        {chartData.status?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Segunda linha de gráficos */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Gráfico de Barras - Produtos Populares */}
            {isChartVisible("top_produtos") && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Produtos Mais Vendidos</CardTitle>
                      <CardDescription>
                        Top 8 produtos por quantidade vendida
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          exportProdutosData(dashboardData, {
                            format: "csv",
                            title: "Produtos Mais Vendidos",
                          })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openDrilldown(
                            generateDrilldownData("produtos", dashboardData)
                          )
                        }
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfigs.produtos}
                    className="h-[300px]"
                  >
                    <BarChart data={chartData.produtos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="vendas" fill="var(--chart-1)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {/* Gráfico de Horários de Pico */}
            {isChartVisible("horarios_pico") && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Horários de Pico</CardTitle>
                      <CardDescription>
                        Distribuição de pedidos por horário
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          exportHorariosData(dashboardData, {
                            format: "csv",
                            title: "Horários de Pico",
                          })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openDrilldown(
                            generateDrilldownData("horarios", dashboardData)
                          )
                        }
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfigs.horarios}
                    className="h-[300px]"
                  >
                    <AreaChart data={chartData.horarios}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hora" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="pedidos"
                        stroke="var(--chart-1)"
                        fill="var(--chart-1)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Terceira linha de gráficos */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tabela de Receita por Produto */}
            {isChartVisible("receita_produto") && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Receita por Produto</CardTitle>
                      <CardDescription>
                        Análise detalhada de receita e performance
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          exportProdutosData(dashboardData, {
                            format: "csv",
                            title: "Receita por Produto",
                          })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartData.receitaPorProduto
                      ?.slice(0, 8)
                      .map((produto, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div
                              className="font-medium text-sm"
                              title={produto.nomeCompleto}
                            >
                              {produto.nome}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {produto.quantidade} vendidos • Ticket: R${" "}
                              {produto.ticketMedio.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">
                              R${" "}
                              {produto.receita.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </div>
                            <div className="w-20 bg-secondary rounded-full h-2 mt-1">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (produto.receita /
                                      Math.max(
                                        ...(chartData.receitaPorProduto?.map(
                                          (p) => p.receita
                                        ) || [1])
                                      )) *
                                      100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gráfico de Performance por Fonte */}
            {isChartVisible("performance_fonte") && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance por Fonte</CardTitle>
                      <CardDescription>
                        Comparativo de pedidos e valor médio por fonte
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          exportVendasData(dashboardData, {
                            format: "csv",
                            title: "Performance por Fonte",
                          })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfigs.performancePorFonte}
                    className="h-[300px]"
                  >
                    <BarChart data={chartData.performancePorFonte}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0]?.payload;
                            return (
                              <div className="bg-background border rounded-lg p-3 shadow-lg">
                                <p className="font-medium mb-2">{label}</p>
                                <div className="space-y-1">
                                  <p className="text-sm">
                                    <span className="text-chart-1">●</span>{" "}
                                    Pedidos: {payload[0]?.value}
                                  </p>
                                  <p className="text-sm">
                                    <span className="text-chart-2">●</span>{" "}
                                    Valor Médio: R${" "}
                                    {typeof payload[1]?.value === "number"
                                      ? payload[1].value.toFixed(2)
                                      : "0.00"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {typeof data?.percentual === "number"
                                      ? data.percentual.toFixed(1)
                                      : "0"}
                                    % do total
                                  </p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="totalPedidos"
                        fill="var(--chart-1)"
                        name="Total de Pedidos"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="valorMedio"
                        fill="var(--chart-2)"
                        name="Valor Médio (R$)"
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}          </div>
        </div>

        {/* Análise Inteligente de Produtos com Menor Performance */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Análise de Performance dos Produtos</h3>
          
          {/* Análise dos 3 produtos menos vendidos */}
          {(() => {
            // Calcular a média de vendas de todos os produtos
            const totalProdutos = dashboardData.produtos.itensMaisPopulares.length;
            const mediaVendas = totalProdutos > 0 
              ? dashboardData.produtos.itensMaisPopulares.reduce((acc, produto) => acc + produto.quantidadeVendida, 0) / totalProdutos
              : 0;

            // Pegar os 3 produtos menos vendidos (assumindo que a API já retorna ordenado)
            const produtosMenosVendidos = dashboardData.produtos.produtosBaixoDesempenho?.slice(0, 3) || [];

            return (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        Produtos com Menor Performance
                      </CardTitle>
                      <CardDescription>
                        Análise dos 3 produtos menos vendidos no período vs média geral
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Média geral: {mediaVendas.toFixed(1)} vendas</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {produtosMenosVendidos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p className="text-lg font-medium">Excelente!</p>
                      <p>Todos os produtos estão com boa performance</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {produtosMenosVendidos.map((produto) => {
                        const diferencaPercentual = mediaVendas > 0 
                          ? ((produto.quantidadeVendida - mediaVendas) / mediaVendas) * 100
                          : 0;
                        
                        const isProblematico = diferencaPercentual < -30; // 30% abaixo da média
                        const isAtencao = diferencaPercentual < -15 && diferencaPercentual >= -30; // Entre 15% e 30% abaixo
                        const isOk = diferencaPercentual >= -15; // Até 15% abaixo da média é considerado ok

                        return (
                          <div
                            key={produto.produtoId}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                              isProblematico 
                                ? 'border-red-200 bg-red-50/50' 
                                : isAtencao 
                                ? 'border-yellow-200 bg-yellow-50/50'
                                : 'border-green-200 bg-green-50/50'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-sm">
                                  {produto.nome}
                                </div>
                                {isProblematico && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                    🚨 Crítico
                                  </span>
                                )}
                                {isAtencao && (
                                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                                    ⚠️ Atenção
                                  </span>
                                )}
                                {isOk && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                    ✅ Estável
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {produto.quantidadeVendida} vendidos • 
                                <span className={
                                  isProblematico ? 'text-red-600 font-medium' :
                                  isAtencao ? 'text-yellow-600 font-medium' :
                                  'text-green-600'
                                }>
                                  {diferencaPercentual >= 0 ? '+' : ''}{diferencaPercentual.toFixed(1)}% vs média
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold text-sm ${
                                isProblematico ? 'text-red-700' :
                                isAtencao ? 'text-yellow-700' :
                                'text-green-700'
                              }`}>
                                R$ {produto.receita.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}
                              </div>
                              <div className="text-xs mt-1">
                                {isProblematico && (
                                  <span className="text-red-600 font-medium">
                                    Precisa de ação
                                  </span>
                                )}
                                {isAtencao && (
                                  <span className="text-yellow-600 font-medium">
                                    Monitorar
                                  </span>
                                )}
                                {isOk && (
                                  <span className="text-green-600">
                                    Performance ok
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Sugestões baseadas na análise */}
                      <div className="mt-6 space-y-3">
                        {produtosMenosVendidos.some(p => {
                          const diff = mediaVendas > 0 ? ((p.quantidadeVendida - mediaVendas) / mediaVendas) * 100 : 0;
                          return diff < -30;
                        }) && (
                          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-red-800 mb-1">
                                  🚨 Ação Urgente Recomendada
                                </p>
                                <p className="text-sm text-red-700">
                                  Produtos com performance crítica detectados. Considere:
                                  <span className="font-medium"> criar promoções, revisar preços, melhorar descrições ou destacar no cardápio.</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {produtosMenosVendidos.some(p => {
                          const diff = mediaVendas > 0 ? ((p.quantidadeVendida - mediaVendas) / mediaVendas) * 100 : 0;
                          return diff < -15 && diff >= -30;
                        }) && (
                          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="flex items-start gap-3">
                              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-yellow-800 mb-1">
                                  ⚠️ Monitoramento Recomendado
                                </p>
                                <p className="text-sm text-yellow-700">
                                  Alguns produtos estão abaixo da média. 
                                  <span className="font-medium"> Monitore as próximas semanas e considere ajustes se necessário.</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {produtosMenosVendidos.every(p => {
                          const diff = mediaVendas > 0 ? ((p.quantidadeVendida - mediaVendas) / mediaVendas) * 100 : 0;
                          return diff >= -15;
                        }) && produtosMenosVendidos.length > 0 && (
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-green-800 mb-1">
                                  ✅ Performance Saudável
                                </p>
                                <p className="text-sm text-green-700">
                                  Mesmo os produtos menos vendidos estão com performance dentro da normalidade. 
                                  <span className="font-medium">Continue o excelente trabalho!</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })()}
        </div>

        {/* 5. Status dos Pedidos e Formas de Pagamento */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Status dos Pedidos e Formas de Pagamento
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Resumo de Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Status dos Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.operacional.pedidosPorStatus
                    .slice(0, 3)
                    .map((status) => (
                      <div
                        key={status.statusId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor:
                                chartConfigs.status[status.titulo.toLowerCase()]
                                  ?.color || "#8884d8",
                            }}
                          />
                          <span className="text-sm">{status.titulo}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {status.totalPedidos} pedidos
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {status.percentualTotal.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>{" "}
            {/* Formas de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Formas de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {dashboardData.operacional.formasPagamentoPreferidas.map(
                    (forma) => (
                      <div
                        key={forma.pagamentoId}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <span className="text-sm font-medium">
                          {forma.nome}
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {forma.totalPedidos} pedidos
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {forma.percentualTotal.toFixed(1)}% do total
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  {dashboardData.operacional.formasPagamentoPreferidas
                    .length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p className="text-sm">
                        Nenhuma forma de pagamento encontrada
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Detalhes Operacionais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Detalhes Operacionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total de Movimentações:</span>
                    <span className="font-bold">
                      {dashboardData.operacional.movimentacoesBoard}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tempo Médio Finalização:</span>
                    <span className="font-semibold">
                      {dashboardData.performance.tempoMedioFinalizacao}min
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxa Conversão:</span>
                    <span className="font-semibold text-green-500">
                      {dashboardData.vendas.taxaConversao.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Confirmação Automática:</span>
                    <span className="font-semibold text-blue-500">
                      {dashboardData.performance.taxaConfirmacaoAutomatica.toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de Configuração */}
        <DashboardConfig
          isOpen={showConfig}
          onClose={() => setShowConfig(false)}
        />

        {/* Modal de Configurações Avançadas */}
        <AdvancedSettings
          isOpen={showAdvancedSettings}
          onClose={() => setShowAdvancedSettings(false)}
          settings={settings}
          onSettingsChange={(newSettings) => {
            // Aqui você integraria com o hook de configurações
            console.log("Novas configurações:", newSettings);
          }}
        />

        {/* Modal de Export Avançado */}
        <AdvancedExport
          isOpen={showAdvancedExport}
          onClose={() => setShowAdvancedExport(false)}
          dashboardData={dashboardData}
        />

        {/* Modal de Drill-down */}
        <ChartDrilldown
          isOpen={drilldownState.isOpen}
          onClose={closeDrilldown}
          data={drilldownState.data}
        />
      </div>
    </div>
  );
}
