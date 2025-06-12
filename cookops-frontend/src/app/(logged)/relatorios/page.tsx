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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarSign,
  ShoppingCart,
  Clock,
  Users,
} from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { DataTable } from "@/components/ui/data-table";

export default function RelatoriosPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise de desempenho e métricas operacionais
          </p>
        </div>
        <div className="flex gap-4">
          <DateRangePicker />
          <Select defaultValue="today">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="week">Últimos 7 dias</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Vendas Totais
                  </p>
                  <p className="text-2xl font-bold">R$ 12.345,67</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total de Pedidos
                  </p>
                  <p className="text-2xl font-bold">248</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm font-medium">8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Time */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tempo Médio
                  </p>
                  <p className="text-2xl font-bold">23 min</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-red-600">
                <ArrowDown className="h-4 w-4" />
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Customers */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Novos Clientes
                  </p>
                  <p className="text-2xl font-bold">32</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <ArrowUp className="h-4 w-4" />
                <span className="text-sm font-medium">18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Período</CardTitle>
            <CardDescription>
              Análise de vendas ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>Top 10 produtos por quantidade</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Detalhados</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="customers">Clientes</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="mt-4">
              <DataTable
                columns={[
                  { accessorKey: "number", header: "Pedido" },
                  { accessorKey: "customer", header: "Cliente" },
                  { accessorKey: "total", header: "Total" },
                  { accessorKey: "status", header: "Status" },
                  { accessorKey: "date", header: "Data" },
                ]}
                data={[]}
              />
            </TabsContent>
            <TabsContent value="products" className="mt-4">
              <DataTable
                columns={[
                  { accessorKey: "name", header: "Produto" },
                  { accessorKey: "quantity", header: "Quantidade" },
                  { accessorKey: "revenue", header: "Receita" },
                  { accessorKey: "averageTime", header: "Tempo Médio" },
                ]}
                data={[]}
              />
            </TabsContent>
            <TabsContent value="customers" className="mt-4">
              <DataTable
                columns={[
                  { accessorKey: "name", header: "Cliente" },
                  { accessorKey: "orders", header: "Pedidos" },
                  { accessorKey: "totalSpent", header: "Total Gasto" },
                  { accessorKey: "lastOrder", header: "Último Pedido" },
                ]}
                data={[]}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
