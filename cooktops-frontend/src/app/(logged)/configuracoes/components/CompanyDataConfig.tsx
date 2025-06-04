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
import { Textarea } from "@/components/ui/textarea";
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

interface CompanyData {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  workingHours: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
  description: string;
  isActive: boolean;
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

export default function CompanyDataConfig() {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    workingHours: {
      monday: { open: "08:00", close: "18:00", isOpen: true },
      tuesday: { open: "08:00", close: "18:00", isOpen: true },
      wednesday: { open: "08:00", close: "18:00", isOpen: true },
      thursday: { open: "08:00", close: "18:00", isOpen: true },
      friday: { open: "08:00", close: "18:00", isOpen: true },
      saturday: { open: "08:00", close: "16:00", isOpen: true },
      sunday: { open: "08:00", close: "16:00", isOpen: false },
    },
    description: "",
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Here you would integrate with your API
      // await CompanyService.update(companyData)

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Dados da empresa salvos com sucesso");
    } catch (error) {
      alert("Erro ao salvar dados da empresa");
      console.error("Erro ao salvar dados da empresa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCompanyData = (field: string, value: string | boolean) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const updateWorkingHours = (
    day: keyof CompanyData["workingHours"],
    field: string,
    value: string | boolean
  ) => {
    setCompanyData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day], [field]: value },
      },
    }));
  };

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
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                value={companyData.name}
                onChange={(e) => updateCompanyData("name", e.target.value)}
                placeholder="Nome do estabelecimento"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={companyData.cnpj}
                onChange={(e) => updateCompanyData("cnpj", e.target.value)}
                placeholder="00.000.000/0000-00"
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
                value={companyData.email}
                onChange={(e) => updateCompanyData("email", e.target.value)}
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
                value={companyData.phone}
                onChange={(e) => updateCompanyData("phone", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={companyData.description}
              onChange={(e) => updateCompanyData("description", e.target.value)}
              placeholder="Breve descrição do estabelecimento..."
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={companyData.isActive}
              onCheckedChange={(checked) =>
                updateCompanyData("isActive", checked)
              }
            />
            <Label>Estabelecimento ativo</Label>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
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
                value={companyData.address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                placeholder="Nome da rua"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={companyData.address.number}
                onChange={(e) => updateAddress("number", e.target.value)}
                placeholder="123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={companyData.address.complement}
                onChange={(e) => updateAddress("complement", e.target.value)}
                placeholder="Sala, apartamento..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={companyData.address.neighborhood}
                onChange={(e) => updateAddress("neighborhood", e.target.value)}
                placeholder="Nome do bairro"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={companyData.address.zipCode}
                onChange={(e) => updateAddress("zipCode", e.target.value)}
                placeholder="00000-000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={companyData.address.city}
                onChange={(e) => updateAddress("city", e.target.value)}
                placeholder="Nome da cidade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={companyData.address.state}
                onChange={(e) => updateAddress("state", e.target.value)}
                placeholder="SP"
                maxLength={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
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
          {Object.entries(companyData.workingHours).map(([day, hours]) => (
            <div
              key={day}
              className="flex items-center space-x-4 p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-2 min-w-[120px]">
                <Switch
                  checked={hours.isOpen}
                  onCheckedChange={(checked) =>
                    updateWorkingHours(
                      day as keyof CompanyData["workingHours"],
                      "isOpen",
                      checked
                    )
                  }
                />
                <Label className="text-sm font-medium">
                  {dayNames[day as keyof typeof dayNames]}
                </Label>
              </div>

              {hours.isOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) =>
                      updateWorkingHours(
                        day as keyof CompanyData["workingHours"],
                        "open",
                        e.target.value
                      )
                    }
                    className="w-32"
                  />
                  <span className="text-muted-foreground">até</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) =>
                      updateWorkingHours(
                        day as keyof CompanyData["workingHours"],
                        "close",
                        e.target.value
                      )
                    }
                    className="w-32"
                  />
                </div>
              ) : (
                <span className="text-muted-foreground text-sm">Fechado</span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} size="lg">
          {isLoading ? "Salvando..." : "Salvar Todas as Configurações"}
        </Button>
      </div>
    </div>
  );
}
