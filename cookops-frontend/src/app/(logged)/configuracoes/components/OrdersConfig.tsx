"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Bell, Clock, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface OrderSettings {
  autoAcceptOrders: boolean;
  orderTimeout: number;
  enableNotifications: boolean;
  minOrderValue: number;
  maxOrdersPerHour: number;
  enablePriorityOrders: boolean;
}

export default function OrdersConfig() {
  const [settings, setSettings] = useState<OrderSettings>({
    autoAcceptOrders: false,
    orderTimeout: 30,
    enableNotifications: true,
    minOrderValue: 0,
    maxOrdersPerHour: 50,
    enablePriorityOrders: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Here you would integrate with your API
      // await OrderSettingsService.update(settings)

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Configurações de pedidos salvas com sucesso");
    } catch (error) {
      alert("Erro ao salvar configurações");
      console.error("Erro ao salvar configurações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = <K extends keyof OrderSettings>(
    key: K,
    value: OrderSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Configurações de Pedidos
        </CardTitle>
        <CardDescription>
          Gerencie como os pedidos são processados no sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auto Accept Orders */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Aceitar pedidos automaticamente</Label>
            <p className="text-sm text-muted-foreground">
              Os pedidos serão aceitos automaticamente sem intervenção manual
            </p>
          </div>
          <Switch
            checked={settings.autoAcceptOrders}
            onCheckedChange={(checked) =>
              updateSetting("autoAcceptOrders", checked)
            }
          />
        </div>

        {/* Order Timeout */}
        <div className="space-y-2">
          <Label className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tempo limite para aceitar pedidos (minutos)
          </Label>
          <p className="text-sm text-muted-foreground">
            Tempo máximo para aceitar um pedido antes que expire
          </p>
          <Input
            type="number"
            min="5"
            max="120"
            value={settings.orderTimeout}
            onChange={(e) =>
              updateSetting("orderTimeout", parseInt(e.target.value) || 30)
            }
            className="max-w-32"
          />
        </div>

        {/* Enable Notifications */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações de novos pedidos
            </Label>
            <p className="text-sm text-muted-foreground">
              Receber notificações sonoras e visuais para novos pedidos
            </p>
          </div>
          <Switch
            checked={settings.enableNotifications}
            onCheckedChange={(checked) =>
              updateSetting("enableNotifications", checked)
            }
          />
        </div>

        {/* Minimum Order Value */}
        <div className="space-y-2">
          <Label className="text-base">Valor mínimo do pedido (R$)</Label>
          <p className="text-sm text-muted-foreground">
            Valor mínimo para aceitar pedidos (0 = sem limite)
          </p>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={settings.minOrderValue}
            onChange={(e) =>
              updateSetting("minOrderValue", parseFloat(e.target.value) || 0)
            }
            className="max-w-32"
          />
        </div>

        {/* Max Orders Per Hour */}
        <div className="space-y-2">
          <Label className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Máximo de pedidos por hora
          </Label>
          <p className="text-sm text-muted-foreground">
            Limite de pedidos que podem ser aceitos por hora
          </p>
          <Input
            type="number"
            min="1"
            max="200"
            value={settings.maxOrdersPerHour}
            onChange={(e) =>
              updateSetting("maxOrdersPerHour", parseInt(e.target.value) || 50)
            }
            className="max-w-32"
          />
        </div>

        {/* Priority Orders */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Pedidos prioritários</Label>
            <p className="text-sm text-muted-foreground">
              Permitir que alguns pedidos tenham prioridade na fila
            </p>
          </div>
          <Switch
            checked={settings.enablePriorityOrders}
            onCheckedChange={(checked) =>
              updateSetting("enablePriorityOrders", checked)
            }
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
