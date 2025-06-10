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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useProdutosContext } from "@/contexts/ProdutosContext";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import {
  CircleCheck,
  CircleX,
  Edit,
  MoreHorizontal,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { EditProdutoDialog } from "./EditProdutoDialog";

interface MenuTableProps {
  filter?: "ativos" | "inativos";
  searchTerm?: string;
}

export function MenuTable({ filter, searchTerm }: MenuTableProps) {
  const [editingProduct, setEditingProduct] =
    useState<ProdutoResponseDto | null>(null);

  // Usar apenas o contexto principal
  const {
    produtos: todosProdutos,
    loading: isLoading,
    formatarPreco,
    toggleStatusProduto,
    excluirProduto,
  } = useProdutosContext();

  // Aplicar filtros (status e busca) em uma única operação
  const produtos = useMemo(() => {
    let produtosFiltrados = todosProdutos;

    // Filtrar por status se especificado
    if (filter === "ativos") {
      produtosFiltrados = produtosFiltrados.filter(
        (produto: ProdutoResponseDto) => produto.ativo
      );
    } else if (filter === "inativos") {
      produtosFiltrados = produtosFiltrados.filter(
        (produto: ProdutoResponseDto) => !produto.ativo
      );
    } // Aplicar filtro de busca se fornecido
    if (searchTerm?.trim()) {
      const termLower = searchTerm.toLowerCase();
      produtosFiltrados = produtosFiltrados.filter(
        (produto: ProdutoResponseDto) =>
          produto.nome.toLowerCase().includes(termLower) ||
          produto.codigo?.toLowerCase().includes(termLower) ||
          produto.descricao?.toLowerCase().includes(termLower)
      );
    }

    return produtosFiltrados;
  }, [todosProdutos, filter, searchTerm]);
  const handleToggleStatus = useCallback(
    async (produto: ProdutoResponseDto) => {
      try {
        await toggleStatusProduto(produto.id, !produto.ativo);
      } catch (error) {
        console.error("Erro ao alterar status do produto:", error);
      }
    },
    [toggleStatusProduto]
  );

  const handleEdit = useCallback((produto: ProdutoResponseDto) => {
    setEditingProduct(produto);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await excluirProduto(id);
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    },
    [excluirProduto]
  );

  const handleEditSuccess = useCallback(() => {
    setEditingProduct(null);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          Carregando produtos...
        </div>
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
        <UtensilsCrossed className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">
          {searchTerm
            ? "Nenhum produto encontrado"
            : "Nenhum produto cadastrado"}
        </p>
        <p className="text-sm">
          {searchTerm
            ? "Tente alterar os termos da busca"
            : "Clique em 'Novo produto' para começar"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-md">
        <div className="grid grid-cols-[2fr_120px_100px_2fr_70px] px-4 py-3 border-b bg-muted/50">
          <div className="text-sm font-medium">Produto</div>
          <div className="text-sm font-medium text-center">Preço</div>
          <div className="text-sm font-medium text-center">Status</div>
          <div className="text-sm font-medium">Descrição</div>
          <div className="text-sm font-medium text-right">Ações</div>
        </div>
        <div className="divide-y">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="grid grid-cols-[2fr_120px_100px_2fr_70px] px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <UtensilsCrossed className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{produto.nome}</span>
                </div>
              </div>

              <div className="flex items-center justify-center font-medium">
                {formatarPreco(produto.precoBase)}
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={produto.ativo}
                    onCheckedChange={() => handleToggleStatus(produto)}
                    disabled={isLoading}
                  />
                  {produto.ativo ? (
                    <CircleCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <CircleX className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <span className="line-clamp-2 text-sm text-muted-foreground">
                  {produto.descricao || "Sem descrição"}
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
                    <DropdownMenuItem onClick={() => handleEdit(produto)}>
                      <Edit className="mr-2 h-4 w-4" />
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
                          <AlertDialogTitle>
                            Confirmar exclusão
                          </AlertDialogTitle>
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

      {editingProduct && (
        <EditProdutoDialog
          produto={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
