export interface ConfiguracaoEmpresaResponseDto {
  id: string;
  empresaId: string;
  horarioAbertura: string;
  horarioFechamento: string;
  diasFuncionamento: string;
  tempoPreparoMedio: number;
  notificacaoNovoPedido: boolean;
  notificacaoPedidoPronto: boolean;
  notificacaoSms: boolean;
  emailMarketing: boolean;
  criadoEm: string;
  atualizadoEm: string;
}
