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
  Star,
  Kanban,
  CheckCircle,
  XCircle,
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

export default function QuadrosConfig() {
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewBoardDialogOpen, setIsNewBoardDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardResponseDto | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<BoardResponseDto | null>(
    null,
  );

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
      // Reload boards to get the updated state (inactivated or deleted)
      await loadBoards();
      toast.success("Operação realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao remover board:", error);
      toast.error("Erro ao processar operação");
    } finally {
      setDeleteDialogOpen(false);
      setBoardToDelete(null);
    }
  };

  const handleToggleActive = async (board: BoardResponseDto) => {
    try {
      await BoardService.toggleActiveBoard(board.id);
      // Reload boards to get the updated state
      await loadBoards();
      const isCurrentlyInactive = board.titulo.startsWith("[INATIVO]");
      toast.success(
        `Board ${isCurrentlyInactive ? "ativado" : "inativado"} com sucesso!`,
      );
    } catch (error) {
      console.error("Erro ao alterar status do board:", error);
      toast.error("Erro ao alterar status do board");
    }
  };

  const isInactive = (board: BoardResponseDto): boolean => {
    return board.titulo.startsWith("[INATIVO]");
  };

  const getBoardDisplayName = (board: BoardResponseDto): string => {
    return board.titulo.replace("[INATIVO] ", "");
  };

  const handleSetDefault = async (board: BoardResponseDto) => {
    try {
      await BoardService.setDefaultBoard(board.id);
      toast.success(`${board.titulo} definido como board padrão!`);
      // Refresh boards to update any default indicators
      await loadBoards();
    } catch (error) {
      console.error("Erro ao definir board padrão:", error);
      toast.error("Erro ao definir board padrão");
    }
  };

  const filteredBoards = boards.filter((board) =>
    board.titulo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Boards de Produção</h2>
          <p className="text-sm text-muted-foreground">
            Configure e gerencie os boards kanban para organização da produção
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
            <CardTitle className="text-sm font-medium">
              Total de Boards
            </CardTitle>
            <Kanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boards.length}</div>
            <p className="text-xs text-muted-foreground">boards configurados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Board Padrão</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              board principal definido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Ativos</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              colunas configuradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
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
          <CardTitle className="flex items-center gap-2">
            <Kanban className="h-5 w-5" />
            Seus Boards
          </CardTitle>
        </CardHeader>
        <CardContent>
          {boards.length === 0 && !loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Kanban className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhum board configurado</p>
              <p className="text-sm">
                Crie seu primeiro board para começar a organizar a produção
              </p>
              <Button
                onClick={() => setIsNewBoardDialogOpen(true)}
                className="mt-4 gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Criar Primeiro Board
              </Button>
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
                        <Kanban className="h-4 w-4 text-muted-foreground" />
                        <span
                          className={`font-medium ${isInactive(board) ? "text-muted-foreground" : ""}`}
                        >
                          {getBoardDisplayName(board)}
                        </span>
                        {isInactive(board) && (
                          <Badge variant="secondary" className="text-xs">
                            INATIVO
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(board.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          isInactive(board)
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {isInactive(board) ? "Inativo" : "Ativo"}
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
                          {!isInactive(board) && (
                            <>
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
                            </>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleToggleActive(board)}
                            className="gap-2"
                          >
                            {isInactive(board) ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Ativar
                              </>
                            ) : (
                              <>
                                <XCircle className="h-4 w-4" />
                                Inativar
                              </>
                            )}
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
              Tem certeza que deseja excluir o board &ldquo;
              {boardToDelete?.titulo}&rdquo;? Esta ação não pode ser desfeita e
              todos os status e pedidos associados serão perdidos.
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
