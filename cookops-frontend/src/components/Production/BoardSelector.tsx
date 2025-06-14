"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { ChevronDown, Loader2, Settings, Plus, Kanban } from "lucide-react";

interface BoardSelectorProps {
  boards: BoardResponseDto[];
  selectedBoard: string;
  onBoardChange: (boardId: string) => void;
  loading?: boolean;
  onCreateBoard?: () => void;
  onConfigureBoard?: (board: BoardResponseDto) => void;
}

export function BoardSelector({
  boards,
  selectedBoard,
  onBoardChange,
  loading = false,
  onCreateBoard,
  onConfigureBoard,
}: BoardSelectorProps) {
  const selectedBoardData = boards.find((board) => board.id === selectedBoard);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Board:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-48 justify-between"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {!loading && selectedBoardData ? (
              <div className="flex items-center gap-2">
                <Kanban className="w-4 h-4" />
                <span>{selectedBoardData.titulo}</span>
              </div>
            ) : (
              "Selecione um board"
            )}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {boards.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">Nenhum board disponível</p>
            </div>
          ) : (
            boards.map((board) => (
              <DropdownMenuItem
                key={board.id}
                onClick={() => onBoardChange(board.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Kanban className="w-4 h-4" />
                  <span>{board.titulo}</span>
                </div>
                {selectedBoard === board.id && (
                  <Badge variant="secondary" className="text-xs">
                    Ativo
                  </Badge>
                )}
              </DropdownMenuItem>
            ))
          )}

          {(onCreateBoard || onConfigureBoard) && (
            <>
              <DropdownMenuSeparator />
              {onCreateBoard && (
                <DropdownMenuItem
                  onClick={onCreateBoard}
                  className="flex items-center gap-2 text-primary"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Board</span>
                </DropdownMenuItem>
              )}
              {onConfigureBoard && selectedBoardData && (
                <DropdownMenuItem
                  onClick={() => onConfigureBoard(selectedBoardData)}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Configurar</span>
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
