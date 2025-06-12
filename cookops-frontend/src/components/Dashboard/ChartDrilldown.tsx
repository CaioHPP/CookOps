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
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />{" "}
              <Tooltip
                formatter={(value: number | string, name: string) => [
                  name === "receita" ? `R$ ${value.toLocaleString()}` : value,
                  name === "receita"
                    ? "Receita"
                    : name === "pedidos"
                    ? "Pedidos"
                    : "Ticket Médio",
                ]}
              />
              <Bar dataKey="receita" fill="#8884d8" name="Receita" />
              <Bar dataKey="pedidos" fill="#82ca9d" name="Pedidos" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "performance":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.data} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="metrica" type="category" width={150} />
              <Tooltip
                formatter={(value: number | string) => [value, "Valor"]}
              />{" "}
              <Bar dataKey="valor" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "produtos":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.data.slice(0, 5)}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="vendas"
                label={({ nome, participacao }) => `${nome}: ${participacao}%`}
              >
                {data.data.slice(0, 5).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | string) => [value, "Vendas"]}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "horarios":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />{" "}
              <Tooltip
                formatter={(value: number | string, name: string) => [
                  name === "receita" ? `R$ ${value.toLocaleString()}` : value,
                  name === "receita" ? "Receita" : "Pedidos",
                ]}
              />
              <Line
                type="monotone"
                dataKey="pedidos"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="receita"
                stroke="#82ca9d"
                strokeWidth={2}
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

    const formattedValue =
      typeof value === "number" && column.includes("receita")
        ? `R$ ${value.toLocaleString()}`
        : typeof value === "number" && column.includes("taxa")
        ? `${value}%`
        : value?.toString() || "-";

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

    const columns = Object.keys(data.data[0]);

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
              {" "}
              {columns.map((column) => (
                <TableCell key={column}>
                  {renderTableCell(row, column)}
                </TableCell>
              ))}
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
          {Object.entries(data.metadata).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              <span className="text-sm font-medium">
                {typeof value === "object" && value !== null ? (
                  JSON.stringify(value)
                ) : typeof value === "number" && key.includes("receita") ? (
                  `R$ ${value.toLocaleString()}`
                ) : typeof value === "number" && key.includes("crescimento") ? (
                  <div className="flex items-center gap-1">
                    {value >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={value >= 0 ? "text-green-600" : "text-red-600"}
                    >
                      {value.toFixed(1)}%
                    </span>
                  </div>
                ) : (
                  value?.toString() || "-"
                )}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
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

        <div className="space-y-6">
          {/* Gráfico */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Visualização</CardTitle>
            </CardHeader>
            <CardContent>{renderChart()}</CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tabela de dados */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Dados Detalhados</CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {renderTable()}
              </CardContent>
            </Card>

            {/* Metadata */}
            <div className="space-y-4">{renderMetadata()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChartDrilldown;
