"use client";

import { MenuTable } from "@/components/Menu/MenuTable";
import { NovoProdutoDialog } from "@/components/Menu/NovoProdutoDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export default function CardapioPage() {
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleProductCreated = () => {
    // Não recarregar a página, o WebSocket já atualizará automaticamente
    setIsNewProductDialogOpen(false);
  };

  return (
    <div className="container py-6 space-y-6 place-self-center">
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Cardápio</h1>
        </div>{" "}
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

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos por nome, descrição ou código de barras..."
            className="max-w-[500px] pl-10"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <TabsContent value="todos" className="mt-4">
          <MenuTable searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="ativos" className="mt-4">
          <MenuTable filter="ativos" searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="inativos" className="mt-4">
          <MenuTable filter="inativos" searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>{" "}
      <NovoProdutoDialog
        open={isNewProductDialogOpen}
        onOpenChange={setIsNewProductDialogOpen}
        onSuccess={handleProductCreated}
      />
    </div>
  );
}
