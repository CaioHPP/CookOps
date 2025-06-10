import { ProdutoService } from "@/api/services/produto.service";

import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
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
import {
  ProdutoFormSchema,
  type ProdutoFormData,
} from "@/lib/validations/produto";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface EditProdutoDialogProps {
  produto: ProdutoResponseDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditProdutoDialog({
  produto,
  open,
  onOpenChange,
  onSuccess,
}: EditProdutoDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ProdutoFormSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      precoBase: 0,
      ativo: true,
    },
  });

  const ativo = watch("ativo");
  const precoBase = watch("precoBase");

  // Resetar form quando o produto mudar
  useEffect(() => {
    if (produto && open) {
      reset({
        nome: produto.nome,
        descricao: produto.descricao || "",
        precoBase: produto.precoBase,
        ativo: produto.ativo,
      });
    }
  }, [produto, open, reset]);

  const onSubmit: SubmitHandler<ProdutoFormData> = async (data) => {
    if (!produto) return;

    try {
      await ProdutoService.updateProduto(produto.id, {
        nome: data.nome,
        descricao: data.descricao.trim() || undefined,
        precoBase: data.precoBase,
        ativo: data.ativo,
      });

      toast.success("Produto atualizado com sucesso!");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao atualizar produto. Tente novamente.");
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    onOpenChange(newOpen);
  };

  if (!produto) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do produto</Label>
              <Input
                id="nome"
                placeholder="Nome do produto"
                {...register("nome")}
                className={errors.nome ? "border-red-500" : ""}
              />
              {errors.nome && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descrição do produto"
                {...register("descricao")}
                className={errors.descricao ? "border-red-500" : ""}
              />
              {errors.descricao && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.descricao.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="precoBase">Preço</Label>
              <CurrencyInput
                value={precoBase}
                onValueChange={(value) => setValue("precoBase", value || 0)}
                className={errors.precoBase ? "border-red-500" : ""}
                placeholder="R$ 0,00"
              />
              {errors.precoBase && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.precoBase.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ativo no cardápio</Label>
                <p className="text-sm text-muted-foreground">
                  Produto será exibido no cardápio digital
                </p>
              </div>
              <Switch
                checked={ativo}
                onCheckedChange={(checked) => setValue("ativo", checked)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
