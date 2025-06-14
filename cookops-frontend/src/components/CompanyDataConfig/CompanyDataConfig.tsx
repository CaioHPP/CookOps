"use client";

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

import { ConfiguracaoEmpresaService } from "@/api/services/configuracao-empresa.service";
import { EmpresaService } from "@/api/services/empresa.service";
import { EnderecoService } from "@/api/services/endereco.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateConfiguracaoEmpresaDto } from "@/types/dto/configuracao-empresa/request/configuracao-empresa-request.dto";
import { EmpresaRequestUpdateDto } from "@/types/dto/empresa/request/empresa-request.dto";
import { EnderecoRequestAddDto } from "@/types/dto/endereco/request/endereco-request.dto";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface CompanyFormData {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: {
    id?: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    referencia: string;
  };
  configuracao: {
    id?: string;
    horarioAbertura: string;
    horarioFechamento: string;
    diasFuncionamento: string;
    tempoPreparoMedio: number;
    notificacaoNovoPedido: boolean;
    notificacaoPedidoPronto: boolean;
    notificacaoSms: boolean;
    emailMarketing: boolean;
  };
}

interface AlertState {
  show: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

const dayNames = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

const dayValues = {
  monday: "segunda",
  tuesday: "terca",
  wednesday: "quarta",
  thursday: "quinta",
  friday: "sexta",
  saturday: "sabado",
  sunday: "domingo",
};

export default function CompanyDataConfig() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState<CompanyFormData>({
    id: "",
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: {
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      referencia: "",
    },
    configuracao: {
      horarioAbertura: "08:00",
      horarioFechamento: "18:00",
      diasFuncionamento: "segunda,terca,quarta,quinta,sexta",
      tempoPreparoMedio: 30,
      notificacaoNovoPedido: true,
      notificacaoPedidoPronto: true,
      notificacaoSms: false,
      emailMarketing: false,
    },
  }); // Função para carregar dados da empresa
  const loadCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      const empresaData = await EmpresaService.getEmpresaCompletaByAuth();

