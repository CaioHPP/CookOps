"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Minus, Plus, Trash2 } from "lucide-react";

const orderSchema = z.object({
  customer: z.string().min(1, "Nome do cliente é obrigatório"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        observation: z.string().optional(),
      })
    )
    .min(1, "Adicione pelo menos um item"),
  paymentMethod: z.string(),
  deliveryAddress: z.string().optional(),
});

type OrderForm = z.infer<typeof orderSchema>;

interface NovoPedidoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: OrderForm) => void;
}

export function NovoPedidoDialog({
  open,
  onOpenChange,
  onSubmit,
}: NovoPedidoDialogProps) {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{ productId: "", quantity: 1, observation: "" }],
    },
  });

  const [products] = useState([
    { id: "1", name: "Hambúrguer Clássico", price: 25.9 },
    { id: "2", name: "Batata Frita", price: 12.9 },
    { id: "3", name: "Refrigerante", price: 7.9 },
  ]);

  const handleSubmit = (data: OrderForm) => {
    onSubmit?.(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Novo Pedido</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de Pagamento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a forma de pagamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="cartao">Cartão</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Itens do Pedido</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    form.setValue("items", [
                      ...form.getValues("items"),
                      { productId: "", quantity: 1, observation: "" },
                    ])
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Item
                </Button>
              </div>

              <div className="space-y-4">
                {form.getValues("items").map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-start border p-4 rounded-lg"
                  >
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name={`items.${index}.productId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Produto</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o produto" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id}
                                  >
                                    {product.name} - R${" "}
                                    {product.price.toFixed(2)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Qtd.</FormLabel>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  field.onChange(Math.max(1, field.value - 1))
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min={1}
                                  className="w-16 text-center"
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => field.onChange(field.value + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name={`items.${index}.observation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Observação</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: Sem cebola"
                                className="h-9 py-1.5"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 pt-8">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => {
                          const items = form.getValues("items");
                          if (items.length > 1) {
                            form.setValue(
                              "items",
                              items.filter((_, i) => i !== index)
                            );
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de Entrega</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Endereço completo (opcional)"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Criar Pedido</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
