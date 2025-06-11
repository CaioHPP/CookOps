import { z } from "zod";

// Schema para validação de itens do pedido (compatível com a interface existente)
export const PedidoItemValidationSchema = z.object({
  produto: z.object({
    id: z.string().min(1, "ID do produto é obrigatório"),
    nome: z.string().min(1, "Nome do produto é obrigatório"),
    precoBase: z.number().positive("Preço base deve ser positivo"),
    // Propriedades adicionais que podem existir no ProdutoResponseDto
    empresaId: z.string().optional(),
    ativo: z.boolean().optional(),
    descricao: z.string().optional(),
    codigoBarras: z.string().optional(),
    criadoEm: z.string().optional(),
    atualizadoEm: z.string().optional(),
  }),
  quantidade: z
    .number()
    .int("Quantidade deve ser um número inteiro")
    .positive("Quantidade deve ser maior que zero")
    .max(999, "Quantidade não pode ser maior que 999"),
  observacao: z.string().optional(),
});

// Schema para validação de endereço (compatível com a interface existente)
export const EnderecoValidationSchema = z.object({
  rua: z
    .string()
    .min(1, "Rua é obrigatória")
    .max(100, "Rua não pode ter mais de 100 caracteres")
    .trim(),
  numero: z
    .string()
    .min(1, "Número é obrigatório")
    .max(10, "Número não pode ter mais de 10 caracteres")
    .trim(),
  complemento: z
    .string()
    .max(50, "Complemento não pode ter mais de 50 caracteres")
    .trim()
    .optional(),
  bairro: z
    .string()
    .min(1, "Bairro é obrigatório")
    .max(50, "Bairro não pode ter mais de 50 caracteres")
    .trim(),
  cidade: z
    .string()
    .min(1, "Cidade é obrigatória")
    .max(50, "Cidade não pode ter mais de 50 caracteres")
    .trim(),
  uf: z
    .string()
    .min(1, "UF é obrigatório")
    .length(2, "UF deve ter exatamente 2 caracteres")
    .regex(/^[A-Z]{2}$/, "UF deve conter apenas letras maiúsculas")
    .trim(),
  cep: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, "CEP deve ter o formato 00000-000")
    .optional()
    .or(z.literal("")),
  referencia: z
    .string()
    .max(100, "Referência não pode ter mais de 100 caracteres")
    .trim()
    .optional(),
});

// Schema para validação do step de seleção de itens
export const SelecaoItensStepValidationSchema = z.object({
  fonteId: z
    .number({
      required_error: "Fonte do pedido é obrigatória",
      invalid_type_error: "Fonte do pedido deve ser um número",
    })
    .positive("Fonte do pedido é obrigatória"),
  pagamentoId: z
    .number({
      required_error: "Forma de pagamento é obrigatória",
      invalid_type_error: "Forma de pagamento deve ser um número",
    })
    .positive("Forma de pagamento é obrigatória"),
  isEntrega: z.boolean(),
  itens: z
    .array(PedidoItemValidationSchema)
    .min(1, "Pelo menos um item deve ser adicionado")
    .max(50, "Máximo de 50 itens por pedido"),
});

// Schema para validação do step de endereço (condicional)
export const EnderecoStepValidationSchema = z.object({
  endereco: EnderecoValidationSchema,
});

// Schema para validação do step de finalização
export const FinalizacaoStepValidationSchema = z.object({
  desconto: z
    .number()
    .min(0, "Desconto não pode ser negativo")
    .max(99999.99, "Desconto não pode ser maior que R$ 99.999,99"),
  taxaEntrega: z
    .number()
    .min(0, "Taxa de entrega não pode ser negativa")
    .max(999.99, "Taxa de entrega não pode ser maior que R$ 999,99"),
  observacao: z
    .string()
    .max(500, "Observação não pode ter mais de 500 caracteres")
    .trim(),
});

// Schema completo para validação do formulário
export const PedidoFormValidationSchema = z
  .object({
    fonteId: z
      .number({
        required_error: "Fonte do pedido é obrigatória",
        invalid_type_error: "Fonte do pedido deve ser um número",
      })
      .nullable()
      .refine((val) => val !== null && val > 0, {
        message: "Fonte do pedido é obrigatória",
      }),
    pagamentoId: z
      .number({
        required_error: "Forma de pagamento é obrigatória",
        invalid_type_error: "Forma de pagamento deve ser um número",
      })
      .nullable()
      .refine((val) => val !== null && val > 0, {
        message: "Forma de pagamento é obrigatória",
      }),
    isEntrega: z.boolean(),
    desconto: z
      .number()
      .min(0, "Desconto não pode ser negativo")
      .max(99999.99, "Desconto não pode ser maior que R$ 99.999,99"),
    taxaEntrega: z
      .number()
      .min(0, "Taxa de entrega não pode ser negativa")
      .max(999.99, "Taxa de entrega não pode ser maior que R$ 999,99"),
    observacao: z
      .string()
      .max(500, "Observação não pode ter mais de 500 caracteres"),
    itens: z
      .array(PedidoItemValidationSchema)
      .min(1, "Pelo menos um item deve ser adicionado")
      .max(50, "Máximo de 50 itens por pedido"),
    endereco: EnderecoValidationSchema.optional(),
  })
  .refine(
    (data) => {
      // Se é entrega, endereço é obrigatório
      if (data.isEntrega) {
        return !!data.endereco;
      }
      return true;
    },
    {
      message: "Endereço é obrigatório para pedidos de entrega",
      path: ["endereco"],
    }
  )
  .refine(
    (data) => {
      // Se não é entrega, taxa de entrega deve ser zero
      if (!data.isEntrega) {
        return data.taxaEntrega === 0;
      }
      return true;
    },
    {
      message: "Taxa de entrega deve ser zero para pedidos de balcão",
      path: ["taxaEntrega"],
    }
  );

// Funções auxiliares de validação por step
export function validateSelecaoItensStep(data: unknown) {
  return SelecaoItensStepValidationSchema.parse(data);
}

export function validateEnderecoStep(data: unknown) {
  return EnderecoStepValidationSchema.parse(data);
}

export function validateFinalizacaoStep(data: unknown) {
  return FinalizacaoStepValidationSchema.parse(data);
}

export function validatePedidoForm(data: unknown) {
  return PedidoFormValidationSchema.parse(data);
}

// Tipos derivados (mantendo compatibilidade)
export type PedidoItemValidation = z.infer<typeof PedidoItemValidationSchema>;
export type EnderecoValidation = z.infer<typeof EnderecoValidationSchema>;
export type PedidoFormValidation = z.infer<typeof PedidoFormValidationSchema>;
