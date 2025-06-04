import { z } from "zod";

export const FontePedidoRequestAddSchema = z.object({
  nome: z.string(),
  tipoIntegracao: z.string().optional(),
});

export const FontePedidoRequestUpdateSchema = z.object({
  nome: z.string().optional(),
  tipoIntegracao: z.string().optional(),
});

export type FontePedidoRequestAddDto = z.infer<
  typeof FontePedidoRequestAddSchema
>;
export type FontePedidoRequestUpdateDto = z.infer<
  typeof FontePedidoRequestUpdateSchema
>;
