import { z } from "zod";

export const EmpresaRequestAddSchema = z.object({
  nome: z.string(),
  cnpj: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  enderecoId: z.string().optional(),
  planoAtualId: z.number(),
});

export const EmpresaRequestUpdateSchema = z.object({
  nome: z.string().optional(),
  cnpj: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  enderecoId: z.string().optional(),
  planoAtualId: z.number().optional(),
});

export type EmpresaRequestAddDto = z.infer<typeof EmpresaRequestAddSchema>;
export type EmpresaRequestUpdateDto = z.infer<
  typeof EmpresaRequestUpdateSchema
>;
