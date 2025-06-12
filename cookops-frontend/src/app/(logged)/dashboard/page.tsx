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
  } = useChartDrilldown(); // Export functionality
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
      setLoading(true); // Carregar dados diretamente do backend
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
  ); // Dados para os gráficos com otimização
  const chartData = useMemo(() => {
    if (!dashboardData) return {}; // Usar a função utilitária para gerar dados dinâmicos baseados no período
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
      <div className="max-w-7xl mx-auto space-y-6">
        {" "}
        {/* Cabeçalho do Dashboard */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard CookOps</h1>
            <p className="text-muted-foreground">
              Análise completa das operações - {dashboardData.periodo}
            </p>
            {/* Indicador do período atual */}
            <div className="mt-2 flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                📊 Período: {getPeriodLabel(filters.periodo)}
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                📈 Granularidade: {getTimeUnit(filters.periodo)}
              </div>
            </div>
          </div>{" "}
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
              <Label htmlFor="periodo">Período:</Label>{" "}
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
                </SelectTrigger>{" "}
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="90">90 dias</SelectItem>
                  <SelectItem value="180">6 meses</SelectItem>
                  <SelectItem value="365">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Botões de ação */}{" "}
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
              onClick={() => setShowAdvancedExport(true)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Avançado
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
              onClick={() => setShowAdvancedSettings(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Avançado
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
          </div>{" "}
        </div>
        {/* Cards de Métricas Principais */}
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
          </Card>{" "}
        </div>{" "}
        {/* Comparação de Períodos */}
        {showComparison && comparisonData && (
          <PeriodComparison data={comparisonData} />
        )}
        {/* Gráficos */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Análise Visual</h3>

          {/* Primeira linha de gráficos */}
          <div className="grid gap-6 md:grid-cols-2">
            {" "}
            {/* Gráfico de Tendência de Vendas */}
            {isChartVisible("vendas_trend") && (
              <Card>
                {" "}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle>
                        Tendência de Vendas - {getPeriodLabel(filters.periodo)}
                      </CardTitle>
                      <CardDescription>
                        Evolução dos pedidos por {getTimeUnit(filters.periodo)}{" "}
                        ({getPeriodLabel(filters.periodo)}){" "}
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
          <div className="grid gap-6 md:grid-cols-2">
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

          {/* Terceira linha de gráficos - Novos Charts */}
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
                      <YAxis yAxisId="right" orientation="right" />{" "}
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
            )}
          </div>

          {/* Tabela de Produtos com Baixo Desempenho */}
          {isChartVisible("produtos_baixo_desempenho") &&
            dashboardData.produtos.produtosBaixoDesempenho && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        Produtos com Baixo Desempenho
                      </CardTitle>
                      <CardDescription>
                        Produtos que precisam de atenção para melhorar vendas
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          exportProdutosData(dashboardData, {
                            format: "csv",
                            title: "Produtos Baixo Desempenho",
                          })
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardData.produtos.produtosBaixoDesempenho.length ===
                  0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <p className="text-lg font-medium">Excelente!</p>
                      <p>Todos os produtos estão com boa performance</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dashboardData.produtos.produtosBaixoDesempenho.map(
                        (produto) => (
                          <div
                            key={produto.produtoId}
                            className="flex items-center justify-between p-4 rounded-lg border border-orange-200 bg-orange-50/50"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                {produto.nome}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Apenas {produto.quantidadeVendida} vendidos no
                                período
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-sm text-orange-700">
                                R${" "}
                                {produto.receita.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}
                              </div>
                              <div className="text-xs text-orange-600 mt-1">
                                Baixa performance
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          💡 <strong>Sugestão:</strong> Considere revisar o
                          preço, descrição ou promoções para estes produtos.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
        </div>
        {/* Status dos Pedidos */}
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
          </Card>

          {/* Formas de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Formas de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.operacional.formasPagamentoPreferidas
                  .slice(0, 3)
                  .map((forma) => (
                    <div
                      key={forma.pagamentoId}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{forma.nome}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {forma.totalPedidos}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {forma.percentualTotal.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Informações Financeiras */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Resumo Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Receita Líquida:</span>
                  <span className="font-semibold">
                    R${" "}
                    {dashboardData.financeiro.receitaLiquida.toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taxa de Entrega:</span>
                  <span className="font-semibold">
                    {dashboardData.financeiro.taxaEntregaMedia.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Desconto Médio:</span>
                  <span className="font-semibold">
                    {dashboardData.financeiro.descontoMedio.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>{" "}
        {/* Segunda linha de métricas - Performance e Operacionais */}
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
        {/* Modal de Configuração */}
        <DashboardConfig
          isOpen={showConfig}
          onClose={() => setShowConfig(false)}
        />{" "}
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
