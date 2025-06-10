import { z } from "zod";

export const ProdutoFormSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres")
    .trim(),
  descricao: z
    .string()
    .max(500, "A descrição não pode ter mais de 500 caracteres"),
  codigoBarras: z
    .string()
    .max(50, "O código de barras não pode ter mais de 50 caracteres")
    .trim()
    .optional(),
  precoBase: z
    .number({
      required_error: "O preço é obrigatório",
      invalid_type_error: "O preço deve ser um número válido",
    })
    .positive("O preço deve ser maior que zero")
    .max(99999.99, "O preço não pode ser maior que R$ 99.999,99")
    .multipleOf(0.01, "O preço deve ter no máximo 2 casas decimais"),
  ativo: z.boolean().default(true),
});

export type ProdutoFormData = z.infer<typeof ProdutoFormSchema>;

// Schema para busca de produtos
export const ProdutoBuscaSchema = z.object({
  termo: z.string().trim().optional(),
});

export type ProdutoBuscaData = z.infer<typeof ProdutoBuscaSchema>;
