// components/Dashboard/ChartDrilldown.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DrilldownData } from "@/hooks/useChartDrilldown";
import { Download, Eye, TrendingDown, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDrilldownProps {
  isOpen: boolean;
  onClose: () => void;
  data: DrilldownData | null;
}

export function ChartDrilldown({ isOpen, onClose, data }: ChartDrilldownProps) {
  if (!data) return null;

  const exportData = () => {
    const csvContent = [
      Object.keys(data.data[0] || {}).join(","),
      ...data.data.map((row) => Object.values(row).join(",")),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.chartType}_detalhes.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderChart = () => {
    switch (data.chartType) {
      case "vendas":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />{" "}
              <Tooltip
                formatter={(value: number | string, name: string) => {
                  if (name === "receita") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Receita",
                    ];
                  } else if (name === "pedidos") {
                    return [Number(value).toLocaleString("pt-BR"), "Pedidos"];
                  } else if (name === "tendencia") {
                    return [Number(value).toLocaleString("pt-BR"), "Tendência"];
                  } else if (name === "ticketMedio") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Ticket Médio",
                    ];
                  } else if (name === "crescimentoPercentual") {
                    return [`${Number(value).toFixed(1)}%`, "Crescimento"];
                  }
                  return [value, name];
                }}
              />{" "}
              <Bar
                dataKey="pedidos"
                fill="hsl(var(--chart-1))"
                name="Pedidos"
                barSize={30}
                fillOpacity={0.8}
              />{" "}
              <Line
                type="monotone"
                dataKey="tendencia"
                stroke="hsl(var(--dashboard-accent))"
                strokeWidth={3}
                dot={{
                  fill: "hsl(var(--dashboard-accent))",
                  strokeWidth: 2,
                  r: 4,
                }}
                name="Tendência"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case "performance":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="metrica" type="category" width={150} />{" "}
              <Tooltip
                formatter={(
                  value: number | string,
                  name: string,
                  props: { payload?: { unidade?: string } }
                ) => {
                  const unit = props.payload?.unidade || "";
                  if (typeof value === "number") {
                    if (unit === "%") {
                      return [`${value.toFixed(2)}%`, "Valor"];
                    } else if (unit === "min") {
                      return [`${value.toFixed(1)} min`, "Valor"];
                    } else {
                      return [value.toLocaleString("pt-BR"), "Valor"];
                    }
                  }
                  return [value, "Valor"];
                }}
              />{" "}
              <Bar dataKey="valor" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "produtos":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip
                formatter={(value: number | string, name: string) => {
                  if (name === "quantidadeVendida") {
                    return [
                      Number(value).toLocaleString("pt-BR"),
                      "Quantidade Vendida",
                    ];
                  } else if (name === "receita") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Receita",
                    ];
                  }
                  return [value, name];
                }}
              />{" "}
              <Bar
                dataKey="quantidadeVendida"
                fill="hsl(var(--chart-3))"
                name="Quantidade Vendida"
              />{" "}
              <Bar
                dataKey="receita"
                fill="hsl(var(--chart-2))"
                name="Receita"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "receita_produtos":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip
                formatter={(value: number | string, name: string) => {
                  if (name === "receita") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Receita",
                    ];
                  } else if (name === "quantidadeVendida") {
                    return [
                      Number(value).toLocaleString("pt-BR"),
                      "Quantidade Vendida",
                    ];
                  } else if (name === "ticketMedio") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Ticket Médio",
                    ];
                  }
                  return [value, name];
                }}
              />{" "}
              <Bar
                dataKey="receita"
                fill="hsl(var(--chart-2))"
                name="Receita"
              />
              <Bar
                dataKey="quantidadeVendida"
                fill="hsl(var(--chart-3))"
                name="Quantidade Vendida"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "vendas_dia_semana":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="diaSemana" />
              <YAxis />
              <Tooltip
                formatter={(value: number | string, name: string) => {
                  if (name === "totalPedidos") {
                    return [
                      Number(value).toLocaleString("pt-BR"),
                      "Total de Pedidos",
                    ];
                  } else if (name === "receitaTotal") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Receita Total",
                    ];
                  } else if (name === "ticketMedio") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Ticket Médio",
                    ];
                  }
                  return [value, name];
                }}
              />{" "}
              <Bar
                dataKey="totalPedidos"
                fill="hsl(var(--chart-1))"
                name="Total de Pedidos"
              />
              <Bar
                dataKey="receitaTotal"
                fill="hsl(var(--chart-2))"
                name="Receita Total"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "horarios":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip
                formatter={(value: number | string, name: string) => {
                  if (name === "totalPedidos") {
                    return [
                      Number(value).toLocaleString("pt-BR"),
                      "Total de Pedidos",
                    ];
                  } else if (name === "receitaEstimada") {
                    return [
                      `R$ ${Number(value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Receita Estimada",
                    ];
                  }
                  return [value, name];
                }}
              />{" "}
              <Line
                type="monotone"
                dataKey="totalPedidos"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                name="Total de Pedidos"
              />
              <Line
                type="monotone"
                dataKey="receitaEstimada"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Receita Estimada"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            Gráfico não disponível
          </div>
        );
    }
  };
  const renderTableCell = (row: Record<string, unknown>, column: string) => {
    const value = row[column];

    // Pular colunas que são IDs (terminam com Id ou começam com id)
    if (
      column.toLowerCase().includes("id") ||
      column.toLowerCase().endsWith("id")
    ) {
      return null;
    }

    let formattedValue: string;

    if (typeof value === "number") {
      if (
        column.includes("receita") ||
        column.includes("Receita") ||
        column.includes("valor")
      ) {
        formattedValue = `R$ ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      } else if (
        column.includes("taxa") ||
        column.includes("Taxa") ||
        column.includes("percent") ||
        column.includes("ocupacao")
      ) {
        formattedValue = `${value.toFixed(2)}%`;
      } else if (column.includes("tempo") || column.includes("Tempo")) {
        formattedValue = `${value.toFixed(1)} min`;
      } else {
        formattedValue = value.toLocaleString("pt-BR");
      }
    } else {
      formattedValue = value?.toString() || "-";
    }

    if (column === "status" && value) {
      return (
        <div className="flex items-center gap-2">
          <span>{formattedValue}</span>
          <Badge
            variant={
              (value as string) === "crítico"
                ? "destructive"
                : (value as string) === "atenção"
                ? "default"
                : "secondary"
            }
          >
            {value as string}
          </Badge>
        </div>
      );
    }

    return <span>{formattedValue}</span>;
  };

  const renderTable = () => {
    if (!data.data.length) return null;

    const allColumns = Object.keys(data.data[0]);
    // Filtrar colunas que são IDs
    const columns = allColumns.filter(
      (column) =>
        !column.toLowerCase().includes("id") &&
        !column.toLowerCase().endsWith("id")
    );

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="capitalize">
                {column.replace(/([A-Z])/g, " $1").trim()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                const cellContent = renderTableCell(row, column);
                return cellContent ? (
                  <TableCell key={column}>{cellContent}</TableCell>
                ) : null;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  const renderMetadata = () => {
    if (!data.metadata) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Resumo do Período</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(data.metadata).map(([key, value]) => {
            // Pular campos que são IDs
            if (
              key.toLowerCase().includes("id") ||
              key.toLowerCase().endsWith("id")
            ) {
              return null;
            }

            let formattedValue: React.ReactNode;

            if (typeof value === "object" && value !== null) {
              // Para objetos complexos, mostrar informações relevantes
              if ("nome" in value && "totalPedidos" in value) {
                formattedValue = `${value.nome} (${value.totalPedidos} pedidos)`;
              } else {
                formattedValue = JSON.stringify(value);
              }
            } else if (typeof value === "number") {
              if (key.includes("receita") || key.includes("Receita")) {
                formattedValue = `R$ ${value.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;
              } else if (
                key.includes("crescimento") ||
                key.includes("taxa") ||
                key.includes("Taxa")
              ) {
                formattedValue = (
                  <div className="flex items-center gap-1">
                    {value >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={value >= 0 ? "text-green-600" : "text-red-600"}
                    >
                      {value.toFixed(2)}%
                    </span>
                  </div>
                );
              } else {
                formattedValue = value.toLocaleString("pt-BR");
              }
            } else {
              formattedValue = value?.toString() || "-";
            }

            return formattedValue ? (
              <div key={key} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <span className="text-sm font-medium">{formattedValue}</span>
              </div>
            ) : null;
          })}
        </CardContent>
      </Card>
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[98vw] max-w-[98vw] h-[95vh] max-h-[95vh] overflow-hidden flex flex-col p-6"
        style={{
          width: "98vw",
          height: "95vh",
          maxWidth: "98vw",
          maxHeight: "95vh",
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {data.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {data.period}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-1">
            {/* Gráfico */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Visualização</CardTitle>
              </CardHeader>
              <CardContent>{renderChart()}</CardContent>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Tabela de dados */}
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Dados Detalhados</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[50vh] overflow-y-auto">
                  {renderTable()}
                </CardContent>
              </Card>

              {/* Metadata */}
              <div className="space-y-4">{renderMetadata()}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChartDrilldown;
