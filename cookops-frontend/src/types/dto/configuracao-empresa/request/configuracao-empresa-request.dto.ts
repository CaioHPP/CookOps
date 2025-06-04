export interface CreateConfiguracaoEmpresaDto {
  empresaId: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  diasFuncionamento?: string;
  tempoPreparoMedio?: number;
  notificacaoNovoPedido?: boolean;
  notificacaoPedidoPronto?: boolean;
  notificacaoSms?: boolean;
  emailMarketing?: boolean;
}

export type UpdateConfiguracaoEmpresaDto = Partial<
  Omit<CreateConfiguracaoEmpresaDto, "empresaId">
>;
