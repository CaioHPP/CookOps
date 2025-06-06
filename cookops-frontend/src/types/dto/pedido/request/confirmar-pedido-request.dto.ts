import { z } from "zod";

export const ConfirmarPedidoRequestSchema = z.object({
  usuarioConfirmou: z.string().optional(),
});

export type ConfirmarPedidoRequestDto = z.infer<
  typeof ConfirmarPedidoRequestSchema
>;
