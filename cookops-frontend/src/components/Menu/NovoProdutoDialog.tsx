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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
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
      // Validações do nome
      const nome = formData.nome.trim();
      if (!nome) {
        throw new Error("O nome do produto é obrigatório");
      }
      if (nome.length < 3) {
        throw new Error("O nome do produto deve ter pelo menos 3 caracteres");
      }
      if (nome.length > 100) {
        throw new Error(
          "O nome do produto não pode ter mais de 100 caracteres"
        );
      }

      // Validação da descrição
      const descricao = formData.descricao.trim();
      if (descricao && descricao.length > 500) {
        throw new Error("A descrição não pode ter mais de 500 caracteres");
      }

      // Validação básica do preço
      const precoString = formData.preco.trim();
      if (!precoString) {
        throw new Error("O preço é obrigatório");
      }

      // Convert price string to number (further validation in createProduto)
      const precoBase = parseFloat(precoString.replace(",", "."));
      if (isNaN(precoBase)) {
        throw new Error("Preço inválido");
      }

      // Validação do código
      const codigo = formData.codigo.trim();
      if (codigo && (codigo.length < 3 || codigo.length > 6)) {
        throw new Error("O código do produto deve ter entre 3 e 6 caracteres");
      }

      // Construir o objeto do produto
      const produtoData = {
        nome,
        descricao: descricao || undefined,
        precoBase,
        codigo: codigo || generateCode(nome),
        imagem: imageUrl || undefined,
        ativo,
      };

      await createProduto(produtoData);

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
    } catch (error) {
      console.error("Erro ao criar produto:", error);

      // Se for um erro da API ou nossa validação
      if (error instanceof Error) {
        toast({
          title: "Erro ao criar produto",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Erro genérico
      toast({
        title: "Erro ao criar produto",
        description:
          "Ocorreu um erro inesperado. Verifique os dados e tente novamente.",
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
              />
            </div>

            <div>
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                type="text"
                placeholder="0,00"
                value={formData.preco}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d,.]*/g, "");
                  if (value === "" || /^\d*([,.]\d{0,2})?$/.test(value)) {
                    handleChange(e);
                  }
                }}
                required
                pattern="^\d+([,.]\d{0,2})?$"
                title="Digite um valor válido (ex: 10,90 ou 10.90)"
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
