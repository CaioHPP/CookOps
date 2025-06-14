"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DashboardChart,
  useDashboardSettings,
} from "@/hooks/useDashboardSettings";
import { CHART_THEMES, ChartTheme } from "@/lib/chart-themes";
import {
  BarChart3,
  Eye,
  EyeOff,
  Palette,
  RefreshCw,
  Settings,
} from "lucide-react";

interface DashboardConfigProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange?: () => void; // Callback para forçar re-render
}

const categoryNames = {
  vendas: "Vendas",
  operacional: "Operacional",
  produtos: "Produtos",
  performance: "Performance",
};

const categoryIcons = {
  vendas: BarChart3,
  operacional: Settings,
  produtos: Eye,
  performance: RefreshCw,
};

export function DashboardConfig({
  isOpen,
  onClose,
  onSettingsChange,
}: DashboardConfigProps) {
  const {
    settings,
    toggleChart,
    setChartTheme,
    getChartsByCategory,
    isChartVisible,
  } = useDashboardSettings();

  const renderChartsByCategory = (category: DashboardChart["category"]) => {
    const charts = getChartsByCategory(category);
    const CategoryIcon = categoryIcons[category];

    return (
      <Card key={category}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CategoryIcon className="h-4 w-4" />
            {categoryNames[category]}
          </CardTitle>
          <CardDescription className="text-sm">
            {charts.length} gráfico{charts.length !== 1 ? "s" : ""} disponível
            {charts.length !== 1 ? "is" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {charts.map((chart) => {
            const isVisible = isChartVisible(chart.id);
            return (
              <div
                key={chart.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {isVisible ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-medium text-sm">{chart.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {chart.description}
                  </p>
                </div>{" "}
                <Switch
                  checked={isVisible}
                  onCheckedChange={() => {
                    toggleChart(chart.id);
                    // Força uma atualização do dashboard
                    onSettingsChange?.();
                  }}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações do Dashboard
            </DialogTitle>
            <DialogDescription>
              Personalize a exibição e comportamento do seu dashboard
            </DialogDescription>
          </DialogHeader>{" "}
          <Tabs defaultValue="charts" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
            </TabsList>
            <TabsContent value="charts" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Escolha quais gráficos exibir no seu dashboard. Você pode
                  ativar ou desativar qualquer visualização conforme sua
                  necessidade.
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {(
                    Object.keys(categoryNames) as Array<
                      keyof typeof categoryNames
                    >
                  ).map(renderChartsByCategory)}{" "}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Tema de Cores dos Gráficos
                  </CardTitle>
                  <CardDescription>
                    Escolha a paleta de cores para os gráficos do dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(Object.keys(CHART_THEMES) as ChartTheme[]).map(
                      (themeKey) => {
                        const theme = CHART_THEMES[themeKey];
                        const isSelected = settings.chartTheme === themeKey;

                        return (
                          <div
                            key={themeKey}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => {
                              setChartTheme(themeKey);
                              // Força uma atualização do dashboard
                              onSettingsChange?.();
                            }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {theme.name}
                                </span>
                                {isSelected && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {theme.description}
                              </p>{" "}
                              <div className="flex gap-1">
                                {themeKey === "purple" && (
                                  <>
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#9333ea" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#f59e0b" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#3b82f6" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#f97316" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#8b5cf6" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#10b981" }}
                                    />
                                  </>
                                )}
                                {themeKey === "ocean" && (
                                  <>
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#3b82f6" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#06b6d4" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#10b981" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#9333ea" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#f59e0b" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#8b5cf6" }}
                                    />
                                  </>
                                )}
                                {themeKey === "sunset" && (
                                  <>
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#f97316" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#ef4444" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#f59e0b" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#fb923c" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#eab308" }}
                                    />
                                    <div
                                      className="w-6 h-6 rounded border"
                                      style={{ backgroundColor: "#9333ea" }}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>{" "}
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DashboardConfig;
