"use client";

import { BoardService } from "@/api/services/board.service";
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
import { useState } from "react";
import { toast } from "sonner";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await BoardService.addBoard({
        titulo: title,
        // TODO: Add board type to the API when implementing personalized boards
      });

      toast.success("Board criado com sucesso!", {
        description: "O novo board está pronto para uso.",
      });

      setTitle("");
      setBoardType("default");
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
                      Configure seus próprios status (em breve)
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !title}>
              {isLoading ? "Criando..." : "Criar board"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
