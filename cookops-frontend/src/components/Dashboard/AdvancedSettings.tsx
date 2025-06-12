"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Bell,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface AdvancedSettingsData {
  autoRefresh: boolean;
  refreshInterval: number;
  enableNotifications: boolean;
  enableAlerts: boolean;
  enableMetricUpdates: boolean;
  enableOrderStatus: boolean;
  chartAnimations: boolean;
  darkMode: boolean;
  cacheEnabled: boolean;
  cacheTTL: number;
}

interface AdvancedSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AdvancedSettingsData;
  onSettingsChange: (settings: AdvancedSettingsData) => void;
}

export function AdvancedSettings({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}: AdvancedSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings = {
      autoRefresh: true,
      refreshInterval: 30,
      enableNotifications: true,
      enableAlerts: true,
      enableMetricUpdates: true,
      enableOrderStatus: true,
      chartAnimations: true,
      darkMode: false,
      cacheEnabled: true,
      cacheTTL: 300,
    };
    setLocalSettings(defaultSettings);
  };
  const updateSetting = (
    key: keyof AdvancedSettingsData,
    value: boolean | number | string
  ) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações Avançadas
          </DialogTitle>
          <DialogDescription>
            Configure as funcionalidades avançadas do dashboard para otimizar
            sua experiência.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="performance"
              className="flex items-center gap-1"
            >
              <Zap className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-1"
            >
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Gráficos
            </TabsTrigger>
            <TabsTrigger value="refresh" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Atualização
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Otimizações de Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Cache Inteligente</Label>
                    <p className="text-sm text-muted-foreground">
                      Armazena dados em cache para carregamento mais rápido
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.cacheEnabled}
                    onCheckedChange={(value) =>
                      updateSetting("cacheEnabled", value)
                    }
                  />
                </div>

                {localSettings.cacheEnabled && (
                  <div className="space-y-2">
                    <Label>Tempo de Vida do Cache (segundos)</Label>
                    <div className="px-3">
                      {" "}
                      <Slider
                        value={[localSettings.cacheTTL]}
                        onValueChange={(values: number[]) =>
                          updateSetting("cacheTTL", values[0])
                        }
                        min={60}
                        max={1800}
                        step={30}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 min</span>
                        <span>
                          {Math.floor(localSettings.cacheTTL / 60)} min
                        </span>
                        <span>30 min</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Animações de Gráficos</Label>
                    <p className="text-sm text-muted-foreground">
                      Animações suaves podem afetar a performance
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.chartAnimations}
                    onCheckedChange={(value) =>
                      updateSetting("chartAnimations", value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Sistema de Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notificações Gerais</Label>
                    <p className="text-sm text-muted-foreground">
                      Habilita o sistema de notificações
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.enableNotifications}
                    onCheckedChange={(value) =>
                      updateSetting("enableNotifications", value)
                    }
                  />
                </div>

                {localSettings.enableNotifications && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="flex items-center gap-2">
                          Alertas Críticos
                          <Badge variant="destructive" className="text-xs">
                            Importante
                          </Badge>
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações de problemas críticos
                        </p>
                      </div>
                      <Switch
                        checked={localSettings.enableAlerts}
                        onCheckedChange={(value) =>
                          updateSetting("enableAlerts", value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Atualizações de Métricas</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações de mudanças significativas
                        </p>
                      </div>
                      <Switch
                        checked={localSettings.enableMetricUpdates}
                        onCheckedChange={(value) =>
                          updateSetting("enableMetricUpdates", value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Status de Pedidos</Label>
                        <p className="text-sm text-muted-foreground">
                          Notificações de mudanças de status
                        </p>
                      </div>
                      <Switch
                        checked={localSettings.enableOrderStatus}
                        onCheckedChange={(value) =>
                          updateSetting("enableOrderStatus", value)
                        }
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Configurações de Gráficos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema dos Gráficos</Label>
                  <Select
                    value={localSettings.darkMode ? "dark" : "light"}
                    onValueChange={(value) =>
                      updateSetting("darkMode", value === "dark")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Animações Suaves</Label>
                    <p className="text-sm text-muted-foreground">
                      Transições animadas nos gráficos
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.chartAnimations}
                    onCheckedChange={(value) =>
                      updateSetting("chartAnimations", value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refresh" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Atualização Automática
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Atualiza os dados automaticamente
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.autoRefresh}
                    onCheckedChange={(value) =>
                      updateSetting("autoRefresh", value)
                    }
                  />
                </div>

                {localSettings.autoRefresh && (
                  <div className="space-y-2">
                    <Label>Intervalo de Atualização (segundos)</Label>
                    <div className="px-3">
                      {" "}
                      <Slider
                        value={[localSettings.refreshInterval]}
                        onValueChange={(values: number[]) =>
                          updateSetting("refreshInterval", values[0])
                        }
                        min={10}
                        max={300}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>10s</span>
                        <span>{localSettings.refreshInterval}s</span>
                        <span>5min</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Restaurar Padrões
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
