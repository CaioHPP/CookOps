"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, PlusCircle, Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

interface Status {
  id: string;
  titulo: string;
}

interface StatusItemProps {
  status: Status;
  onDelete: () => void;
  onTitleChange: (title: string) => void;
}

export function StatusItem({ status, onDelete, onTitleChange }: StatusItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: status.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 bg-background border rounded-md"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-muted-foreground"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <Input
        value={status.titulo}
        onChange={(e) => onTitleChange(e.target.value)}
        className="flex-1"
        placeholder="Nome do status"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface StatusListProps {
  value: Status[];
  onChange: (statuses: Status[]) => void;
}

export function StatusList({ value, onChange }: StatusListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = value.findIndex((status) => status.id === active.id);
      const newIndex = value.findIndex((status) => status.id === over?.id);

      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  const addStatus = () => {
    const newStatus = {
      id: Math.random().toString(36).substr(2, 9),
      titulo: "",
    };
    onChange([...value, newStatus]);
  };

  const removeStatus = (id: string) => {
    onChange(value.filter((status) => status.id !== id));
  };

  const updateStatusTitle = (id: string, title: string) => {
    onChange(
      value.map((status) =>
        status.id === id ? { ...status, titulo: title } : status
      )
    );
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={value} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {value.map((status) => (
              <StatusItem
                key={status.id}
                status={status}
                onDelete={() => removeStatus(status.id)}
                onTitleChange={(title) => updateStatusTitle(status.id, title)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        variant="outline"
        onClick={addStatus}
        className="w-full"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Adicionar Status
      </Button>
    </div>
  );
}
