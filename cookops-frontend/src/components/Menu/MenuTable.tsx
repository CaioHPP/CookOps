import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Produto,
  deleteProduto,
  getProdutos,
  updateProduto,
} from "@/api/produtos";
import { useToast } from "@/components/ui/use-toast";

interface MenuTableProps {
  filter?: "ativos" | "inativos";
}

export function MenuTable({ filter }: MenuTableProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadProdutos = useCallback(async () => {
    try {
      const data = await getProdutos();
      console.log("Produtos carregados:", data); // Debug
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error); // Debug
      toast({
        title: "Erro ao carregar produtos",
        description: "Não foi possível carregar a lista de produtos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  async function handleToggleStatus(id: number, ativo: boolean) {
    try {
      await updateProduto(id, { ativo });
      setProdutos(
        produtos.map((produto) =>
          produto.id === id ? { ...produto, ativo } : produto
        )
      );
      toast({
        title: "Status atualizado",
        description: `Produto ${ativo ? "ativado" : "desativado"} com sucesso.`,
      });
    } catch {
      toast({
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do produto.",
        variant: "destructive",
      });
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
      toast({
        title: "Produto excluído",
        description: "Produto excluído com sucesso.",
      });
    } catch {
      toast({
        title: "Erro ao excluir produto",
        description: "Não foi possível excluir o produto.",
        variant: "destructive",
      });
    }
  }

  const filteredProdutos = produtos.filter((produto) => {
    if (filter === "ativos") return produto.ativo;
    if (filter === "inativos") return !produto.ativo;
    return true;
  });

  function formatPrice(price: number | null | undefined): string {
    if (typeof price !== "number") return "R$ 0,00";
    return `R$ ${price.toFixed(2)}`;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        Carregando produtos...
      </div>
    );
  }

  if (filteredProdutos.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-[2fr_100px_120px_2fr_70px] px-4 py-3 border-b bg-muted/50">
        <div className="text-sm font-medium">Item</div>
        <div className="text-sm font-medium text-center">Preço</div>
        <div className="text-sm font-medium text-center">Status</div>
        <div className="text-sm font-medium">Descrição</div>
        <div className="text-sm font-medium text-right">Ações</div>
      </div>
      <div className="divide-y">
        {filteredProdutos.map((produto) => (
          <div
            key={produto.id}
            className="grid grid-cols-[2fr_100px_120px_2fr_70px] px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted">
                <Image
                  src={produto.imagem || "/placeholder.png"}
                  alt={produto.nome}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{produto.nome}</span>
                <span className="text-sm text-muted-foreground">
                  #{produto.codigo}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center font-medium">
              R$ {formatPrice(produto.preco)}
            </div>
            <div className="flex items-center justify-center">
              <Badge
                variant={produto.ativo ? "default" : "secondary"}
                className={
                  produto.ativo
                    ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    : ""
                }
              >
                {produto.ativo ? "Disponível" : "Inativo"}
              </Badge>
            </div>
            <div className="flex items-center">
              <span className="line-clamp-1 text-sm text-muted-foreground">
                {produto.descricao}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      handleToggleStatus(produto.id, !produto.ativo)
                    }
                  >
                    <Badge
                      variant="outline"
                      className={
                        produto.ativo
                          ? "border-red-200 text-red-700"
                          : "border-green-200 text-green-700"
                      }
                    >
                      {produto.ativo ? "Desativar" : "Ativar"}
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir &ldquo;{produto.nome}
                          &rdquo;? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(produto.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
