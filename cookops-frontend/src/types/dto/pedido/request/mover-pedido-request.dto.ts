import { z } from "zod";

export const MoverPedidoRequestSchema = z.object({
  paraOrdem: z.number(),
});

export type MoverPedidoRequestDto = z.infer<typeof MoverPedidoRequestSchema>;
