import { z } from "zod";

export const EnderecoRequestAddSchema = z.object({
  rua: z.string(),
  numero: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  referencia: z.string().optional(),
});

export const EnderecoRequestUpdateSchema = z.object({
  rua: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  referencia: z.string().optional(),
});

export type EnderecoRequestAddDto = z.infer<typeof EnderecoRequestAddSchema>;
export type EnderecoRequestUpdateDto = z.infer<
  typeof EnderecoRequestUpdateSchema
>;
