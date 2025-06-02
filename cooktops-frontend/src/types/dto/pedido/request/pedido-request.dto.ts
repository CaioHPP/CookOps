import { z } from "zod";
import { EnderecoRequestAddSchema } from "../../endereco/request/endereco-request.dto";
import {
  PedidoItemRequestAddSchema,
  PedidoItemRequestUpdateSchema,
} from "../../pedidoitem/request/pedidoitem-request.dto";

export const PedidoRequestAddSchema = z.object({
  boardId: z.string(),
  fonteId: z.number(),
  pagamentoId: z.number(),
  desconto: z.number().optional(),
  taxaEntrega: z.number().optional(),
  valorTotal: z.number(),
  observacao: z.string().optional(),
  endereco: z.object(EnderecoRequestAddSchema.shape).optional(),
  itens: z.array(PedidoItemRequestAddSchema),
});

export const PedidoRequestUpdateSchema = z.object({
  statusId: z.number().optional(),
  fonteId: z.number().optional(),
  pagamentoId: z.number().optional(),
  endereco: z.object(EnderecoRequestAddSchema.shape).optional(),
  desconto: z.number().optional(),
  taxaEntrega: z.number().optional(),
  valorTotal: z.number().optional(),
  observacao: z.string().optional(),
  itens: z.array(PedidoItemRequestUpdateSchema).optional(),
});

export type PedidoRequestAddDto = z.infer<typeof PedidoRequestAddSchema>;
export type PedidoRequestUpdateDto = z.infer<typeof PedidoRequestUpdateSchema>;
