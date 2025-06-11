"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { BoardService } from "@/api/services/board.service";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface NovoBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NovoBoardDialog({
  open,
  onOpenChange,
  onSuccess,
}: NovoBoardDialogProps) {
  const [title, setTitle] = useState("");
  const [boardType, setBoardType] = useState("default");
  const [customStatuses, setCustomStatuses] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate custom statuses if board type is custom
    if (boardType === "custom") {
      const filledStatuses = customStatuses.filter(
        (status) => status.trim() !== ""
      );
      if (filledStatuses.length < 2) {
        toast.error("Erro ao criar board", {
          description: "Você precisa definir pelo menos 2 status para o board.",
        });
        setIsLoading(false);
        return;
      }

      // Check for duplicate statuses
      const uniqueStatuses = new Set(
        filledStatuses.map((s) => s.toLowerCase())
      );
      if (uniqueStatuses.size !== filledStatuses.length) {
        toast.error("Erro ao criar board", {
          description: "Não podem existir status duplicados.",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      await BoardService.addBoard({
        titulo: title,
        tipo: boardType,
        status:
          boardType === "custom"
            ? customStatuses.filter((s) => s.trim() !== "")
            : undefined,
      });

      toast.success("Board criado com sucesso!", {
        description: "O novo board está pronto para uso.",
      });

      setTitle("");
      setBoardType("default");
      setCustomStatuses([""]);
      onSuccess?.();
      onOpenChange(false);
    } catch (_error) {
      toast.error("Erro ao criar board", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addStatus = () => {
    setCustomStatuses([...customStatuses, ""]);
  };

  const removeStatus = (index: number) => {
    if (customStatuses.length > 1) {
      setCustomStatuses(customStatuses.filter((_, i) => i !== index));
    }
  };

  const updateStatus = (index: number, value: string) => {
    const newStatuses = [...customStatuses];
    newStatuses[index] = value;
    setCustomStatuses(newStatuses);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo board</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Nome do board</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do board"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de board</Label>
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
                    <div className="font-medium">Board Padrão</div>
                    <p className="text-sm text-muted-foreground">
                      Status predefinidos: Pendente, Em preparo, Pronto,
                      Entregue
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:border-primary">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label
                    htmlFor="custom"
                    className="cursor-pointer font-normal flex-1"
                  >
                    <div className="font-medium">Board Personalizado</div>
                    <p className="text-sm text-muted-foreground">
                      Defina seus próprios status para o board
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {boardType === "custom" && (
              <div className="space-y-4 pt-4">
                <Label>Status do board</Label>
                <div className="space-y-2">
                  {customStatuses.map((status, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={status}
                        onChange={(e) => updateStatus(index, e.target.value)}
                        placeholder={`Status ${index + 1}`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStatus(index)}
                        disabled={customStatuses.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={addStatus}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar status
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar board"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
