"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardData } from "@/types/dashboard.types";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";

interface ComparisonData {
  atual: DashboardData;
  anterior: DashboardData;
}

interface ComparisonMetric {
  name: string;
  currentValue: number;
  previousValue: number;
  unit?: string;
  format?: "currency" | "number" | "percentage" | "time";
}

interface PeriodComparisonProps {
  data: ComparisonData;
  className?: string;
}

export function PeriodComparison({ data, className }: PeriodComparisonProps) {
  const comparisonMetrics: ComparisonMetric[] = useMemo(
    () => [
      {
        name: "Receita Total",
        currentValue: data.atual.vendas.receitaTotal,
        previousValue: data.anterior.vendas.receitaTotal,
        format: "currency",
      },
      {
        name: "Total de Pedidos",
        currentValue: data.atual.vendas.totalPedidos,
        previousValue: data.anterior.vendas.totalPedidos,
        format: "number",
      },
      {
        name: "Ticket Médio",
        currentValue: data.atual.vendas.ticketMedio,
        previousValue: data.anterior.vendas.ticketMedio,
        format: "currency",
      },
      {
        name: "Tempo Médio Finalização",
        currentValue: data.atual.performance.tempoMedioFinalizacao,
        previousValue: data.anterior.performance.tempoMedioFinalizacao,
        format: "time",
        unit: "min",
      },
      {
        name: "Pedidos em Atraso",
        currentValue: data.atual.performance.pedidosEmAtraso,
        previousValue: data.anterior.performance.pedidosEmAtraso,
        format: "number",
      },
      {
        name: "Taxa de Confirmação Automática",
        currentValue: data.atual.performance.taxaConfirmacaoAutomatica,
        previousValue: data.anterior.performance.taxaConfirmacaoAutomatica,
        format: "percentage",
        unit: "%",
      },
    ],
    [data]
  );

  const formatValue = (value: number, format?: string): string => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value);
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "time":
        return `${value.toFixed(0)}`;
      default:
        return value.toLocaleString("pt-BR");
    }
  };

  const getChangePercentage = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const getChangeIcon = (percentage: number) => {
    if (percentage > 0) return <TrendingUp className="h-4 w-4" />;
    if (percentage < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getChangeColor = (percentage: number, isNegativeGood = false) => {
    if (percentage > 0) {
      return isNegativeGood ? "text-red-600" : "text-green-600";
    }
    if (percentage < 0) {
      return isNegativeGood ? "text-green-600" : "text-red-600";
    }
    return "text-gray-600";
  };

  const getBadgeVariant = (percentage: number, isNegativeGood = false) => {
    if (percentage > 0) {
      return isNegativeGood ? "destructive" : "default";
    }
    if (percentage < 0) {
      return isNegativeGood ? "default" : "destructive";
    }
    return "secondary";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Comparação de Períodos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisonMetrics.map((metric) => {
            const changePercentage = getChangePercentage(
              metric.currentValue,
              metric.previousValue
            );
            const isNegativeGood =
              metric.name.includes("Atraso") || metric.name.includes("Tempo");

            return (
              <div
                key={metric.name}
                className="border rounded-lg p-4 space-y-2"
              >
                <h4 className="text-sm font-medium text-gray-700">
                  {metric.name}
                </h4>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Atual</span>
                    <span className="text-lg font-semibold">
                      {formatValue(metric.currentValue, metric.format)}
                      {metric.unit && ` ${metric.unit}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Anterior</span>
                    <span className="text-sm text-gray-600">
                      {formatValue(metric.previousValue, metric.format)}
                      {metric.unit && ` ${metric.unit}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge
                    variant={getBadgeVariant(changePercentage, isNegativeGood)}
                    className="text-xs"
                  >
                    <span
                      className={getChangeColor(
                        changePercentage,
                        isNegativeGood
                      )}
                    >
                      {getChangeIcon(changePercentage)}
                      {Math.abs(changePercentage).toFixed(1)}%
                    </span>
                  </Badge>

                  <span className="text-xs text-gray-500">
                    {changePercentage > 0 ? "+" : ""}
                    {formatValue(
                      metric.currentValue - metric.previousValue,
                      metric.format
                    )}
                    {metric.unit && ` ${metric.unit}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
