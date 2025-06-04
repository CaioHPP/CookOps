import { z } from "zod";

export const PedidoItemRequestAddSchema = z.object({
  pedidoId: z.string(),
  produtoId: z.string(),
  quantidade: z.number(),
  precoUnitario: z.number(),
  observacao: z.string().optional(),
});

export const PedidoItemRequestUpdateSchema = z.object({
  pedidoId: z.string().optional(),
  produtoId: z.string().optional(),
  quantidade: z.number().optional(),
  precoUnitario: z.number().optional(),
  observacao: z.string().optional(),
});

export type PedidoItemRequestAddDto = z.infer<
  typeof PedidoItemRequestAddSchema
>;
export type PedidoItemRequestUpdateDto = z.infer<
  typeof PedidoItemRequestUpdateSchema
>;
