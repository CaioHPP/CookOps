"use client";

import { FormaPagamentoService } from "@/api/services/formapagamento.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  FormaPagamentoRequestAddDto,
  FormaPagamentoRequestUpdateDto,
} from "@/types/dto/formapagamento/request/formapagamento-request.dto";
import { FormaPagamentoResponseDto } from "@/types/dto/formapagamento/response/formapagamento-response.dto";
import { Check, CreditCard, Edit, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentMethodsConfig() {
  const [paymentMethods, setPaymentMethods] = useState<
    FormaPagamentoResponseDto[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    try {
      if (editingMethod) {
        const updateData: FormaPagamentoRequestUpdateDto = {
          nome: formData.nome,
          ativo: formData.ativo, // Simulating ativo field
        };
        await FormaPagamentoService.updateFormaPagamento(
          editingMethod.id,
          updateData
        );
        alert("Método de pagamento atualizado com sucesso");
      } else {
        const createData: FormaPagamentoRequestAddDto = {
          nome: formData.nome,
          empresaId: "1", // You should get this from context/auth
          ativo: formData.ativo,
        };
        await FormaPagamentoService.addFormaPagamento(createData);
        alert("Método de pagamento criado com sucesso");
      }

      await loadPaymentMethods();
      resetForm();
    } catch (error) {
      alert("Erro ao salvar método de pagamento");
      console.error("Erro ao salvar método de pagamento:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este método de pagamento?")) {
      return;
    }

    try {
      await FormaPagamentoService.deleteFormaPagamento(id);
      alert("Método de pagamento excluído com sucesso");
      await loadPaymentMethods();
    } catch (error) {
      alert("Erro ao excluir método de pagamento");
      console.error("Erro ao excluir método de pagamento:", error);
    }
  };

  const openEditForm = (method: FormaPagamentoResponseDto) => {
    setEditingMethod(method);
    setFormData({
      nome: method.nome,
      ativo: true, // Since the API doesn't have ativo field, we'll simulate it
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingMethod(null);
    setFormData({
      nome: "",
      ativo: true,
    });
    setShowForm(false);
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
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Método
            </Button>
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
                      <p className="text-sm text-muted-foreground">Ativo</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={true} disabled />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditForm(method)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(method.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Card */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingMethod
                ? "Editar Método de Pagamento"
                : "Novo Método de Pagamento"}
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              {editingMethod
                ? "Edite as informações do método de pagamento"
                : "Adicione um novo método de pagamento ao sistema"}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.ativo}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, ativo: checked })
                  }
                />
                <Label htmlFor="active">Método ativo</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <Check className="h-4 w-4 mr-2" />
                  {editingMethod ? "Salvar Alterações" : "Criar Método"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
