"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { NovoProdutoDialog } from "@/components/Menu/NovoProdutoDialog";
import { MenuTable } from "@/components/Menu/MenuTable";

export default function CardapioPage() {
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cardápio</h1>
        <Button onClick={() => setIsNewProductDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo produto
        </Button>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="ativos">Ativos</TabsTrigger>
          <TabsTrigger value="inativos">Inativos</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Input placeholder="O que está buscando?" className="max-w-[400px]" />
        </div>

        <TabsContent value="todos" className="mt-4">
          <MenuTable />
        </TabsContent>

        <TabsContent value="ativos" className="mt-4">
          <MenuTable filter="ativos" />
        </TabsContent>

        <TabsContent value="inativos" className="mt-4">
          <MenuTable filter="inativos" />
        </TabsContent>
      </Tabs>

      <NovoProdutoDialog
        open={isNewProductDialogOpen}
        onOpenChange={setIsNewProductDialogOpen}
      />
    </div>
  );
}
