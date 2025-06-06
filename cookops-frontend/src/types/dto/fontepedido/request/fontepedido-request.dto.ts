import { z } from "zod";

export const FontePedidoRequestAddSchema = z.object({
  nome: z.string(),
  tipoIntegracao: z.string().optional(),
  confirmaAutomatico: z.boolean().optional(),
  exigeConfirmacao: z.boolean().optional(),
  tempoLimiteConfirma: z.number().int().positive().optional(),
});

export const FontePedidoRequestUpdateSchema = z.object({
  nome: z.string().optional(),
  tipoIntegracao: z.string().optional(),
  confirmaAutomatico: z.boolean().optional(),
  exigeConfirmacao: z.boolean().optional(),
  tempoLimiteConfirma: z.number().int().positive().optional(),
});

export type FontePedidoRequestAddDto = z.infer<
  typeof FontePedidoRequestAddSchema
>;
export type FontePedidoRequestUpdateDto = z.infer<
  typeof FontePedidoRequestUpdateSchema
>;
