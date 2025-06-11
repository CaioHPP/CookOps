"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, MapPin } from "lucide-react";
import { PedidoFormData } from "../NovoPedidoModal";

interface EnderecoStepProps {
  formData: PedidoFormData;
  updateFormData: (updates: Partial<PedidoFormData>) => void;
  validationErrors?: Record<string, string>;
}

export function EnderecoStep({
  formData,
  updateFormData,
  validationErrors = {},
}: EnderecoStepProps) {
  const updateEndereco = (field: string, value: string) => {
    updateFormData({
      endereco: {
        rua: formData.endereco?.rua || "",
        numero: formData.endereco?.numero || "",
        complemento: formData.endereco?.complemento || "",
        bairro: formData.endereco?.bairro || "",
        cidade: formData.endereco?.cidade || "",
        uf: formData.endereco?.uf || "",
        cep: formData.endereco?.cep || "",
        referencia: formData.endereco?.referencia || "",
        [field]: value,
      },
    });
  };

  const getFieldError = (fieldPath: string) => {
    return (
      validationErrors[fieldPath] || validationErrors[`endereco.${fieldPath}`]
    );
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
        <AlertCircle className="h-4 w-4" />
        {error}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Endereço de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {" "}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rua">Rua *</Label>
              <Input
                id="rua"
                value={formData.endereco?.rua || ""}
                onChange={(e) => updateEndereco("rua", e.target.value)}
                placeholder="Nome da rua"
                required
                className={getFieldError("rua") ? "border-red-500" : ""}
              />
              <ErrorMessage error={getFieldError("rua")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero">Número *</Label>
              <Input
                id="numero"
                value={formData.endereco?.numero || ""}
                onChange={(e) => updateEndereco("numero", e.target.value)}
                placeholder="Número"
                required
                className={getFieldError("numero") ? "border-red-500" : ""}
              />
              <ErrorMessage error={getFieldError("numero")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="complemento">Complemento</Label>
            <Input
              id="complemento"
              value={formData.endereco?.complemento || ""}
              onChange={(e) => updateEndereco("complemento", e.target.value)}
              placeholder="Apartamento, bloco, casa, etc."
            />
          </div>{" "}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro *</Label>
              <Input
                id="bairro"
                value={formData.endereco?.bairro || ""}
                onChange={(e) => updateEndereco("bairro", e.target.value)}
                placeholder="Nome do bairro"
                required
                className={getFieldError("bairro") ? "border-red-500" : ""}
              />
              <ErrorMessage error={getFieldError("bairro")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                value={formData.endereco?.cidade || ""}
                onChange={(e) => updateEndereco("cidade", e.target.value)}
                placeholder="Nome da cidade"
                required
                className={getFieldError("cidade") ? "border-red-500" : ""}
              />
              <ErrorMessage error={getFieldError("cidade")} />
            </div>
          </div>{" "}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="uf">UF *</Label>
              <Input
                id="uf"
                value={formData.endereco?.uf || ""}
                onChange={(e) =>
                  updateEndereco("uf", e.target.value.toUpperCase())
                }
                placeholder="SP"
                maxLength={2}
                required
                className={getFieldError("uf") ? "border-red-500" : ""}
              />
              <ErrorMessage error={getFieldError("uf")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.endereco?.cep || ""}
                onChange={(e) => updateEndereco("cep", e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className={getFieldError("cep") ? "border-red-500" : ""}
              />
              <ErrorMessage error={getFieldError("cep")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="referencia">Ponto de Referência</Label>
            <Input
              id="referencia"
              value={formData.endereco?.referencia || ""}
              onChange={(e) => updateEndereco("referencia", e.target.value)}
              placeholder="Próximo ao supermercado, em frente à escola, etc."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
