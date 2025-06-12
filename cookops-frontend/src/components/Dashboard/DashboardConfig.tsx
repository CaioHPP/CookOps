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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DashboardChart,
  useDashboardSettings,
} from "@/hooks/useDashboardSettings";
import {
  BarChart3,
  Download,
  Eye,
  EyeOff,
  Monitor,
  Moon,
  RefreshCw,
  Settings,
  Sun,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

interface DashboardConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryNames = {
  vendas: "Vendas",
  operacional: "Operacional",
  produtos: "Produtos",
  performance: "Performance",
};

const categoryIcons = {
  vendas: BarChart3,
  operacional: Monitor,
  produtos: Eye,
  performance: RefreshCw,
};

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function DashboardConfig({ isOpen, onClose }: DashboardConfigProps) {
  const {
    settings,
    toggleChart,
    setAutoRefresh,
    setRefreshInterval,
    setDefaultPeriod,
    setShowComparison,
    setAlertsEnabled,
    setTheme,
    resetToDefaults,
    exportSettings,
    importSettings,
    getChartsByCategory,
    isChartVisible,
  } = useDashboardSettings();

  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      await importSettings(file);
    } catch (error) {
      console.error("Erro ao importar configurações:", error);
      alert("Erro ao importar configurações. Verifique o formato do arquivo.");
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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
                </div>
                <Switch
                  checked={isVisible}
                  onCheckedChange={() => toggleChart(chart.id)}
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
          </DialogHeader>

          <Tabs defaultValue="charts" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="behavior">Comportamento</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
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
                  ).map(renderChartsByCategory)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="mt-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Atualização Automática
                    </CardTitle>
                    <CardDescription>
                      Configure se o dashboard deve se atualizar automaticamente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-refresh" className="text-sm">
                        Ativar atualização automática
                      </Label>
                      <Switch
                        id="auto-refresh"
                        checked={settings.autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                    </div>

                    {settings.autoRefresh && (
                      <div className="space-y-2">
                        <Label htmlFor="refresh-interval" className="text-sm">
                          Intervalo de atualização
                        </Label>
                        <Select
                          value={settings.refreshInterval.toString()}
                          onValueChange={(value) =>
                            setRefreshInterval(Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60000">1 minuto</SelectItem>
                            <SelectItem value="300000">5 minutos</SelectItem>
                            <SelectItem value="600000">10 minutos</SelectItem>
                            <SelectItem value="1800000">30 minutos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Configurações Padrão
                    </CardTitle>
                    <CardDescription>
                      Defina valores padrão para filtros e funcionalidades
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-period" className="text-sm">
                        Período padrão
                      </Label>
                      <Select
                        value={settings.defaultPeriod}
                        onValueChange={setDefaultPeriod}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 dias</SelectItem>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-comparison" className="text-sm">
                        Mostrar comparação por padrão
                      </Label>
                      <Switch
                        id="show-comparison"
                        checked={settings.showComparison}
                        onCheckedChange={setShowComparison}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="alerts-enabled" className="text-sm">
                        Ativar sistema de alertas
                      </Label>
                      <Switch
                        id="alerts-enabled"
                        checked={settings.alertsEnabled}
                        onCheckedChange={setAlertsEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tema</CardTitle>
                  <CardDescription>
                    Escolha a aparência do dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {(["light", "dark", "system"] as const).map((theme) => {
                      const Icon = themeIcons[theme];
                      const isSelected = settings.theme === theme;

                      return (
                        <Button
                          key={theme}
                          variant={isSelected ? "default" : "outline"}
                          className="h-20 flex-col gap-2"
                          onClick={() => setTheme(theme)}
                        >
                          <Icon className="h-6 w-6" />
                          <span className="text-sm capitalize">
                            {theme === "system"
                              ? "Sistema"
                              : theme === "light"
                              ? "Claro"
                              : "Escuro"}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Exportar Configurações
                    </CardTitle>
                    <CardDescription>
                      Faça backup das suas configurações personalizadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={exportSettings} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Configurações
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Importar Configurações
                    </CardTitle>
                    <CardDescription>
                      Restaure configurações de um arquivo de backup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileImport}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={importing}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {importing ? "Importando..." : "Importar Configurações"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Resetar Configurações
                    </CardTitle>
                    <CardDescription>
                      Volte às configurações padrão do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="destructive"
                      onClick={resetToDefaults}
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resetar para Padrão
                    </Button>
                  </CardContent>
                </Card>
              </div>
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
