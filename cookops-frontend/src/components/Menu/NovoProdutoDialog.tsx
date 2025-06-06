import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { useState } from "react";

interface NovoProdutoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NovoProdutoDialog({
  open,
  onOpenChange,
}: NovoProdutoDialogProps) {
  const [ativo, setAtivo] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do produto</Label>
              <Input id="nome" placeholder="Defina o nome do produto" />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o item do cardápio em X caracteres"
              />
            </div>

            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                type="number"
                placeholder="R$ 0,00"
                step="0.01"
                min="0"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ativo no cardápio</Label>
                <p className="text-sm text-muted-foreground">
                  Produto será exibido no cardápio digital
                </p>
              </div>
              <Switch checked={ativo} onCheckedChange={setAtivo} />
            </div>

            <div>
              <Label>Imagem do produto</Label>
              <ImageUpload value={imageUrl} onChange={setImageUrl} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Criar produto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
