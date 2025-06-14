"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Check, MapPin, Package } from "lucide-react";
import { useEffect } from "react";
import { PedidoFormData } from "../NovoPedidoModal";

interface FinalizarPedidoStepProps {
  formData: PedidoFormData;
  updateFormData: (updates: Partial<PedidoFormData>) => void;
  total: number;
}

export function FinalizarPedidoStep({
  formData,
  updateFormData,
  total,
}: FinalizarPedidoStepProps) {
  const subtotal = formData.itens.reduce(
    (acc, item) => acc + item.produto.precoBase * item.quantidade,
    0,
  );

  // Zerar taxa de entrega quando não for pedido de entrega
  useEffect(() => {
    if (!formData.isEntrega && formData.taxaEntrega > 0) {
      updateFormData({ taxaEntrega: 0 });
    }
  }, [formData.isEntrega, formData.taxaEntrega, updateFormData]);

  return (
    <div className="space-y-6">
      {/* Resumo do Pedido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Resumo do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Itens */}
            <div>
              <h4 className="font-medium mb-3">
                Itens ({formData.itens.length})
              </h4>
              <div className="space-y-2">
                {formData.itens.map((item) => (
                  <div
                    key={item.produto.id}
                    className="flex justify-between text-sm"
                  >
                    <div className="flex-1">
                      <span className="font-medium">
                        {item.quantidade}x {item.produto.nome}
                      </span>{" "}
                      {item.observacao && (
                        <p className="text-muted-foreground italic">
                          &quot;{item.observacao}&quot;
                        </p>
                      )}
                    </div>
                    <span className="font-medium">
                      R${" "}
                      {(item.produto.precoBase * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Endereço (se for entrega) */}
            {formData.isEntrega && formData.endereco && (
              <>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Endereço de Entrega
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {formData.endereco.rua}, {formData.endereco.numero}
                      {formData.endereco.complemento &&
                        ` - ${formData.endereco.complemento}`}
                    </p>
                    <p>
                      {formData.endereco.bairro}, {formData.endereco.cidade} -{" "}
                      {formData.endereco.uf}
                    </p>
                    {formData.endereco.cep && (
                      <p>CEP: {formData.endereco.cep}</p>
                    )}
                    {formData.endereco.referencia && (
                      <p className="italic">
                        Ref.: {formData.endereco.referencia}
                      </p>
                    )}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Observações */}
            {formData.observacao && (
              <>
                <div>
                  <h4 className="font-medium mb-2">Observações</h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.observacao}
                  </p>
                </div>
                <Separator />
              </>
            )}

            {/* Totais */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              {formData.taxaEntrega > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Taxa de entrega:</span>
                  <span>
                    R$ {formData.taxaEntrega.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}
              {formData.desconto > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto:</span>
                  <span>
                    -R$ {formData.desconto.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ajustes Finais */}
      <Card>
        <CardHeader>
          <CardTitle>Ajustes Finais</CardTitle>
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          <div
            className={`grid gap-4 ${
              formData.isEntrega ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {/* Taxa de entrega - só aparece para pedidos de entrega */}
            {formData.isEntrega && (
              <div className="space-y-2">
                <Label htmlFor="taxaEntrega">Taxa de Entrega</Label>
                <CurrencyInput
                  value={formData.taxaEntrega}
                  onValueChange={(value) =>
                    updateFormData({ taxaEntrega: value || 0 })
                  }
                  placeholder="R$ 0,00"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="desconto">Desconto</Label>
              <CurrencyInput
                value={formData.desconto}
                onValueChange={(value) =>
                  updateFormData({ desconto: value || 0 })
                }
                placeholder="R$ 0,00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observacaoFinal">Observações Adicionais</Label>
            <Textarea
              id="observacaoFinal"
              value={formData.observacao}
              onChange={(e) => updateFormData({ observacao: e.target.value })}
              placeholder="Observações adicionais para o pedido..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Confirmação */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">
                Pedido pronto para criação
              </p>{" "}
              <p className="text-sm text-green-600">
                Revise as informações e clique em &quot;Criar Pedido&quot; para
                finalizar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
