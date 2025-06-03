"use client";

import { AuthService } from "@/api/services/auth.service";
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
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DecodedTokenDto } from "@/types/dto/auth/response/auth-response.dto";
import { Bell, Building2, Clock, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

interface ConfiguracoesData {
  empresa: {
    nome: string;
    cnpj: string;
    telefone: string;
    email: string;
    endereco: string;
    cep: string;
    cidade: string;
    estado: string;
  };
  formasPagamento: {
    dinheiro: boolean;
    debito: boolean;
    credito: boolean;
    pix: boolean;
  };
  notificacoes: {
    novoPedido: boolean;
    pedidoPronto: boolean;
    emailMarketing: boolean;
    smsNotificacao: boolean;
  };
  funcionamento: {
    horarioAbertura: string;
    horarioFechamento: string;
    diasFuncionamento: string[];
    tempoPreparoMedio: number;
  };
}

export default function ConfiguracoesPage() {
  const [userData, setUserData] = useState<DecodedTokenDto | null>(null);
  const [config, setConfig] = useState<ConfiguracoesData>({
    empresa: {
      nome: "Marmitaria do Japa",
      cnpj: "12.345.678/0001-90",
      telefone: "(11) 98765-4321",
      email: "contato@marmitariadojapa.com",
      endereco: "Rua das Flores, 123",
      cep: "01234-567",
      cidade: "São Paulo",
      estado: "SP",
    },
    formasPagamento: {
      dinheiro: true,
      debito: true,
      credito: true,
      pix: true,
    },
    notificacoes: {
      novoPedido: true,
      pedidoPronto: true,
      emailMarketing: false,
      smsNotificacao: true,
    },
    funcionamento: {
      horarioAbertura: "08:00",
      horarioFechamento: "18:00",
      diasFuncionamento: ["segunda", "terça", "quarta", "quinta", "sexta"],
      tempoPreparoMedio: 30,
    },
  });

  useEffect(() => {
    const decodedToken = AuthService.getDecodedToken();
    setUserData(decodedToken);
  }, []);

  const handleSave = () => {
    // Implementar salvamento das configurações
    console.log("Salvando configurações:", config);
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      <Navbar
        userName={userData?.user || "Usuário"}
        userEmail="usuario@cookops.com"
        companyName={config.empresa.nome}
      />
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">
            Gerencie as configurações da sua empresa
          </p>
        </div>

        <div className="space-y-8">
          {/* Dados da Empresa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Dados da Empresa
              </CardTitle>
              <CardDescription>
                Informações básicas sobre sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Empresa</Label>
                  <Input
                    id="nome"
                    value={config.empresa.nome}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, nome: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={config.empresa.cnpj}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, cnpj: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={config.empresa.telefone}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, telefone: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={config.empresa.email}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, email: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={config.empresa.endereco}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, endereco: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={config.empresa.cep}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, cep: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={config.empresa.cidade}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, cidade: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input
                    id="estado"
                    value={config.empresa.estado}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        empresa: { ...prev.empresa, estado: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formas de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Formas de Pagamento
              </CardTitle>
              <CardDescription>
                Selecione as formas de pagamento aceitas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="dinheiro" className="text-sm font-medium">
                    Dinheiro
                  </Label>
                  <Switch
                    id="dinheiro"
                    checked={config.formasPagamento.dinheiro}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        formasPagamento: {
                          ...prev.formasPagamento,
                          dinheiro: checked,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="debito" className="text-sm font-medium">
                    Débito
                  </Label>
                  <Switch
                    id="debito"
                    checked={config.formasPagamento.debito}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        formasPagamento: {
                          ...prev.formasPagamento,
                          debito: checked,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="credito" className="text-sm font-medium">
                    Crédito
                  </Label>
                  <Switch
                    id="credito"
                    checked={config.formasPagamento.credito}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        formasPagamento: {
                          ...prev.formasPagamento,
                          credito: checked,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="pix" className="text-sm font-medium">
                    Pix
                  </Label>
                  <Switch
                    id="pix"
                    checked={config.formasPagamento.pix}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        formasPagamento: {
                          ...prev.formasPagamento,
                          pix: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horário de Funcionamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Funcionamento
              </CardTitle>
              <CardDescription>
                Configure os horários de atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="abertura">Horário de Abertura</Label>
                  <Input
                    id="abertura"
                    type="time"
                    value={config.funcionamento.horarioAbertura}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        funcionamento: {
                          ...prev.funcionamento,
                          horarioAbertura: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechamento">Horário de Fechamento</Label>
                  <Input
                    id="fechamento"
                    type="time"
                    value={config.funcionamento.horarioFechamento}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        funcionamento: {
                          ...prev.funcionamento,
                          horarioFechamento: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempoPreparo">
                    Tempo Médio de Preparo (min)
                  </Label>
                  <Input
                    id="tempoPreparo"
                    type="number"
                    value={config.funcionamento.tempoPreparoMedio}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        funcionamento: {
                          ...prev.funcionamento,
                          tempoPreparoMedio: parseInt(e.target.value),
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Novos Pedidos</Label>
                    <p className="text-xs text-gray-500">
                      Receba notificações quando um novo pedido for feito
                    </p>
                  </div>
                  <Switch
                    checked={config.notificacoes.novoPedido}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          novoPedido: checked,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Pedido Pronto</Label>
                    <p className="text-xs text-gray-500">
                      Notificações quando um pedido estiver pronto
                    </p>
                  </div>
                  <Switch
                    checked={config.notificacoes.pedidoPronto}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          pedidoPronto: checked,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">SMS</Label>
                    <p className="text-xs text-gray-500">
                      Receber notificações por SMS
                    </p>
                  </div>
                  <Switch
                    checked={config.notificacoes.smsNotificacao}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          smsNotificacao: checked,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">
                      E-mail Marketing
                    </Label>
                    <p className="text-xs text-gray-500">
                      Receber dicas e novidades sobre o sistema
                    </p>
                  </div>
                  <Switch
                    checked={config.notificacoes.emailMarketing}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        notificacoes: {
                          ...prev.notificacoes,
                          emailMarketing: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botão de Salvar */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
