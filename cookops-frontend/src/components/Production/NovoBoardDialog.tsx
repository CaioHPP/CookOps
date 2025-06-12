"use client";

import { BoardService } from "@/api/services/board.service";
import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  GripVertical,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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

interface NovoBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface CustomStatus {
  id: string;
  titulo: string;
  ordem: number;
  cor?: string;
}

const STATUS_COLORS = [
  { value: "red", label: "Vermelho", bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  { value: "yellow", label: "Amarelo", bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  { value: "blue", label: "Azul", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  { value: "green", label: "Verde", bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  { value: "purple", label: "Roxo", bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  { value: "gray", label: "Cinza", bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
];

const DEFAULT_STATUSES: CustomStatus[] = [
  { id: "1", titulo: "Recebido", ordem: 1 },
  { id: "2", titulo: "Em preparo", ordem: 2 },
  { id: "3", titulo: "Pronto", ordem: 3 },
  { id: "4", titulo: "Em entrega", ordem: 4 },
  { id: "5", titulo: "Finalizado", ordem: 5 },
];

function SortableStatusCard({ 
  status, 
  onEdit, 
  onDelete 
}: {
  status: CustomStatus;
  onEdit: (id: string, titulo: string) => void;
  onDelete: (id: string) => void;
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
    return STATUS_COLORS[(ordem - 1) % STATUS_COLORS.length] || STATUS_COLORS[0];
  };

  const colorConfig = getStatusColor(status.ordem);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      
      <div className="flex-1 flex items-center gap-3">
        <span className="text-sm text-muted-foreground w-8">#{status.ordem}</span>
        <Badge 
          variant="outline" 
          className={`${colorConfig.bg} ${colorConfig.text} ${colorConfig.border} px-3 py-1`}
        >
          {status.titulo}
        </Badge>
      </div>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(status.id, status.titulo)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(status.id)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
export function NovoBoardDialog({
  open,
  onOpenChange,
  onSuccess,
}: NovoBoardDialogProps) {
  const [step, setStep] = useState(1); // 1: Tipo, 2: Configuração
  const [title, setTitle] = useState("");
  const [boardType, setBoardType] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const [customStatuses, setCustomStatuses] = useState<CustomStatus[]>(DEFAULT_STATUSES);
  const [editingStatus, setEditingStatus] = useState<{id: string, title: string} | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = customStatuses.findIndex(item => item.id === active.id);
    const newIndex = customStatuses.findIndex(item => item.id === over.id);

    const newStatuses = arrayMove(customStatuses, oldIndex, newIndex);
    
    // Update order numbers
    const updatedStatuses = newStatuses.map((status, index) => ({
      ...status,
      ordem: index + 1,
    }));

    setCustomStatuses(updatedStatuses);
  };

  const handleAddStatus = () => {
    const newId = Date.now().toString();
    const newOrder = Math.max(...customStatuses.map(s => s.ordem), 0) + 1;
    const newStatus: CustomStatus = {
      id: newId,
      titulo: `Novo Status ${newOrder}`,
      ordem: newOrder,
    };
    setCustomStatuses([...customStatuses, newStatus]);
    setEditingStatus({ id: newId, title: newStatus.titulo });
  };

  const handleEditStatus = (id: string, currentTitle: string) => {
    setEditingStatus({ id, title: currentTitle });
  };

  const handleSaveEdit = () => {
    if (!editingStatus) return;
    
    setCustomStatuses(prev => 
      prev.map(status => 
        status.id === editingStatus.id 
          ? { ...status, titulo: editingStatus.title }
          : status
      )
    );
    setEditingStatus(null);
  };

  const handleDeleteStatus = (id: string) => {
    if (customStatuses.length <= 2) {
      toast.error("Um board precisa ter pelo menos 2 status");
      return;
    }
    
    setCustomStatuses(prev => {
      const filtered = prev.filter(s => s.id !== id);
      // Reorder after deletion
      return filtered.map((status, index) => ({
        ...status,
        ordem: index + 1,
      }));
    });
  };

  const handleNext = () => {
    if (boardType === "custom") {
      setStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Nome do board é obrigatório");
      return;
    }

    setIsLoading(true);

    try {
      // Create the board first
      const newBoard = await BoardService.addBoard({
        titulo: title,
      });

      // If custom board, create custom statuses
      if (boardType === "custom" && customStatuses.length > 0) {
        await Promise.all(
          customStatuses.map(status =>
            PedidoStatusService.addPedidoStatus({
              titulo: status.titulo,
              ordem: status.ordem,
              boardId: newBoard.id,
            })
          )
        );
      }

      toast.success("Board criado com sucesso!", {
        description: "O novo board está pronto para uso.",
      });

      // Reset form
      setTitle("");
      setBoardType("default");
      setCustomStatuses(DEFAULT_STATUSES);
      setStep(1);
      setEditingStatus(null);
      
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar board:", error);
      toast.error("Erro ao criar board", {
        description: "Não foi possível criar o board. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = title.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Novo Board" : `Configurar Status - ${title}`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Nome do Board</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Board Principal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Status (Colunas)</Label>
              <RadioGroup
                value={boardType}
                onValueChange={setBoardType}
                className="gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:border-primary">
                  <RadioGroupItem value="default" id="default" />
                  <Label
                    htmlFor="default"
                    className="cursor-pointer font-normal flex-1"
                  >
                    <div className="font-medium">Status Padrão</div>
                    <p className="text-sm text-muted-foreground">
                      Recebido, Em preparo, Pronto, Em entrega, Finalizado
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:border-primary">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label
                    htmlFor="custom"
                    className="cursor-pointer font-normal flex-1"
                  >
                    <div className="font-medium">Status Personalizado</div>
                    <p className="text-sm text-muted-foreground">
                      Configure seus próprios status arrastando e editando
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!canProceed || isLoading}
              >
                {boardType === "custom" ? (
                  <>
                    Próximo
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  isLoading ? "Criando..." : "Salvar"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {editingStatus && (
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <Label>Editando Status</Label>
                <div className="flex gap-2">
                  <Input
                    value={editingStatus.title}
                    onChange={(e) => setEditingStatus({ ...editingStatus, title: e.target.value })}
                    placeholder="Nome do status"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit();
                      if (e.key === 'Escape') setEditingStatus(null);
                    }}
                  />
                  <Button size="sm" onClick={handleSaveEdit}>
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingStatus(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Colunas de Status</Label>
                <Button
                  size="sm"
                  onClick={handleAddStatus}
                  className="gap-2"
                >
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
                  items={customStatuses.map(s => s.id)} 
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {customStatuses.map((status) => (
                      <SortableStatusCard
                        key={status.id}
                        status={status}
                        onEdit={handleEditStatus}
                        onDelete={handleDeleteStatus}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <p className="text-xs text-muted-foreground">
                💡 Dica: Arraste os cards para reordenar os status
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || customStatuses.length < 2}
                >
                  {isLoading ? "Criando..." : "Criar Board"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
