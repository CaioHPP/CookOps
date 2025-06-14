"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import {
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  Save,
  X,
  Palette,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { PedidoStatusResponseDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface StatusListProps {
  boardId: string;
  statusList: PedidoStatusResponseDto[];
  onStatusUpdate: () => void;
}

interface StatusItem {
  id: number;
  titulo: string;
  ordem: number;
  cor?: string;
  icone?: string;
  isNew?: boolean;
  isEditing?: boolean;
}

const STATUS_COLORS = [
  {
    value: "red",
    label: "Vermelho",
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
  {
    value: "yellow",
    label: "Amarelo",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  {
    value: "blue",
    label: "Azul",
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  {
    value: "green",
    label: "Verde",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
  },
  {
    value: "purple",
    label: "Roxo",
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  {
    value: "gray",
    label: "Cinza",
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
  },
];

function SortableStatusItem({
  status,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isEditing,
  editedTitle,
  onTitleChange,
}: {
  status: StatusItem;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number) => void;
  onCancel: (id: number) => void;
  isEditing: boolean;
  editedTitle: string;
  onTitleChange: (value: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: status.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = (ordem: number) => {
    return (
      STATUS_COLORS[(ordem - 1) % STATUS_COLORS.length] || STATUS_COLORS[0]
    );
  };

  const colorConfig = getStatusColor(status.ordem);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-background border rounded-lg hover:shadow-sm transition-shadow"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="flex-1 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-mono w-8">
            #{status.ordem}
          </span>
          <Badge
            variant="outline"
            className={`${colorConfig.bg} ${colorConfig.text} ${colorConfig.border} px-3 py-1`}
          >
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="h-6 px-2 text-sm border-none bg-transparent p-0 m-0"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSave(status.id);
                  if (e.key === "Escape") onCancel(status.id);
                }}
              />
            ) : (
              <span className="font-medium">{status.titulo}</span>
            )}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onSave(status.id)}
              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCancel(status.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(status.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(status.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function StatusList({
  boardId,
  statusList,
  onStatusUpdate,
}: StatusListProps) {
  const [statusItems, setStatusItems] = useState<StatusItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusToDelete, setStatusToDelete] = useState<number | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    const formattedStatus = statusList.map((status) => ({
      id: status.id,
      titulo: status.titulo,
      ordem: status.ordem,
      cor: status.cor,
      icone: status.icone,
    }));
    setStatusItems(formattedStatus);
  }, [statusList]);

  const handleAddStatus = () => {
    const newOrder = Math.max(...statusItems.map((s) => s.ordem), 0) + 1;
    const newStatus: StatusItem = {
      id: Date.now(), // Temporary ID for new items
      titulo: `Novo Status ${newOrder}`,
      ordem: newOrder,
      isNew: true,
      isEditing: true,
    };
    setStatusItems([...statusItems, newStatus]);
    setEditingStatusId(newStatus.id);
    setEditedTitle(newStatus.titulo);
  };

  const handleEditStatus = (id: number) => {
    const status = statusItems.find((s) => s.id === id);
    if (status) {
      setEditingStatusId(id);
      setEditedTitle(status.titulo);
    }
  };

  const handleSaveStatus = async (id: number) => {
    if (!editedTitle.trim()) return;

    const status = statusItems.find((s) => s.id === id);
    if (!status) return;

    try {
      if (status.isNew) {
        // Create new status
        const newStatus = await PedidoStatusService.addPedidoStatus({
          titulo: editedTitle,
          ordem: status.ordem,
          boardId: boardId,
        });

        setStatusItems((prev) =>
          prev.map((s) =>
            s.id === id
              ? {
                  ...s,
                  id: newStatus.id,
                  titulo: editedTitle,
                  isNew: false,
                  isEditing: false,
                }
              : s,
          ),
        );
      } else {
        // Update existing status
        await PedidoStatusService.updatePedidoStatus(id, {
          titulo: editedTitle,
        });

        setStatusItems((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, titulo: editedTitle, isEditing: false } : s,
          ),
        );
      }

      toast.success("Status salvo com sucesso!");
      onStatusUpdate();
    } catch (error) {
      console.error("Erro ao salvar status:", error);
      toast.error("Erro ao salvar status");
    }

    setEditingStatusId(null);
    setEditedTitle("");
  };

  const handleCancelEdit = (id: number) => {
    const status = statusItems.find((s) => s.id === id);

    if (status?.isNew) {
      // Remove new unsaved status
      setStatusItems((prev) => prev.filter((s) => s.id !== id));
    } else {
      // Cancel edit of existing status
      setStatusItems((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isEditing: false } : s)),
      );
    }

    setEditingStatusId(null);
    setEditedTitle("");
  };

  const handleDeleteStatus = (id: number) => {
    setStatusToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteStatus = async () => {
    if (!statusToDelete) return;

    const status = statusItems.find((s) => s.id === statusToDelete);
    if (!status) return;

    try {
      if (!status.isNew) {
        await PedidoStatusService.deletePedidoStatus(statusToDelete);
      }

      setStatusItems((prev) => prev.filter((s) => s.id !== statusToDelete));
      toast.success("Status removido com sucesso!");
      onStatusUpdate();
    } catch (error) {
      console.error("Erro ao remover status:", error);
      toast.error("Erro ao remover status");
    } finally {
      setDeleteDialogOpen(false);
      setStatusToDelete(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = statusItems.findIndex((item) => item.id === active.id);
    const newIndex = statusItems.findIndex((item) => item.id === over.id);

    const newStatusItems = arrayMove(statusItems, oldIndex, newIndex);

    // Update order numbers
    const updatedItems = newStatusItems.map((status, index) => ({
      ...status,
      ordem: index + 1,
    }));

    setStatusItems(updatedItems);

    // TODO: Update order in backend
    // This would require an API endpoint to bulk update orders
    toast.success("Ordem dos status atualizada!");
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Colunas de Status</h3>
            <p className="text-sm text-muted-foreground">
              Configure as colunas do seu board kanban
            </p>
          </div>
          <Button onClick={handleAddStatus} className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Status
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={statusItems.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {statusItems.map((status) => (
                <SortableStatusItem
                  key={status.id}
                  status={status}
                  onEdit={handleEditStatus}
                  onDelete={handleDeleteStatus}
                  onSave={handleSaveStatus}
                  onCancel={handleCancelEdit}
                  isEditing={editingStatusId === status.id}
                  editedTitle={editedTitle}
                  onTitleChange={setEditedTitle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {statusItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
            <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Nenhum status configurado</p>
            <p className="text-sm">
              Clique em &ldquo;Adicionar Status&rdquo; para começar
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este status? Esta ação não pode ser
              desfeita. Todos os pedidos neste status serão movidos para o
              primeiro status disponível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteStatus}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
