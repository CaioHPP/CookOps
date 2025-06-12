"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  Settings, 
  Trash2, 
  Search,
  MoreHorizontal,
  Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BoardService } from "@/api/services/board.service";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { NovoBoardDialog } from "@/components/Production/NovoBoardDialog";
import { BoardConfigDialog } from "@/components/Production/BoardConfigDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function QuadrosPage() {
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewBoardDialogOpen, setIsNewBoardDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardResponseDto | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<BoardResponseDto | null>(null);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      setLoading(true);
      const data = await BoardService.getBoardsByEmpresa();
      setBoards(data);
    } catch (error) {
      console.error("Erro ao carregar boards:", error);
      toast.error("Erro ao carregar boards");
    } finally {
      setLoading(false);
    }
  };

  const handleConfigureBoard = (board: BoardResponseDto) => {
    setSelectedBoard(board);
    setIsConfigDialogOpen(true);
  };

  const handleDeleteBoard = (board: BoardResponseDto) => {
    setBoardToDelete(board);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteBoard = async () => {
    if (!boardToDelete) return;

    try {
      await BoardService.deleteBoard(boardToDelete.id);
      setBoards(prev => prev.filter(b => b.id !== boardToDelete.id));
      toast.success("Board removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover board:", error);
      toast.error("Erro ao remover board");
    } finally {
      setDeleteDialogOpen(false);
      setBoardToDelete(null);
    }
  };

  const handleSetDefault = async (board: BoardResponseDto) => {
    try {
      await BoardService.setDefaultBoard(board.id);
      // Reload boards to update the default status
      await loadBoards();
      toast.success(`${board.titulo} definido como board padrão!`);
    } catch (error) {
      console.error("Erro ao definir board padrão:", error);
      toast.error("Erro ao definir board padrão");
    }
  };

  const filteredBoards = boards.filter(board =>
    board.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar Boards</h1>
          <p className="text-muted-foreground">
            Configure e gerencie os boards de produção do seu restaurante
          </p>
        </div>
        <Button onClick={() => setIsNewBoardDialogOpen(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Board
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Boards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boards.length}</div>
            <p className="text-xs text-muted-foreground">
              boards configurados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board Ativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              board padrão definido
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Configurados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              total de status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar boards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Boards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Boards</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Carregando boards...</p>
            </div>
          ) : filteredBoards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground">Nenhum board encontrado</p>
              <p className="text-sm text-muted-foreground">Clique em &ldquo;Novo Board&rdquo; para começar</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Board</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBoards.map((board) => (
                  <TableRow key={board.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{board.titulo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(board.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Ativo
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleConfigureBoard(board)}
                            className="gap-2"
                          >
                            <Settings className="h-4 w-4" />
                            Configurar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSetDefault(board)}
                            className="gap-2"
                          >
                            <Star className="h-4 w-4" />
                            Definir como Padrão
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteBoard(board)}
                            className="gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NovoBoardDialog
        open={isNewBoardDialogOpen}
        onOpenChange={setIsNewBoardDialogOpen}
        onSuccess={loadBoards}
      />

      <BoardConfigDialog
        open={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
        board={selectedBoard}
        onSuccess={loadBoards}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o board &ldquo;{boardToDelete?.titulo}&rdquo;? 
              Esta ação não pode ser desfeita e todos os status e pedidos associados serão perdidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteBoard}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir Board
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
