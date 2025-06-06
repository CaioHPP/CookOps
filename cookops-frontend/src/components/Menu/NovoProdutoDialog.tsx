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
import { useToast } from "@/components/ui/use-toast";
import { createProduto } from "@/api/produtos";

interface NovoProdutoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NovoProdutoDialog({
  open,
  onOpenChange,
  onSuccess,
}: NovoProdutoDialogProps) {
  const [ativo, setAtivo] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    codigo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const generateCode = (name: string = formData.nome): string => {
    // Gera um código baseado no nome do produto
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 6)
      .padEnd(6, "0");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const preco = parseFloat(formData.preco.replace(",", "."));

      if (isNaN(preco)) {
        throw new Error("Preço inválido");
      }

      await createProduto({
        nome: formData.nome,
        descricao: formData.descricao,
        preco: preco,
        codigo: formData.codigo || generateCode(formData.nome),
        imagem: imageUrl,
        ativo,
      });

      toast({
        title: "Produto criado",
        description: "Produto criado com sucesso!",
      });

      onOpenChange(false);
      onSuccess?.();

      // Reset form
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        codigo: "",
      });
      setImageUrl("");
      setAtivo(true);
    } catch {
      toast({
        title: "Erro ao criar produto",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do produto</Label>
              <Input
                id="nome"
                placeholder="Defina o nome do produto"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o item do cardápio"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                type="text"
                placeholder="0,00"
                value={formData.preco}
                onChange={handleChange}
                required
                pattern="^\d*[0-9](|,\d{0,2}|\.\d{0,2}|,\d{0,2}\.\d{0,2})$"
              />
            </div>

            <div>
              <Label htmlFor="codigo">Código do produto (opcional)</Label>
              <Input
                id="codigo"
                placeholder="Código será gerado automaticamente"
                value={formData.codigo}
                onChange={handleChange}
                maxLength={6}
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
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar produto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
