"use client";

import { DashboardProdutos } from "@/components/Dashboard/DashboardProdutos";
import { BuscaProdutos } from "@/components/Menu/BuscaProdutos";
import { MenuTable } from "@/components/Menu/MenuTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProdutosContext } from "@/contexts/ProdutosContext";
import { BarChart3, Plus, RefreshCw } from "lucide-react";
import { useState } from "react";

function ProdutosPageCompleta() {
  const [activeTab, setActiveTab] = useState("ativos");
  const { carregarProdutos, loading } = useProdutosContext();
  const handleRefresh = async () => {
    try {
      await carregarProdutos(true); // Mostrar toast de sucesso
    } catch {
      // Erro já é tratado pelo hook
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie o cardápio do seu restaurante
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Busca */}
      <div className="max-w-md">
        <BuscaProdutos
          placeholder="Busque por nome, código ou descrição..."
          mostrarContadores={true}
        />
      </div>

      {/* Tabs principais */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ativos">Produtos Ativos</TabsTrigger>
          <TabsTrigger value="inativos">Produtos Inativos</TabsTrigger>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ativos" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Produtos Ativos</h2>
            <p className="text-sm text-muted-foreground">
              Produtos disponíveis para venda
            </p>
          </div>
          <MenuTable filter="ativos" />
        </TabsContent>

        <TabsContent value="inativos" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Produtos Inativos</h2>
            <p className="text-sm text-muted-foreground">
              Produtos indisponíveis temporariamente
            </p>
          </div>
          <MenuTable filter="inativos" />
        </TabsContent>

        <TabsContent value="todos" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Todos os Produtos</h2>
            <p className="text-sm text-muted-foreground">
              Visualização completa do cardápio
            </p>
          </div>
          <MenuTable />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Dashboard de Produtos</h2>
            <p className="text-sm text-muted-foreground">
              Estatísticas e análises do cardápio
            </p>
          </div>
          <DashboardProdutos />
        </TabsContent>
      </Tabs>

      {/* Status do WebSocket (para debug) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-2 text-xs">
          WebSocket: {loading ? "🔄 Carregando..." : "🟢 Conectado"}
        </div>
      )}
    </div>
  );
}

export default ProdutosPageCompleta;
