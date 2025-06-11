"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { StatusList } from "./StatusList";

interface Status {
  id: string;
  titulo: string;
}

interface BoardConfigData {
  titulo: string;
  status: Status[];
}

interface BoardConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: BoardConfigData) => Promise<void>;
  initialData?: BoardConfigData;
}

export function BoardConfigDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: BoardConfigDialogProps) {
  const [formData, setFormData] = useState<BoardConfigData>(
    initialData || {
      titulo: "",
      status: [
        { id: "1", titulo: "Recebido" },
        { id: "2", titulo: "Em preparo" },
        { id: "3", titulo: "Pronto" },
        { id: "4", titulo: "Em entrega" },
        { id: "5", titulo: "Finalizado" },
      ],
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.titulo.trim()) {
      toast.error("O título do board é obrigatório");
      return;
    }

    if (formData.status.length < 2) {
      toast.error("O board precisa ter pelo menos 2 status");
      return;
    }

    if (formData.status.some((status) => !status.titulo.trim())) {
      toast.error("Todos os status precisam ter um título");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar board:", error);
      toast.error("Erro ao salvar board");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Board" : "Novo Board"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Nome do Board</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              placeholder="Ex: Board Principal"
            />
          </div>

          <div className="space-y-2">
            <Label>Status (Colunas)</Label>
            <StatusList
              value={formData.status}
              onChange={(status) => setFormData({ ...formData, status })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
