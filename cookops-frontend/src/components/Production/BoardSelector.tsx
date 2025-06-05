"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { ChevronDown, Loader2 } from "lucide-react";

interface BoardSelectorProps {
  boards: BoardResponseDto[];
  selectedBoard: string;
  onBoardChange: (boardId: string) => void;
  loading?: boolean;
}

export function BoardSelector({
  boards,
  selectedBoard,
  onBoardChange,
  loading = false,
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
            {!loading && selectedBoardData
              ? selectedBoardData.titulo
              : "Selecione um board"}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {boards.map((board) => (
            <DropdownMenuItem
              key={board.id}
              onClick={() => onBoardChange(board.id)}
            >
              {board.titulo}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>{" "}
    </div>
  );
}
