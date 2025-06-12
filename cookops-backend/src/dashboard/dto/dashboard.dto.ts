import { ApiProperty } from '@nestjs/swagger';

// DTOs para métricas de vendas
export class MetricasVendasDto {
  @ApiProperty({ description: 'Total de pedidos no período' })
  totalPedidos: number;

  @ApiProperty({ description: 'Receita total dos pedidos confirmados' })
  receitaTotal: number;

  @ApiProperty({ description: 'Valor médio por pedido' })
  ticketMedio: number;
  @ApiProperty({
    description: 'Taxa de conversão de pedidos (%)',
    example: 85.5,
  })
  taxaConversao: number;

  @ApiProperty({
    description: 'Crescimento vs período anterior (%)',
    example: 12.5,
  })
  crescimentoReceita?: number;

  @ApiProperty({
    description: 'Variação do ticket médio (%)',
    example: -2.1,
  })
  variacaoTicketMedio?: number;
}

// DTOs para métricas de performance
export class MetricasPerformanceDto {
  @ApiProperty({ description: 'Tempo médio de finalização em minutos' })
  tempoMedioFinalizacao: number;

  @ApiProperty({ description: 'Quantidade de pedidos em atraso' })
  pedidosEmAtraso: number;

  @ApiProperty({ description: 'Taxa de confirmação automática (%)' })
  taxaConfirmacaoAutomatica: number;
  @ApiProperty({
    description: 'Pedidos por hora no pico',
    example: 15,
  })
  pedidosPorHoraPico: number;
}

// DTOs para métricas de produtos
export class ItemPopularDto {
  @ApiProperty()
  produtoId: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  quantidadeVendida: number;

  @ApiProperty()
  receita: number;
}

export class MetricasProdutosDto {
  @ApiProperty({ type: [ItemPopularDto] })
  itensMaisPopulares: ItemPopularDto[];

  @ApiProperty({ type: [ItemPopularDto] })
  receitaPorProduto: ItemPopularDto[];

  @ApiProperty({ type: [ItemPopularDto] })
  produtosBaixoDesempenho: ItemPopularDto[];
}

// DTOs para métricas de crescimento
export class CrescimentoSemanalDto {
  @ApiProperty()
  semana: string;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  crescimentoPercentual: number;
}

export class HorarioPicoDto {
  @ApiProperty()
  hora: number;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  percentualTotal: number;
}

export class FontePerformanceDto {
  @ApiProperty()
  fonteId: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  valorMedio: number;

  @ApiProperty()
  percentualTotal: number;
}

export class CrescimentoMensalDto {
  @ApiProperty()
  mes: string;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  crescimentoPercentual: number;

  @ApiProperty()
  receitaTotal: number;
}

export class CrescimentoDiarioDto {
  @ApiProperty()
  dia: string;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  crescimentoPercentual: number;

  @ApiProperty()
  receitaTotal: number;
}

export class MetricasCrescimentoDto {
  @ApiProperty({ type: [CrescimentoSemanalDto] })
  crescimentoSemanal: CrescimentoSemanalDto[];

  @ApiProperty({ type: [CrescimentoMensalDto], required: false })
  crescimentoMensal?: CrescimentoMensalDto[];

  @ApiProperty({ type: [CrescimentoDiarioDto], required: false })
  crescimentoDiario?: CrescimentoDiarioDto[];

  @ApiProperty({ type: [HorarioPicoDto] })
  horariosPico: HorarioPicoDto[];

  @ApiProperty({ type: [FontePerformanceDto] })
  performancePorFonte: FontePerformanceDto[];
}

// DTOs para métricas financeiras
export class MetricasFinanceirasDto {
  @ApiProperty({ description: 'Taxa de entrega média' })
  taxaEntregaMedia: number;

  @ApiProperty({ description: 'Desconto médio aplicado' })
  descontoMedio: number;

  @ApiProperty({ description: 'Receita líquida' })
  receitaLiquida: number;

  @ApiProperty({ description: 'Percentual de receita de entregas' })
  percentualReceitaEntrega: number;

  // ✅ NOVAS MÉTRICAS DE ENTREGA
  @ApiProperty({
    description:
      'Valor médio de taxa de entrega cobrada (apenas pedidos com taxa > 0)',
  })
  valorMedioTaxaEntrega: number;
  @ApiProperty({
    description: 'Número total de pedidos de entrega (com endereço)',
  })
  numeroPedidosEntrega: number;

  @ApiProperty({ description: 'Porcentagem de pedidos de entrega do total' })
  porcentagemPedidosEntrega: number;

  @ApiProperty({
    description:
      'Número de pedidos de entrega cobradas (com endereço e taxa > 0)',
  })
  numeroPedidosEntregaCobradas: number;

  @ApiProperty({
    description: 'Porcentagem de pedidos de entrega cobradas do total',
  })
  porcentagemPedidosEntregaCobradas: number;
  @ApiProperty({
    description: 'Valor total de taxas de entrega cobradas no período',
  })
  valorTotalTaxasEntrega: number;

  // ✅ NOVAS MÉTRICAS DE DESCONTO
  @ApiProperty({
    description:
      'Valor médio de desconto dado (apenas pedidos com desconto > 0)',
  })
  valorMedioDesconto: number;

  @ApiProperty({ description: 'Número de pedidos com descontos aplicados' })
  numeroPedidosComDesconto: number;

  @ApiProperty({ description: 'Porcentagem de pedidos com descontos do total' })
  porcentagemPedidosComDesconto: number;

  @ApiProperty({ description: 'Valor total de descontos dados no período' })
  valorTotalDescontos: number;
}

// DTOs para métricas operacionais
export class PedidosPorStatusDto {
  @ApiProperty()
  statusId: number;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  percentualTotal: number;
}

export class FormaPagamentoPopularDto {
  @ApiProperty()
  pagamentoId: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  totalPedidos: number;

  @ApiProperty()
  percentualTotal: number;
}

export class MetricasOperacionaisDto {
  @ApiProperty({ type: [PedidosPorStatusDto] })
  pedidosPorStatus: PedidosPorStatusDto[];

  @ApiProperty({ type: [FormaPagamentoPopularDto] })
  formasPagamentoPreferidas: FormaPagamentoPopularDto[];

  @ApiProperty({ description: 'Total de movimentações no board hoje' })
  movimentacoesBoard: number;
}

// DTO principal do dashboard
export class DashboardResponseDto {
  @ApiProperty({ type: MetricasVendasDto })
  vendas: MetricasVendasDto;

  @ApiProperty({ type: MetricasPerformanceDto })
  performance: MetricasPerformanceDto;

  @ApiProperty({ type: MetricasProdutosDto })
  produtos: MetricasProdutosDto;

  @ApiProperty({ type: MetricasCrescimentoDto })
  crescimento: MetricasCrescimentoDto;

  @ApiProperty({ type: MetricasFinanceirasDto })
  financeiro: MetricasFinanceirasDto;

  @ApiProperty({ type: MetricasOperacionaisDto })
  operacional: MetricasOperacionaisDto;
  @ApiProperty({
    description: 'Período dos dados',
    example: 'Últimos 30 dias',
  })
  periodo: string;

  @ApiProperty({ description: 'Data de última atualização' })
  ultimaAtualizacao: Date;
}
