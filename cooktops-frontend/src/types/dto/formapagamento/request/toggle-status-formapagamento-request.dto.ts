import { z } from "zod";

export const ToggleStatusFormaPagamentoRequestSchema = z.object({
  ativo: z.boolean(),
});

export type ToggleStatusFormaPagamentoRequestDto = z.infer<
  typeof ToggleStatusFormaPagamentoRequestSchema
>;