      setFormData({
        id: empresaData.id,
        nome: empresaData.nome,
        cnpj: empresaData.cnpj || "",
        email: empresaData.email || "",
        telefone: empresaData.telefone || "",
        endereco: {
          id: empresaData.endereco?.id,
          rua: empresaData.endereco?.rua || "",
          numero: empresaData.endereco?.numero || "",
          complemento: empresaData.endereco?.complemento || "",
          bairro: empresaData.endereco?.bairro || "",
          cidade: empresaData.endereco?.cidade || "",
          uf: empresaData.endereco?.uf || "",
          cep: empresaData.endereco?.cep || "",
          referencia: empresaData.endereco?.referencia || "",
        },
        configuracao: {
          id: empresaData.configuracao?.id,
          horarioAbertura: empresaData.configuracao?.horarioAbertura || "08:00",
          horarioFechamento:
            empresaData.configuracao?.horarioFechamento || "18:00",
          diasFuncionamento:
            empresaData.configuracao?.diasFuncionamento ||
            "segunda,terca,quarta,quinta,sexta",
          tempoPreparoMedio: empresaData.configuracao?.tempoPreparoMedio || 30,
          notificacaoNovoPedido:
            empresaData.configuracao?.notificacaoNovoPedido ?? true,
          notificacaoPedidoPronto:
            empresaData.configuracao?.notificacaoPedidoPronto ?? true,
          notificacaoSms: empresaData.configuracao?.notificacaoSms ?? false,
          emailMarketing: empresaData.configuracao?.emailMarketing ?? false,
        },
      });
    } catch (error) {
      console.error("Erro ao carregar dados da empresa:", error);
      showAlert("error", "Erro", "Erro ao carregar dados da empresa");
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para mostrar alerts
  const showAlert = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setAlertState({ show: true, type, title, message });
  };

  // Função para validar CNPJ
  const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, "");
    return cleanCNPJ.length === 14;
  };

  // Função para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar formulário
  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.nome.trim()) {
      errors.push("Nome da empresa é obrigatório");
    }

    if (formData.cnpj && !validateCNPJ(formData.cnpj)) {
      errors.push("CNPJ deve ter 14 dígitos");
    }

    if (formData.email && !validateEmail(formData.email)) {
      errors.push("Email deve ter um formato válido");
    }

    return { isValid: errors.length === 0, errors };
  };
  // Função para salvar dados
  const handleSave = async () => {
    const validation = validateForm();

    if (!validation.isValid) {
      showAlert("error", "Dados inválidos", validation.errors.join(", "));
      return;
    }

    try {
      setSaving(true);

      // 1. Salvar/atualizar endereço primeiro
      let enderecoId = formData.endereco.id;

      if (
        formData.endereco.rua ||
        formData.endereco.numero ||
        formData.endereco.bairro
      ) {
        const enderecoData = {
          rua: formData.endereco.rua,
          numero: formData.endereco.numero,
          complemento: formData.endereco.complemento || undefined,
          bairro: formData.endereco.bairro,
          cidade: formData.endereco.cidade || undefined,
          uf: formData.endereco.uf || undefined,
          cep: formData.endereco.cep || undefined,
          referencia: formData.endereco.referencia || undefined,
        };

        if (enderecoId) {
          // Atualizar endereço existente
          const updatedEndereco = await EnderecoService.updateEndereco(
            enderecoId,
            enderecoData,
          );
          enderecoId = updatedEndereco.id;
        } else {
          // Criar novo endereço
          const newEndereco = await EnderecoService.createEndereco(
            enderecoData as EnderecoRequestAddDto,
          );
          enderecoId = newEndereco.id;
        }
      }

      // 2. Atualizar dados da empresa
      const empresaUpdateData: EmpresaRequestUpdateDto = {
        nome: formData.nome,
        cnpj: formData.cnpj || undefined,
        email: formData.email || undefined,
        telefone: formData.telefone || undefined,
        enderecoId: enderecoId,
      };

      await EmpresaService.updateEmpresa(formData.id, empresaUpdateData);

      // 3. Salvar/atualizar configuração da empresa
      const configuracaoData = {
        horarioAbertura: formData.configuracao.horarioAbertura,
        horarioFechamento: formData.configuracao.horarioFechamento,
        diasFuncionamento: formData.configuracao.diasFuncionamento,
        tempoPreparoMedio: formData.configuracao.tempoPreparoMedio,
        notificacaoNovoPedido: formData.configuracao.notificacaoNovoPedido,
        notificacaoPedidoPronto: formData.configuracao.notificacaoPedidoPronto,
        notificacaoSms: formData.configuracao.notificacaoSms,
        emailMarketing: formData.configuracao.emailMarketing,
      };

      if (formData.configuracao.id) {
        // Atualizar configuração existente
        await ConfiguracaoEmpresaService.updateConfiguracao(
          formData.id,
          configuracaoData,
        );
      } else {
        // Criar nova configuração
        const createConfiguracaoData: CreateConfiguracaoEmpresaDto = {
          empresaId: formData.id,
          ...configuracaoData,
        };
        await ConfiguracaoEmpresaService.createConfiguracao(
          createConfiguracaoData,
        );
      }

      // 4. Recarregar dados para refletir as mudanças
      await loadCompanyData();

      showAlert(
        "success",
        "Sucesso",
        "Todas as configurações foram salvas com sucesso!",
      );
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      showAlert(
        "error",
        "Erro",
        "Erro ao salvar as configurações. Tente novamente.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Função para atualizar dados básicos
  const updateField = (field: keyof CompanyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Função para atualizar endereço
  const updateAddress = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [field]: value },
    }));
  };

  // Função para atualizar configuração
  const updateConfig = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      configuracao: { ...prev.configuracao, [field]: value },
    }));
  };

  // Função para obter dias de funcionamento como array
  const getWorkingDaysArray = (): string[] => {
    return formData.configuracao.diasFuncionamento.split(",");
  };

  // Função para atualizar dias de funcionamento
  const updateWorkingDays = (day: string, isWorking: boolean) => {
    const currentDays = getWorkingDaysArray();
    let newDays: string[];

    if (isWorking) {
      newDays = [...currentDays, day];
    } else {
      newDays = currentDays.filter((d) => d !== day);
    }

    updateConfig("diasFuncionamento", newDays.join(","));
  };
  // Carregar dados na inicialização
  useEffect(() => {
    loadCompanyData();
  }, [loadCompanyData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informações da Empresa
          </CardTitle>
          <CardDescription>Dados básicos do estabelecimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa *</Label>
              <Input
                id="company-name"
                value={formData.nome}
                onChange={(e) => updateField("nome", e.target.value)}
                placeholder="Nome do estabelecimento"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => updateField("cnpj", e.target.value)}
                placeholder="00.000.000/0000-00"
                maxLength={18}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="contato@empresa.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </Label>
              <Input
                id="phone"
                value={formData.telefone}
                onChange={(e) => updateField("telefone", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Endereço
          </CardTitle>
          <CardDescription>Localização do estabelecimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                value={formData.endereco.rua}
                onChange={(e) => updateAddress("rua", e.target.value)}
                placeholder="Nome da rua"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={formData.endereco.numero}
                onChange={(e) => updateAddress("numero", e.target.value)}
                placeholder="123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={formData.endereco.complemento}
                onChange={(e) => updateAddress("complemento", e.target.value)}
                placeholder="Apto, sala, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.endereco.bairro}
                onChange={(e) => updateAddress("bairro", e.target.value)}
                placeholder="Nome do bairro"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.endereco.cidade}
                onChange={(e) => updateAddress("cidade", e.target.value)}
                placeholder="Nome da cidade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.endereco.uf}
                onChange={(e) => updateAddress("uf", e.target.value)}
                placeholder="SP"
                maxLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipcode">CEP</Label>
              <Input
                id="zipcode"
                value={formData.endereco.cep}
                onChange={(e) => updateAddress("cep", e.target.value)}
                placeholder="00000-000"
                maxLength={9}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="reference">Referência</Label>
              <Input
                id="reference"
                value={formData.endereco.referencia}
                onChange={(e) => updateAddress("referencia", e.target.value)}
                placeholder="Próximo ao shopping, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours and Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Configurações Operacionais
          </CardTitle>
          <CardDescription>
            Horários de funcionamento e configurações gerais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Horários */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Horário de Funcionamento</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="opening-time">Horário de Abertura</Label>
                <Input
                  id="opening-time"
                  type="time"
                  value={formData.configuracao.horarioAbertura}
                  onChange={(e) =>
                    updateConfig("horarioAbertura", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closing-time">Horário de Fechamento</Label>
                <Input
                  id="closing-time"
                  type="time"
                  value={formData.configuracao.horarioFechamento}
                  onChange={(e) =>
                    updateConfig("horarioFechamento", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Dias de funcionamento */}
            <div className="space-y-2">
              <Label>Dias de Funcionamento</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(dayNames).map(([key, label]) => {
                  const dayValue = dayValues[key as keyof typeof dayValues];
                  const isWorking = getWorkingDaysArray().includes(dayValue);

                  return (
                    <div key={key} className="flex items-center space-x-2">
                      <Switch
                        checked={isWorking}
                        onCheckedChange={(checked) =>
                          updateWorkingDays(dayValue, checked)
                        }
                      />
                      <Label className="text-sm">{label}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tempo de preparo */}
          <div className="space-y-2">
            <Label htmlFor="prep-time">Tempo Médio de Preparo (minutos)</Label>
            <Input
              id="prep-time"
              type="number"
              min="1"
              max="240"
              value={formData.configuracao.tempoPreparoMedio}
              onChange={(e) =>
                updateConfig("tempoPreparoMedio", parseInt(e.target.value) || 0)
              }
              placeholder="30"
            />
          </div>

          {/* Notificações */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notificações</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-order-notification">
                  Notificar novos pedidos
                </Label>
                <Switch
                  id="new-order-notification"
                  checked={formData.configuracao.notificacaoNovoPedido}
                  onCheckedChange={(checked) =>
                    updateConfig("notificacaoNovoPedido", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ready-order-notification">
                  Notificar pedidos prontos
                </Label>
                <Switch
                  id="ready-order-notification"
                  checked={formData.configuracao.notificacaoPedidoPronto}
                  onCheckedChange={(checked) =>
                    updateConfig("notificacaoPedidoPronto", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notification">Notificações por SMS</Label>
                <Switch
                  id="sms-notification"
                  checked={formData.configuracao.notificacaoSms}
                  onCheckedChange={(checked) =>
                    updateConfig("notificacaoSms", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-marketing">Email Marketing</Label>
                <Switch
                  id="email-marketing"
                  checked={formData.configuracao.emailMarketing}
                  onCheckedChange={(checked) =>
                    updateConfig("emailMarketing", checked)
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="min-w-[200px]"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        open={alertState.show}
        onOpenChange={(open) =>
          setAlertState((prev) => ({ ...prev, show: open }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {alertState.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              {alertState.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertState.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() =>
                setAlertState((prev) => ({ ...prev, show: false }))
              }
            >
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
