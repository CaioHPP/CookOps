import { z } from "zod";

// Schema para validação de itens do pedido
export const OrderItemSchema = z.object({
  id: z.string().min(1, "ID do item é obrigatório"),
  name: z.string().min(1, "Nome do item é obrigatório"),
  quantity: z.number().positive("Quantidade deve ser positiva"),
  price: z.number().nonnegative("Preço deve ser não negativo"),
  observation: z.string().nullish(),
});

// Schema para validação de pedidos
export const OrderSchema = z.object({
  id: z.string().min(1, "ID do pedido é obrigatório"),
  code: z.string().min(1, "Código do pedido é obrigatório"),
  itemCount: z
    .number()
    .nonnegative("Quantidade de itens deve ser não negativa"),
  totalValue: z.number().nonnegative("Valor total deve ser não negativo"),
  time: z.string().min(1, "Horário é obrigatório"),
  source: z.string().min(1, "Fonte do pedido é obrigatória"),
  customerName: z.string().nullish(),
  customerPhone: z.string().nullish(),
  items: z.array(OrderItemSchema).default([]),
  subtotal: z.number().nonnegative("Subtotal deve ser não negativo"),
  fees: z.number().nonnegative("Taxas devem ser não negativas"),
  discount: z.number().nonnegative("Desconto deve ser não negativo"),
  orderTime: z.string().min(1, "Hora do pedido é obrigatória"),
  status: z.string().nullish(),
  statusId: z.number().positive("ID do status é obrigatório").optional(),
  observation: z.string().nullish(),
  address: z.string().nullish(),
  completedAt: z.string().nullish(),
});

// Schema para validação de status de pedidos
export const OrderStatusSchema = z.object({
  id: z.number().positive("ID do status é obrigatório"),
  title: z.string().min(1, "Título do status é obrigatório"),
  order: z.number().nonnegative("Ordem deve ser não negativa"),
  orders: z.array(OrderSchema).default([]),
});

// Tipos derivados dos schemas
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

// Função para validar um pedido
export function validateOrder(order: unknown): Order {
  return OrderSchema.parse(order);
}

// Função para validar múltiplos pedidos
export function validateOrders(orders: unknown): Order[] {
  return z.array(OrderSchema).parse(orders);
}

// Função para validar status com pedidos
export function validateOrderStatus(status: unknown): OrderStatus {
  return OrderStatusSchema.parse(status);
}

// Função para validar múltiplos status
export function validateOrderStatuses(statuses: unknown): OrderStatus[] {
  return z.array(OrderStatusSchema).parse(statuses);
}

// Schema para validação de dados do formulário de atualização de pedido
export const UpdateOrderSchema = z.object({
  statusId: z.number().positive("Status é obrigatório").optional(),
  observation: z.string().optional(),
});

export type UpdateOrderRequest = z.infer<typeof UpdateOrderSchema>;
