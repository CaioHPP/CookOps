import { ApiProperty } from '@nestjs/swagger';

export class EnderecoDto {
  @ApiProperty({ description: 'ID do endereço' })
  id: string;

  @ApiProperty({ description: 'Rua' })
  rua: string;

  @ApiProperty({ description: 'Número' })
  numero: string;

  @ApiProperty({ description: 'Complemento', required: false })
  complemento?: string;

  @ApiProperty({ description: 'Bairro' })
  bairro: string;

  @ApiProperty({ description: 'Cidade', required: false })
  cidade?: string;

  @ApiProperty({ description: 'UF', required: false })
  uf?: string;

  @ApiProperty({ description: 'CEP', required: false })
  cep?: string;

  @ApiProperty({ description: 'Referência', required: false })
  referencia?: string;
}

export class PlanoDto {
  @ApiProperty({ description: 'ID do plano' })
  id: number;

  @ApiProperty({ description: 'Nome do plano' })
  nome: string;

  @ApiProperty({ description: 'Limite de pedidos por mês' })
  limitePedidosMes: number;

  @ApiProperty({ description: 'Preço mensal' })
  precoMensal: number;

  @ApiProperty({ description: 'Status ativo' })
  ativo: boolean;
}

export class AssinaturaDto {
  @ApiProperty({ description: 'ID da assinatura' })
  id: string;

  @ApiProperty({ description: 'ID do cliente no Stripe', required: false })
  stripeCustomerId?: string;

  @ApiProperty({ description: 'ID da assinatura no Stripe', required: false })
  stripeSubscriptionId?: string;

  @ApiProperty({ description: 'Fim do período', required: false })
  periodoFim?: Date;

  @ApiProperty({ description: 'ID do plano' })
  planoId: number;
}

export class ConfiguracaoEmpresaDto {
  @ApiProperty({ description: 'ID da configuração' })
  id: string;

  @ApiProperty({ description: 'Horário de abertura' })
  horarioAbertura: string;

  @ApiProperty({ description: 'Horário de fechamento' })
  horarioFechamento: string;

  @ApiProperty({ description: 'Dias de funcionamento' })
  diasFuncionamento: string;

  @ApiProperty({ description: 'Tempo de preparo médio em minutos' })
  tempoPreparoMedio: number;

  @ApiProperty({ description: 'Notificação de novo pedido' })
  notificacaoNovoPedido: boolean;

  @ApiProperty({ description: 'Notificação de pedido pronto' })
  notificacaoPedidoPronto: boolean;

  @ApiProperty({ description: 'Notificação por SMS' })
  notificacaoSms: boolean;

  @ApiProperty({ description: 'E-mail marketing' })
  emailMarketing: boolean;

  @ApiProperty({ description: 'Data de criação' })
  criadoEm: Date;

  @ApiProperty({ description: 'Data de atualização' })
  atualizadoEm: Date;
}

export class EmpresaCompletaDto {
  @ApiProperty({ description: 'ID da empresa' })
  id: string;

  @ApiProperty({ description: 'Nome da empresa' })
  nome: string;

  @ApiProperty({ description: 'CNPJ da empresa', required: false })
  cnpj?: string;

  @ApiProperty({ description: 'E-mail da empresa', required: false })
  email?: string;

  @ApiProperty({ description: 'Telefone da empresa', required: false })
  telefone?: string;

  @ApiProperty({ description: 'ID do endereço', required: false })
  enderecoId?: string;

  @ApiProperty({ description: 'ID do plano atual' })
  planoAtualId: number;

  @ApiProperty({ description: 'Data de criação' })
  criadaEm: Date;

  @ApiProperty({ description: 'Dados do plano' })
  plano: PlanoDto;

  @ApiProperty({ description: 'Endereço da empresa', required: false })
  endereco?: EnderecoDto;

  @ApiProperty({ description: 'Assinatura da empresa', required: false })
  assinatura?: AssinaturaDto;

  @ApiProperty({ description: 'Configurações da empresa', required: false })
  configuracao?: ConfiguracaoEmpresaDto;
}
