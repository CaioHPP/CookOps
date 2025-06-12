"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { BoardConfigDialog } from "@/components/Production/BoardConfigDialog";
import { useGetBoards } from "@/hooks/board";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { formatDate } from "@/lib/utils";

export function QuadrosConfig() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<BoardResponseDto | null>(
    null
  );
  const { data: boards = [], mutate } = useGetBoards();

  const columns: ColumnDef<BoardResponseDto>[] = [
    {
      accessorKey: "titulo",
      header: "Nome do Quadro",
    },
    {
      accessorKey: "createdAt",
      header: "Data de Criação",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          onClick={() => {
            setEditingBoard(row.original);
            setIsDialogOpen(true);
          }}
        >
          Editar
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quadros</CardTitle>
          <Button
            onClick={() => {
              setEditingBoard(null);
              setIsDialogOpen(true);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Quadro
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={boards} />
      </CardContent>

      <BoardConfigDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={
          editingBoard
            ? {
                titulo: editingBoard.titulo,
                status: editingBoard.listas.map((lista) => ({
                  id: lista.id.toString(),
                  titulo: lista.titulo,
                })),
              }
            : undefined
        }
        onSave={async (data) => {
          await mutate();
          setIsDialogOpen(false);
        }}
      />
    </Card>
  );
}
