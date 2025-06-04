import { z } from "zod";

export const PedidoStatusRequestAddSchema = z.object({
  boardId: z.string(),
  titulo: z.string(),
  ordem: z.number(),
});

export const PedidoStatusRequestUpdateSchema = z.object({
  boardId: z.string().optional(),
  titulo: z.string().optional(),
  ordem: z.number().optional(),
});

export type PedidoStatusRequestAddDto = z.infer<
  typeof PedidoStatusRequestAddSchema
>;
export type PedidoStatusRequestUpdateDto = z.infer<
  typeof PedidoStatusRequestUpdateSchema
>;
