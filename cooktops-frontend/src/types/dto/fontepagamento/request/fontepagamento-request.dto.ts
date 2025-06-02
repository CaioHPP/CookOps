import { z } from "zod";

export const FontePagamentoRequestAddSchema = z.object({
  nome: z.string(),
  tipoIntegracao: z.string().optional(),
});

export const FontePagamentoRequestUpdateSchema = z.object({
  nome: z.string().optional(),
  tipoIntegracao: z.string().optional(),
});

export type FontePagamentoRequestAddDto = z.infer<
  typeof FontePagamentoRequestAddSchema
>;
export type FontePagamentoRequestUpdateDto = z.infer<
  typeof FontePagamentoRequestUpdateSchema
>;
