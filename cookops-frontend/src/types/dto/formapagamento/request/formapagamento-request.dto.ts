import { z } from "zod";

export const FormaPagamentoRequestAddSchema = z.object({
  nome: z.string(),
  empresaId: z.string(),
  ativo: z.boolean().optional(),
});

export const FormaPagamentoRequestUpdateSchema = z.object({
  nome: z.string().optional(),
  empresaId: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const ToggleStatusFormaPagamentoRequestSchema = z.object({
  ativo: z.boolean(),
});

export type FormaPagamentoRequestAddDto = z.infer<
  typeof FormaPagamentoRequestAddSchema
>;
export type FormaPagamentoRequestUpdateDto = z.infer<
  typeof FormaPagamentoRequestUpdateSchema
>;
export type ToggleStatusFormaPagamentoRequestDto = z.infer<
  typeof ToggleStatusFormaPagamentoRequestSchema
>;
