export class ConfiguracaoEmpresaResponseDto {
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
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(partial: Partial<ConfiguracaoEmpresaResponseDto>) {
    Object.assign(this, partial);
  }
}
