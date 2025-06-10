import { z } from "zod";

export const ProdutoRequestAddSchema = z.object({
  nome: z.string(),
  descricao: z.string().optional(),
  codigoBarras: z.string().optional(),
  precoBase: z.number(),
  ativo: z.boolean().optional(),
});

export const ProdutoRequestUpdateSchema = z.object({
  nome: z.string().optional(),
  descricao: z.string().optional(),
  codigoBarras: z.string().optional(),
  precoBase: z.number().optional(),
  ativo: z.boolean().optional(),
});

export type ProdutoRequestAddDto = z.infer<typeof ProdutoRequestAddSchema>;
export type ProdutoRequestUpdateDto = z.infer<
  typeof ProdutoRequestUpdateSchema
>;
