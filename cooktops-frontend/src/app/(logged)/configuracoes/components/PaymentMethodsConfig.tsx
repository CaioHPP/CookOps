"use client";

import { FormaPagamentoService } from "@/api/services/formapagamento.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  FormaPagamentoRequestAddDto,
  FormaPagamentoRequestUpdateDto,
} from "@/types/dto/formapagamento/request/formapagamento-request.dto";
import { FormaPagamentoResponseDto } from "@/types/dto/formapagamento/response/formapagamento-response.dto";
import { Check, CreditCard, Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PaymentMethodsConfig() {  const [paymentMethods, setPaymentMethods] = useState<
    FormaPagamentoResponseDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMethod, setEditingMethod] =
    useState<FormaPagamentoResponseDto | null>(null);
  const [formData, setFormData] = useState<{ nome: string; ativo: boolean }>({
    nome: "",
    ativo: true,
  });

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      setIsLoading(true);
      const methods = await FormaPagamentoService.getFormasPagamentoByEmpresa();
      setPaymentMethods(methods);
    } catch (error) {
      console.error("Erro ao carregar métodos de pagamento:", error);
    } finally {
      setIsLoading(false);
    }
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingMethod) {
        const updateData: FormaPagamentoRequestUpdateDto = {
          nome: formData.nome,
          ativo: formData.ativo,
        };
        await FormaPagamentoService.updateFormaPagamento(
          editingMethod.id,
          updateData
        );
        toast.success("Método de pagamento atualizado com sucesso");
      } else {
        const createData: FormaPagamentoRequestAddDto = {
          nome: formData.nome,
          empresaId: "1", // You should get this from context/auth
          ativo: formData.ativo,
        };
        await FormaPagamentoService.addFormaPagamento(createData);
        toast.success("Método de pagamento criado com sucesso");
      }

      await loadPaymentMethods();
      resetForm();
    } catch (error) {
      toast.error("Erro ao salvar método de pagamento");
      console.error("Erro ao salvar método de pagamento:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await FormaPagamentoService.deleteFormaPagamento(id);
      toast.success("Método de pagamento excluído com sucesso");
      await loadPaymentMethods();
    } catch (error) {
      toast.error("Erro ao excluir método de pagamento");
      console.error("Erro ao excluir método de pagamento:", error);
    }
  };
  const handleToggleStatus = async (
    method: FormaPagamentoResponseDto,
    newStatus: boolean
  ) => {
    // Optimistic update - update UI first
    setPaymentMethods((prevMethods) =>
      prevMethods.map((m) =>
        m.id === method.id ? { ...m, ativo: newStatus } : m
      )
    );

    try {
      await FormaPagamentoService.toggleStatusFormaPagamento(method.id, {
        ativo: newStatus,
      });

      toast.success(
        `Método de pagamento ${
          newStatus ? "ativado" : "desativado"
        } com sucesso`
      );
    } catch (error) {
      // Revert the optimistic update on error
      setPaymentMethods((prevMethods) =>
        prevMethods.map((m) =>
          m.id === method.id ? { ...m, ativo: !newStatus } : m
        )
      );

      toast.error("Erro ao alterar status do método de pagamento");
      console.error("Erro ao alterar status do método de pagamento:", error);
    }
  };
  const openEditForm = (method: FormaPagamentoResponseDto) => {
    setEditingMethod(method);
    setFormData({
      nome: method.nome,
      ativo: method.ativo,
    });
    setIsDialogOpen(true);
  };
  const resetForm = () => {
    setEditingMethod(null);
    setFormData({
      nome: "",
      ativo: true,
    });
    setIsDialogOpen(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Reset form when modal is closed
      setEditingMethod(null);
      setFormData({
        nome: "",
        ativo: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Métodos de Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Métodos de Pagamento
          </CardTitle>
          <CardDescription>
            Gerencie os métodos de pagamento aceitos no estabelecimento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingMethod(null);
                  setFormData({ nome: "", ativo: true });
                  setIsDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Método
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingMethod
                      ? "Editar Método de Pagamento"
                      : "Novo Método de Pagamento"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingMethod
                      ? "Edite as informações do método de pagamento"
                      : "Adicione um novo método de pagamento ao sistema"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Método</Label>
                    <Input
                      id="name"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      placeholder="Ex: Cartão de Crédito, PIX, Dinheiro..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.ativo}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, ativo: checked })
                      }
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="active">Método ativo</Label>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {editingMethod ? "Salvando..." : "Criando..."}
                        </div>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          {editingMethod ? "Salvar Alterações" : "Criar Método"}
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {paymentMethods.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum método de pagamento cadastrado</p>
                <p className="text-sm">
                  Clique em &quot;Adicionar Método&quot; para começar
                </p>
              </div>
            ) : (
              paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{method.nome}</p>
                      <p className="text-sm text-muted-foreground">
                        {method.ativo ? "Ativo" : "Inativo"}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={method.ativo}
                      onCheckedChange={(checked) =>
                        handleToggleStatus(method, checked)
                      }
                    />{" "}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditForm(method)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Excluir método de pagamento
                          </AlertDialogTitle>{" "}
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o método de pagamento
                            &quot;{method.nome}&quot;? Esta ação não pode ser
                            desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(method.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}          </div>
        </CardContent>
      </Card>
    </div>
  );
}
