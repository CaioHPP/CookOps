// Tipos para métricas de vendas
export interface MetricasVendas {
  totalPedidos: number;
  receitaTotal: number;
  ticketMedio: number;
  taxaConversao: number;
  crescimentoReceita?: number;
  variacaoTicketMedio?: number;
}

// Tipos para métricas de performance
export interface MetricasPerformance {
  tempoMedioFinalizacao: number;
  pedidosEmAtraso: number;
  taxaConfirmacaoAutomatica: number;
  pedidosPorHoraPico: number;
}

// Tipos para métricas de produtos
export interface ItemPopular {
  produtoId: string;
  nome: string;
  quantidadeVendida: number;
  receita: number;
}

export interface MetricasProdutos {
  itensMaisPopulares: ItemPopular[];
  receitaPorProduto: ItemPopular[];
  produtosBaixoDesempenho: ItemPopular[];
}

// Tipos para métricas de crescimento
export interface CrescimentoSemanal {
  semana: string;
  totalPedidos: number;
  crescimentoPercentual: number;
}

export interface CrescimentoMensal {
  mes: string;
  totalPedidos: number;
  crescimentoPercentual: number;
}

export interface CrescimentoDiario {
  dia: string;
  totalPedidos: number;
  crescimentoPercentual: number;
}

export interface HorarioPico {
  hora: number;
  totalPedidos: number;
  percentualTotal: number;
}

export interface FontePerformance {
  fonteId: number;
  nome: string;
  totalPedidos: number;
  valorMedio: number;
  percentualTotal: number;
}

export interface VendasDiaSemana {
  diaSemana: string;
  totalPedidos: number;
  receitaTotal: number;
  percentualTotal: number;
}

export interface MetricasCrescimento {
  crescimentoSemanal: CrescimentoSemanal[];
  crescimentoMensal?: CrescimentoMensal[];
  crescimentoDiario?: CrescimentoDiario[];
  horariosPico: HorarioPico[];
  vendasPorDiaSemana: VendasDiaSemana[];
  performancePorFonte: FontePerformance[];
}

// Tipos para métricas financeiras
export interface MetricasFinanceiras {
  taxaEntregaMedia: number;
  descontoMedio: number;
  receitaLiquida: number;
  percentualReceitaEntrega: number;
  // Novas métricas de entrega
  valorMedioTaxaEntrega: number;
  numeroPedidosEntrega: number;
  porcentagemPedidosEntrega: number;
  numeroPedidosEntregaCobradas: number;
  porcentagemPedidosEntregaCobradas: number;
  valorTotalTaxasEntrega: number;
  // Novas métricas de desconto
  valorMedioDesconto: number;
  numeroPedidosComDesconto: number;
  porcentagemPedidosComDesconto: number;
  valorTotalDescontos: number;
}

// Tipos para métricas operacionais
export interface PedidosPorStatus {
  statusId: number;
  titulo: string;
  totalPedidos: number;
  percentualTotal: number;
}

export interface FormaPagamentoPopular {
  pagamentoId: number;
  nome: string;
  totalPedidos: number;
  percentualTotal: number;
}

export interface MetricasOperacionais {
  pedidosPorStatus: PedidosPorStatus[];
  formasPagamentoPreferidas: FormaPagamentoPopular[];
  movimentacoesBoard: number;
}

// Tipo principal do dashboard
export interface DashboardData {
  vendas: MetricasVendas;
  performance: MetricasPerformance;
  produtos: MetricasProdutos;
  crescimento: MetricasCrescimento;
  financeiro: MetricasFinanceiras;
  operacional: MetricasOperacionais;
  periodo: string;
  ultimaAtualizacao: string;
}

// Tipos para filtros
export interface FiltrosDashboard {
  periodo: "7" | "30" | "90" | "180" | "365";
  dataInicio?: string;
  dataFim?: string;
}

export interface DashboardFilters {
  periodo: "7" | "30" | "90" | "180" | "365";
  status: string;
  fonte: string;
}

// Tipos para cards de métricas
export interface CardMetrica {
  titulo: string;
  valor: string | number;
  icone: React.ComponentType;
  cor: string;
  tendencia?: {
    valor: number;
    tipo: "aumento" | "diminuicao" | "estavel";
  };
  descricao?: string;
}

export const ColorMap = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
];
