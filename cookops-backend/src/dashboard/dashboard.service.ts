import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CrescimentoDiarioDto,
  CrescimentoMensalDto,
  CrescimentoSemanalDto,
  DashboardResponseDto,
  FontePerformanceDto,
  FormaPagamentoPopularDto,
  HorarioPicoDto,
  MetricasCrescimentoDto,
  MetricasFinanceirasDto,
  MetricasOperacionaisDto,
  MetricasPerformanceDto,
  MetricasProdutosDto,
  MetricasVendasDto,
  PedidosPorStatusDto,
} from './dto/dashboard.dto';

// Interface para filtros do dashboard
interface DashboardFilters {
  periodo: string;
  status: string;
  fonte: string;
  dataInicio?: string; // Formato: YYYY-MM-DD
  dataFim?: string; // Formato: YYYY-MM-DD
}

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(
    empresaId: string,
    periodo: string = '30',
  ): Promise<DashboardResponseDto> {
    const filters = { periodo, status: 'todos', fonte: 'todas' };
    return this.getDashboardDataWithFilters(empresaId, filters);
  }
  async getDashboardDataWithFilters(
    empresaId: string,
    filters: DashboardFilters,
  ): Promise<DashboardResponseDto> {
    let diasPeriodo: number;
    let dataInicioGeral: Date;
    let dataFimGeral: Date;

    if (
      filters.periodo === 'personalizado' &&
      filters.dataInicio &&
      filters.dataFim
    ) {
      // Para período personalizado, calcular a diferença em dias
      const dataInicio = new Date(filters.dataInicio);
      const dataFim = new Date(filters.dataFim);

      // Configurar as horas corretamente
      dataInicio.setUTCHours(0, 0, 0, 0);
      dataFim.setUTCHours(23, 59, 59, 999);

      // Calcular número de dias
      const diferencaMs = dataFim.getTime() - dataInicio.getTime();
      diasPeriodo = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24)) + 1;
      dataInicioGeral = dataInicio;
      dataFimGeral = dataFim;
    } else {
      // Para períodos predefinidos, usar a lógica existente
      diasPeriodo = parseInt(filters.periodo);
      const { dataInicioGeral: dataInicio, dataFimGeral: dataFim } =
        this.calcularPeriodos(diasPeriodo);
      dataInicioGeral = dataInicio;
      dataFimGeral = dataFim;
    }

    // Executar todas as consultas em paralelo para melhor performance
    const [
      vendas,
      performance,
      produtos,
      crescimento,
      financeiro,
      operacional,
    ] = await Promise.all([
      this.getMetricasVendas(
        empresaId,
        dataInicioGeral,
        diasPeriodo,
        dataFimGeral,
      ),
      this.getMetricasPerformance(
        empresaId,
        dataInicioGeral,
        diasPeriodo,
        dataFimGeral,
      ),
      this.getMetricasProdutos(
        empresaId,
        dataInicioGeral,
        diasPeriodo,
        dataFimGeral,
      ),
      this.getMetricasCrescimento(
        empresaId,
        dataInicioGeral,
        filters.periodo,
        diasPeriodo,
        dataFimGeral,
      ),
      this.getMetricasFinanceiras(
        empresaId,
        dataInicioGeral,
        diasPeriodo,
        dataFimGeral,
      ),
      this.getMetricasOperacionais(
        empresaId,
        dataInicioGeral,
        diasPeriodo,
        dataFimGeral,
      ),
    ]);

    return {
      vendas,
      performance,
      produtos,
      crescimento,
      financeiro,
      operacional,
      periodo: this.getPeriodLabel(
        filters.periodo,
        filters.dataInicio,
        filters.dataFim,
      ),
      ultimaAtualizacao: new Date(),
    };
  }
  // ✅ MÉTODO CENTRAL: Define períodos de forma consistente para TODOS os cálculos
  private calcularPeriodos(diasPeriodo: number): {
    periodos: Array<{ inicio: Date; fim: Date }>;
    dataInicioGeral: Date;
    dataFimGeral: Date;
  } {
    const agora = new Date();
    const hoje = new Date(agora);
    hoje.setUTCHours(23, 59, 59, 999); // Fim do dia atual (inclusivo)

    const periodos: Array<{ inicio: Date; fim: Date }> = [];
    let dataInicioGeral: Date;
    const dataFimGeral: Date = hoje;

    if (diasPeriodo === 7) {
      // Para 7 dias: EXATAMENTE os últimos 7 dias incluindo hoje
      // Se hoje é 12/06, então: 06/06, 07/06, 08/06, 09/06, 10/06, 11/06, 12/06
      for (let i = 0; i < 7; i++) {
        const data = new Date(agora);
        data.setUTCDate(data.getUTCDate() - (6 - i)); // i=0: 6 dias atrás, i=6: hoje
        const inicio = new Date(data);
        inicio.setUTCHours(0, 0, 0, 0);
        const fim = new Date(data);
        fim.setUTCHours(23, 59, 59, 999);

        periodos.push({ inicio, fim });
      }

      // Data de início é o primeiro dia dos 7 dias (6 dias atrás)
      const dataInicio = new Date(agora);
      dataInicio.setUTCDate(dataInicio.getUTCDate() - 6);
      dataInicio.setUTCHours(0, 0, 0, 0);
      dataInicioGeral = dataInicio;
    } else if (diasPeriodo <= 90) {
      // Para 30-90 dias: por semanas, incluindo a semana atual
      const numeroSemanas = Math.min(Math.ceil(diasPeriodo / 7), 12);

      for (let i = 0; i < numeroSemanas; i++) {
        const fimSemana = new Date(agora);
        fimSemana.setUTCDate(fimSemana.getUTCDate() - i * 7);
        fimSemana.setUTCHours(23, 59, 59, 999);

        const inicioSemana = new Date(fimSemana);
        inicioSemana.setUTCDate(inicioSemana.getUTCDate() - 6);
        inicioSemana.setUTCHours(0, 0, 0, 0);

        periodos.push({ inicio: inicioSemana, fim: fimSemana });
      }
      dataInicioGeral = periodos[periodos.length - 1].inicio;
    } else {
      // Para períodos >= 180 dias: por meses, incluindo o mês atual
      const mesesParaGerar = diasPeriodo === 365 ? 12 : 6;

      for (let i = 0; i < mesesParaGerar; i++) {
        const fimMes = new Date(
          Date.UTC(
            agora.getUTCFullYear(),
            agora.getUTCMonth() - i + 1,
            0,
            23,
            59,
            59,
            999,
          ),
        );
        const inicioMes = new Date(
          Date.UTC(
            agora.getUTCFullYear(),
            agora.getUTCMonth() - i,
            1,
            0,
            0,
            0,
            0,
          ),
        );

        periodos.push({ inicio: inicioMes, fim: fimMes });
      }
      dataInicioGeral = periodos[periodos.length - 1].inicio;
    }

    return { periodos, dataInicioGeral, dataFimGeral };
  }

  // ✅ MÉTODO COMPARTILHADO: Calcular total de TODOS os pedidos usando períodos consistentes
  private async calcularTotalPedidosTodos(
    empresaId: string,
    diasPeriodo: number,
  ): Promise<number> {
    const { dataInicioGeral, dataFimGeral } =
      this.calcularPeriodos(diasPeriodo);

    return await this.prisma.pedido.count({
      where: {
        empresaId,
        criadoEm: { gte: dataInicioGeral, lte: dataFimGeral },
      },
    });
  }

  // ✅ MÉTODO COMPARTILHADO: Calcular receita usando períodos consistentes
  private async calcularReceitaTotalPorPeriodo(
    empresaId: string,
    diasPeriodo: number,
  ): Promise<number> {
    const { periodos } = this.calcularPeriodos(diasPeriodo);
    let receitaTotal = 0;

    for (const periodo of periodos) {
      const pedidosPeriodo = await this.prisma.pedido.findMany({
        where: {
          empresaId,
          criadoEm: { gte: periodo.inicio, lte: periodo.fim },
          confirmado: true,
        },
        select: { valorTotal: true },
      });
      receitaTotal += pedidosPeriodo.reduce((sum, p) => sum + p.valorTotal, 0);
    }

    return receitaTotal;
  }

  // ✅ MÉTODO COMPARTILHADO: Garantir exatamente a mesma lógica para cards e gráficos
  private async calcularTotalPedidosConfirmados(
    empresaId: string,
    diasPeriodo: number,
  ): Promise<number> {
    const { periodos } = this.calcularPeriodos(diasPeriodo);
    let totalPedidos = 0;

    for (const periodo of periodos) {
      const pedidosPeriodo = await this.prisma.pedido.count({
        where: {
          empresaId,
          criadoEm: { gte: periodo.inicio, lte: periodo.fim },
          confirmado: true,
        },
      });
      totalPedidos += pedidosPeriodo;
    }

    return totalPedidos;
  }

  private async getMetricasVendas(
    empresaId: string,
    dataInicio: Date,
    diasPeriodo: number,
    dataFim?: Date,
  ): Promise<MetricasVendasDto> {
    // Para período personalizado, usar datas específicas
    if (dataFim) {
      // Buscar pedidos confirmados no período específico
      const pedidosConfirmados = await this.prisma.pedido.findMany({
        where: {
          empresaId,
          confirmado: true,
          criadoEm: { gte: dataInicio, lte: dataFim },
        },
        select: { valorTotal: true },
      });

      const totalPedidos = pedidosConfirmados.length;
      const receitaTotal = pedidosConfirmados.reduce(
        (sum, p) => sum + p.valorTotal,
        0,
      );
      const ticketMedio = totalPedidos > 0 ? receitaTotal / totalPedidos : 0;

      // Buscar todos os pedidos (incluindo não confirmados) para taxa de conversão
      const todosPedidos = await this.prisma.pedido.count({
        where: {
          empresaId,
          criadoEm: { gte: dataInicio, lte: dataFim },
        },
      });

      const taxaConversao =
        todosPedidos > 0 ? (totalPedidos / todosPedidos) * 100 : 0;

      return {
        totalPedidos,
        receitaTotal,
        ticketMedio,
        taxaConversao,
        crescimentoReceita: 0, // TODO: Implementar comparação para período personalizado
        variacaoTicketMedio: 0, // TODO: Implementar comparação para período personalizado
      };
    }

    // Para períodos predefinidos, usar a lógica existente
    // ✅ CORREÇÃO FINAL: Usar método compartilhado para garantir consistência total
    const totalPedidos = await this.calcularTotalPedidosConfirmados(
      empresaId,
      diasPeriodo,
    );
    // ✅ CORREÇÃO FINAL: Também calcular receita usando a mesma lógica de período
    const receitaTotal = await this.calcularReceitaTotalPorPeriodo(
      empresaId,
      diasPeriodo,
    );

    const ticketMedio = totalPedidos > 0 ? receitaTotal / totalPedidos : 0;

    // ✅ CORREÇÃO: Taxa de conversão usando períodos consistentes
    const totalPedidosTodos = await this.calcularTotalPedidosTodos(
      empresaId,
      diasPeriodo,
    );

    const taxaConversao =
      totalPedidosTodos > 0 ? (totalPedidos / totalPedidosTodos) * 100 : 0;

    // ✅ CORREÇÃO: Dados do período anterior para comparação (corrigido)
    const dataInicioAnterior = new Date(dataInicio);
    dataInicioAnterior.setUTCDate(
      dataInicioAnterior.getUTCDate() - diasPeriodo,
    );
    dataInicioAnterior.setUTCHours(0, 0, 0, 0);

    const dataFimAnterior = new Date(dataInicio);
    dataFimAnterior.setUTCHours(23, 59, 59, 999);

    const pedidosConfirmadosAnterior = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        confirmado: true,
        criadoEm: { gte: dataInicioAnterior, lt: dataInicio },
      },
      select: { valorTotal: true },
    });

    const receitaAnterior = pedidosConfirmadosAnterior.reduce(
      (sum, p) => sum + p.valorTotal,
      0,
    );
    const ticketMedioAnterior =
      pedidosConfirmadosAnterior.length > 0
        ? receitaAnterior / pedidosConfirmadosAnterior.length
        : 0;

    const crescimentoReceita =
      receitaAnterior > 0
        ? ((receitaTotal - receitaAnterior) / receitaAnterior) * 100
        : 0;
    const variacaoTicketMedio =
      ticketMedioAnterior > 0
        ? ((ticketMedio - ticketMedioAnterior) / ticketMedioAnterior) * 100
        : 0;

    return {
      totalPedidos,
      receitaTotal,
      ticketMedio,
      taxaConversao,
      crescimentoReceita,
      variacaoTicketMedio,
    };
  }

  /**
   * Versão específica para calcular métricas de vendas do período anterior
   */
  private async getMetricasVendasPeriodoAnterior(
    empresaId: string,
    dataInicio: Date,
    diasPeriodo: number,
  ): Promise<MetricasVendasDto> {
    // Calcular data de fim baseada na data de início
    const dataFim = new Date(dataInicio);
    dataFim.setUTCDate(dataFim.getUTCDate() + diasPeriodo - 1);
    dataFim.setUTCHours(23, 59, 59, 999);

    // Buscar pedidos confirmados no período específico
    const pedidosConfirmados = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        confirmado: true,
        criadoEm: { gte: dataInicio, lte: dataFim },
      },
      select: { valorTotal: true },
    });

    const totalPedidos = pedidosConfirmados.length;
    const receitaTotal = pedidosConfirmados.reduce(
      (sum, p) => sum + p.valorTotal,
      0,
    );
    const ticketMedio = totalPedidos > 0 ? receitaTotal / totalPedidos : 0;

    // Buscar todos os pedidos (incluindo não confirmados) para taxa de conversão
    const todosPedidos = await this.prisma.pedido.count({
      where: {
        empresaId,
        criadoEm: { gte: dataInicio, lte: dataFim },
      },
    });

    const taxaConversao =
      todosPedidos > 0 ? (totalPedidos / todosPedidos) * 100 : 0;

    return {
      totalPedidos,
      receitaTotal,
      ticketMedio,
      taxaConversao,
      crescimentoReceita: 0, // Não aplicável para período anterior
      variacaoTicketMedio: 0, // Não aplicável para período anterior
    };
  }

  private async getMetricasPerformance(
    empresaId: string,
    dataInicio: Date,
    diasPeriodo?: number,
    dataFimPersonalizado?: Date,
  ): Promise<MetricasPerformanceDto> {
    // Usar data de fim personalizada se fornecida, senão calcular
    let dataFim: Date | undefined = dataFimPersonalizado;
    if (!dataFim && diasPeriodo) {
      dataFim = new Date(dataInicio);
      dataFim.setUTCDate(dataFim.getUTCDate() + diasPeriodo - 1);
      dataFim.setUTCHours(23, 59, 59, 999);
    }

    // Tempo médio de finalização
    const pedidosConcluidos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        concluidoEm: { not: null },
        criadoEm: dataFim
          ? { gte: dataInicio, lte: dataFim }
          : { gte: dataInicio },
      },
      select: { criadoEm: true, concluidoEm: true },
    });

    const tempoMedioFinalizacao =
      pedidosConcluidos.length > 0
        ? pedidosConcluidos.reduce((sum, p) => {
            const diff =
              new Date(p.concluidoEm!).getTime() -
              new Date(p.criadoEm).getTime();
            return sum + diff / (1000 * 60); // em minutos
          }, 0) / pedidosConcluidos.length
        : 0;

    // Configuração da empresa para tempo médio de preparo
    const configuracao = await this.prisma.configuracaoEmpresa.findUnique({
      where: { empresaId },
      select: { tempoPreparoMedio: true },
    });

    const tempoPreparoMedio = configuracao?.tempoPreparoMedio || 30;

    // ✅ CORREÇÃO: Pedidos em atraso - considerando apenas pedidos ativos não concluídos
    const pedidosAtivos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        concluidoEm: null, // Apenas pedidos não concluídos
        criadoEm: dataFim
          ? { gte: dataInicio, lte: dataFim }
          : { gte: dataInicio },
      },
      select: { criadoEm: true },
    });

    const agora = new Date();
    const pedidosEmAtraso = pedidosAtivos.filter((p) => {
      const tempoDecorrido =
        (agora.getTime() - new Date(p.criadoEm).getTime()) / (1000 * 60);
      return tempoDecorrido > tempoPreparoMedio;
    }).length;

    // Taxa de confirmação automática
    const totalPedidos = await this.prisma.pedido.count({
      where: { empresaId, criadoEm: { gte: dataInicio } },
    });

    const pedidosConfirmacaoAutomatica = await this.prisma.pedido.count({
      where: {
        empresaId,
        confirmaAutomatico: true,
        criadoEm: { gte: dataInicio },
      },
    });

    const taxaConfirmacaoAutomatica =
      totalPedidos > 0
        ? (pedidosConfirmacaoAutomatica / totalPedidos) * 100
        : 0;

    // ✅ CORREÇÃO: Pedidos por hora no pico baseado no período selecionado (não fixo em 24h)
    const pedidosPorHora = await this.prisma.pedido.groupBy({
      by: ['criadoEm'],
      where: {
        empresaId,
        criadoEm: { gte: dataInicio },
      },
      _count: true,
    });

    const pedidosPorHoraPico = Math.max(
      ...pedidosPorHora.map((p) => p._count),
      0,
    );

    return {
      tempoMedioFinalizacao: Math.round(tempoMedioFinalizacao),
      pedidosEmAtraso,
      taxaConfirmacaoAutomatica,
      pedidosPorHoraPico,
    };
  }

  private async getMetricasProdutos(
    empresaId: string,
    dataInicio: Date,
    diasPeriodo?: number,
    dataFimPersonalizado?: Date,
  ): Promise<MetricasProdutosDto> {
    // Usar data de fim personalizada se fornecida, senão calcular
    let dataFim: Date | undefined = dataFimPersonalizado;
    if (!dataFim && diasPeriodo) {
      dataFim = new Date(dataInicio);
      dataFim.setUTCDate(dataFim.getUTCDate() + diasPeriodo - 1);
      dataFim.setUTCHours(23, 59, 59, 999);
    }

    // ✅ CORREÇÃO: Buscar todos os itens vendidos para cálculos precisos de receita
    const itensVendidos = await this.prisma.pedidoItem.findMany({
      where: {
        pedido: {
          empresaId,
          confirmado: true,
          criadoEm: dataFim
            ? { gte: dataInicio, lte: dataFim }
            : { gte: dataInicio },
        },
      },
      select: {
        produtoId: true,
        quantidade: true,
        precoUnitario: true,
        produto: { select: { nome: true } },
      },
    });

    // Agrupar por produto e calcular métricas corretamente
    const produtoMetricas = new Map<
      string,
      {
        nome: string;
        quantidadeVendida: number;
        receita: number;
      }
    >();

    itensVendidos.forEach((item) => {
      const key = item.produtoId;
      const existing = produtoMetricas.get(key);
      const receitaItem = item.quantidade * item.precoUnitario; // ✅ Receita correta

      if (existing) {
        existing.quantidadeVendida += item.quantidade;
        existing.receita += receitaItem;
      } else {
        produtoMetricas.set(key, {
          nome: item.produto?.nome || 'Produto não encontrado',
          quantidadeVendida: item.quantidade,
          receita: receitaItem,
        });
      }
    });

    // Converter para array com produtoId
    const produtosArray = Array.from(produtoMetricas.entries()).map(
      ([produtoId, data]) => ({
        produtoId,
        ...data,
      }),
    );

    // Top 5 produtos mais vendidos (por quantidade)
    const itensMaisPopulares = produtosArray
      .sort((a, b) => b.quantidadeVendida - a.quantidadeVendida)
      .slice(0, 5);

    // Top 5 produtos por receita
    const receitaPorProduto = produtosArray
      .sort((a, b) => b.receita - a.receita)
      .slice(0, 5);

    // Produtos com baixo desempenho (menor quantidade vendida)
    const produtosBaixoDesempenho = produtosArray
      .sort((a, b) => a.quantidadeVendida - b.quantidadeVendida)
      .slice(0, 5);

    return {
      itensMaisPopulares,
      receitaPorProduto,
      produtosBaixoDesempenho,
    };
  }

  private async getMetricasCrescimento(
    empresaId: string,
    dataInicio: Date,
    periodo: string = '30',
    diasPeriodo?: number,
    dataFimPersonalizado?: Date,
  ): Promise<MetricasCrescimentoDto> {
    const diasCalc = diasPeriodo || parseInt(periodo);

    // ✅ CORREÇÃO: Crescimento baseado no período selecionado
    const crescimentoSemanal: CrescimentoSemanalDto[] = [];

    // Determinar granularidade baseada no número de dias
    if (diasCalc <= 14) {
      // 1-14 dias: granularidade diária - vamos usar crescimentoDiario para isso
    } else if (diasCalc <= 90) {
      // 15-90 dias: granularidade semanal

      if (dataFimPersonalizado) {
        // Para período personalizado, usar as datas específicas
        const dataFinalCalculo = dataFimPersonalizado;
        const dataInicialCalculo = dataInicio;

        const numeroSemanas = Math.ceil(diasCalc / 7);

        for (let i = 0; i < numeroSemanas; i++) {
          const fimSemana = new Date(dataFinalCalculo);
          fimSemana.setUTCDate(fimSemana.getUTCDate() - i * 7);
          fimSemana.setUTCHours(23, 59, 59, 999);

          const inicioSemana = new Date(fimSemana);
          inicioSemana.setUTCDate(inicioSemana.getUTCDate() - 6);
          inicioSemana.setUTCHours(0, 0, 0, 0);

          // Não processar se a semana estiver fora do período
          if (inicioSemana < dataInicialCalculo) {
            inicioSemana.setTime(dataInicialCalculo.getTime());
          }

          const pedidosSemana = await this.prisma.pedido.count({
            where: {
              empresaId,
              confirmado: true,
              criadoEm: { gte: inicioSemana, lte: fimSemana },
            },
          });

          crescimentoSemanal.push({
            semana: `Semana ${numeroSemanas - i}`,
            totalPedidos: pedidosSemana,
            crescimentoPercentual: 0, // TODO: Implementar comparação
          });
        }

        crescimentoSemanal.reverse(); // Ordenar do mais antigo para o mais recente
      } else {
        // Para períodos predefinidos, usar a lógica existente
        const numeroSemanas = Math.min(Math.ceil(diasCalc / 7), 12); // Max 12 semanas

        for (let i = 0; i < numeroSemanas; i++) {
          const fimSemana = new Date();
          fimSemana.setUTCDate(fimSemana.getUTCDate() - i * 7);
          fimSemana.setUTCHours(23, 59, 59, 999);

          const inicioSemana = new Date(fimSemana);
          inicioSemana.setUTCDate(inicioSemana.getUTCDate() - 6);
          inicioSemana.setUTCHours(0, 0, 0, 0);

          const pedidosSemana = await this.prisma.pedido.count({
            where: {
              empresaId,
              confirmado: true,
              criadoEm: { gte: inicioSemana, lte: fimSemana },
            },
          });

          // Semana anterior para comparação
          const semanaAnterior = new Date(inicioSemana);
          semanaAnterior.setUTCDate(semanaAnterior.getUTCDate() - 7);
          const fimSemanaAnterior = new Date(inicioSemana);
          fimSemanaAnterior.setUTCDate(fimSemanaAnterior.getUTCDate() - 1);

          const pedidosSemanaAnterior = await this.prisma.pedido.count({
            where: {
              empresaId,
              confirmado: true,
              criadoEm: { gte: semanaAnterior, lte: fimSemanaAnterior },
            },
          });

          const crescimentoPercentual =
            pedidosSemanaAnterior > 0
              ? ((pedidosSemana - pedidosSemanaAnterior) /
                  pedidosSemanaAnterior) *
                100
              : 0;

          crescimentoSemanal.push({
            semana: `Semana ${numeroSemanas - i}`,
            totalPedidos: pedidosSemana,
            crescimentoPercentual,
          });
        }

        crescimentoSemanal.reverse(); // Ordenar do mais antigo para o mais recente
      }
    } else {
      // Mais de 90 dias: granularidade mensal ou anual dependendo do tamanho
    }

    // ✅ CORREÇÃO: Agregações mensais/anuais para períodos maiores que 90 dias
    let crescimentoMensal: CrescimentoMensalDto[] | undefined;
    if (diasCalc > 90) {
      crescimentoMensal = [];

      if (diasCalc > 365) {
        // Mais de 1 ano: granularidade anual
        const anosParaGerar = Math.min(Math.ceil(diasCalc / 365), 5);

        for (let i = 0; i < anosParaGerar; i++) {
          const agora = dataFimPersonalizado || new Date();
          const anoAtual = agora.getUTCFullYear() - i;

          const inicioAno = new Date(Date.UTC(anoAtual, 0, 1, 0, 0, 0, 0));
          const fimAno = new Date(Date.UTC(anoAtual, 11, 31, 23, 59, 59, 999));

          const pedidosAno = await this.prisma.pedido.findMany({
            where: {
              empresaId,
              criadoEm: { gte: inicioAno, lte: fimAno },
              confirmado: true,
            },
            select: { valorTotal: true },
          });

          const totalPedidos = pedidosAno.length;
          const receitaTotal = pedidosAno.reduce(
            (sum, p) => sum + p.valorTotal,
            0,
          );

          crescimentoMensal.push({
            mes: anoAtual.toString(),
            totalPedidos,
            crescimentoPercentual: 0, // TODO: Implementar comparação
            receitaTotal,
          });
        }

        crescimentoMensal.reverse(); // Ordenar do mais antigo para o mais recente
      } else {
        // 91-365 dias: granularidade mensal
        const mesesParaGerar = Math.min(Math.ceil(diasCalc / 30), 12);

        for (let i = 0; i < mesesParaGerar; i++) {
          const agora = dataFimPersonalizado || new Date();

          // ✅ CORREÇÃO: Usar UTC e cálculo correto de mês
          const fimMes = new Date(
            Date.UTC(
              agora.getUTCFullYear(),
              agora.getUTCMonth() - i + 1,
              0,
              23,
              59,
              59,
              999,
            ),
          );
          const inicioMes = new Date(
            Date.UTC(
              agora.getUTCFullYear(),
              agora.getUTCMonth() - i,
              1,
              0,
              0,
              0,
              0,
            ),
          );

          const pedidosMes = await this.prisma.pedido.findMany({
            where: {
              empresaId,
              criadoEm: { gte: inicioMes, lte: fimMes },
              confirmado: true,
            },
            select: { valorTotal: true },
          });

          const totalPedidos = pedidosMes.length;
          const receitaTotal = pedidosMes.reduce(
            (sum, p) => sum + p.valorTotal,
            0,
          );

          // Mês anterior para comparação
          const mesAnterior = new Date(
            Date.UTC(
              agora.getUTCFullYear(),
              agora.getUTCMonth() - i - 1,
              1,
              0,
              0,
              0,
              0,
            ),
          );
          const fimMesAnterior = new Date(
            Date.UTC(
              agora.getUTCFullYear(),
              agora.getUTCMonth() - i,
              0,
              23,
              59,
              59,
              999,
            ),
          );

          const pedidosMesAnterior = await this.prisma.pedido.count({
            where: {
              empresaId,
              criadoEm: { gte: mesAnterior, lte: fimMesAnterior },
              confirmado: true,
            },
          });

          const crescimentoPercentual =
            pedidosMesAnterior > 0
              ? ((totalPedidos - pedidosMesAnterior) / pedidosMesAnterior) * 100
              : 0;

          crescimentoMensal.push({
            mes: inicioMes.toLocaleDateString('pt-BR', { month: 'short' }),
            totalPedidos,
            crescimentoPercentual,
            receitaTotal,
          });
        }

        crescimentoMensal.reverse(); // Ordenar do mais antigo para o mais recente
      }
    }

    // ✅ CORREÇÃO: Agregações diárias para períodos de 1-14 dias
    let crescimentoDiario: CrescimentoDiarioDto[] | undefined;
    if (diasCalc <= 14) {
      crescimentoDiario = [];

      if (dataFimPersonalizado) {
        // Para período personalizado, usar as datas específicas
        const dataFinalCalculo = dataFimPersonalizado;
        const dataInicialCalculo = dataInicio;

        // Calcular dias usando as datas exatas (evitando problemas de timezone)
        const inicioUTC = new Date(
          Date.UTC(
            dataInicialCalculo.getUTCFullYear(),
            dataInicialCalculo.getUTCMonth(),
            dataInicialCalculo.getUTCDate(),
          ),
        );
        const fimUTC = new Date(
          Date.UTC(
            dataFinalCalculo.getUTCFullYear(),
            dataFinalCalculo.getUTCMonth(),
            dataFinalCalculo.getUTCDate(),
          ),
        );

        const totalDias =
          Math.floor(
            (fimUTC.getTime() - inicioUTC.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1;

        for (let i = 0; i < totalDias; i++) {
          // Criar data UTC baseada na data inicial + i dias
          const diaUTC = new Date(
            Date.UTC(
              inicioUTC.getUTCFullYear(),
              inicioUTC.getUTCMonth(),
              inicioUTC.getUTCDate() + i,
            ),
          );

          const inicioDia = new Date(diaUTC);
          inicioDia.setUTCHours(0, 0, 0, 0);
          const fimDia = new Date(diaUTC);
          fimDia.setUTCHours(23, 59, 59, 999);

          const pedidosDia = await this.prisma.pedido.findMany({
            where: {
              empresaId,
              criadoEm: { gte: inicioDia, lte: fimDia },
              confirmado: true,
            },
            select: { valorTotal: true },
          });

          const totalPedidos = pedidosDia.length;
          const receitaTotal = pedidosDia.reduce(
            (sum, p) => sum + p.valorTotal,
            0,
          );

          // Usar formato ISO simples para evitar problemas de timezone
          const diaFormatado = diaUTC.toISOString().split('T')[0]; // YYYY-MM-DD
          const [ano, mes, dia] = diaFormatado.split('-');
          const diaExibicao = `${dia}/${mes}`;

          crescimentoDiario.push({
            dia: diaExibicao,
            totalPedidos,
            crescimentoPercentual: 0, // TODO: Implementar comparação
            receitaTotal,
          });
        }
      } else {
        // Para períodos predefinidos (7 dias)
        for (let i = 0; i < diasCalc; i++) {
          const data = new Date();
          data.setUTCDate(data.getUTCDate() - (diasCalc - 1 - i)); // Últimos X dias
          const inicioDia = new Date(data);
          inicioDia.setUTCHours(0, 0, 0, 0);
          const fimDia = new Date(data);
          fimDia.setUTCHours(23, 59, 59, 999);

          const pedidosDia = await this.prisma.pedido.findMany({
            where: {
              empresaId,
              criadoEm: { gte: inicioDia, lte: fimDia },
              confirmado: true,
            },
            select: { valorTotal: true },
          });

          const totalPedidos = pedidosDia.length;
          const receitaTotal = pedidosDia.reduce(
            (sum, p) => sum + p.valorTotal,
            0,
          );

          // Dia anterior para comparação
          const diaAnterior = new Date(inicioDia);
          diaAnterior.setUTCDate(diaAnterior.getUTCDate() - 1);
          const fimDiaAnterior = new Date(diaAnterior);
          fimDiaAnterior.setUTCHours(23, 59, 59, 999);
          diaAnterior.setUTCHours(0, 0, 0, 0);

          const pedidosDiaAnterior = await this.prisma.pedido.count({
            where: {
              empresaId,
              criadoEm: { gte: diaAnterior, lte: fimDiaAnterior },
              confirmado: true,
            },
          });

          const crescimentoPercentual =
            pedidosDiaAnterior > 0
              ? ((totalPedidos - pedidosDiaAnterior) / pedidosDiaAnterior) * 100
              : 0;

          crescimentoDiario.push({
            dia: data.toLocaleDateString('pt-BR', {
              weekday: 'short',
              day: '2-digit',
              month: '2-digit',
            }),
            totalPedidos,
            crescimentoPercentual,
            receitaTotal,
          });
        }
      }
    }

    // ✅ CORREÇÃO: Horários de pico baseados no período selecionado
    const pedidosPorHora = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        criadoEm: { gte: dataInicio },
      },
      select: { criadoEm: true },
    });

    const contagemPorHora: { [key: number]: number } = {};
    pedidosPorHora.forEach((pedido) => {
      const hora = new Date(pedido.criadoEm).getUTCHours(); // ✅ Usar UTC
      contagemPorHora[hora] = (contagemPorHora[hora] || 0) + 1;
    });

    const totalPedidosHoras = Object.values(contagemPorHora).reduce(
      (sum, count) => sum + count,
      0,
    );

    // ✅ CORREÇÃO: Retornar TODAS as 24 horas (0-23), não apenas os top 6
    const horariosPico: HorarioPicoDto[] = Array.from(
      { length: 24 },
      (_, hora) => ({
        hora,
        totalPedidos: contagemPorHora[hora] || 0,
        percentualTotal:
          totalPedidosHoras > 0
            ? ((contagemPorHora[hora] || 0) / totalPedidosHoras) * 100
            : 0,
      }),
    );

    // Performance por fonte
    const fontes = await this.prisma.pedido.groupBy({
      by: ['fonteId'],
      where: {
        empresaId,
        criadoEm: { gte: dataInicio },
      },
      _count: true,
      _avg: { valorTotal: true },
    });

    const totalPedidosFontes = fontes.reduce((sum, f) => sum + f._count, 0);

    const performancePorFonte: FontePerformanceDto[] = await Promise.all(
      fontes.map(async (fonte) => {
        const fontePedido = await this.prisma.fontePedido.findUnique({
          where: { id: fonte.fonteId },
          select: { nome: true },
        });

        return {
          fonteId: fonte.fonteId,
          nome: fontePedido?.nome || 'Fonte não encontrada',
          totalPedidos: fonte._count,
          valorMedio: fonte._avg.valorTotal || 0,
          percentualTotal:
            totalPedidosFontes > 0
              ? (fonte._count / totalPedidosFontes) * 100
              : 0,
        };
      }),
    );

    // ✅ NOVO: Vendas por dia da semana
    const pedidosPorDiaSemana = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        criadoEm: { gte: dataInicio },
        confirmado: true,
      },
      select: { criadoEm: true, valorTotal: true },
    });

    const contagemPorDiaSemana: {
      [key: string]: { pedidos: number; receita: number };
    } = {
      Segunda: { pedidos: 0, receita: 0 },
      Terça: { pedidos: 0, receita: 0 },
      Quarta: { pedidos: 0, receita: 0 },
      Quinta: { pedidos: 0, receita: 0 },
      Sexta: { pedidos: 0, receita: 0 },
      Sábado: { pedidos: 0, receita: 0 },
      Domingo: { pedidos: 0, receita: 0 },
    };

    const diasSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];

    pedidosPorDiaSemana.forEach((pedido) => {
      const diaSemana = diasSemana[new Date(pedido.criadoEm).getUTCDay()];
      contagemPorDiaSemana[diaSemana].pedidos += 1;
      contagemPorDiaSemana[diaSemana].receita += pedido.valorTotal;
    });

    const totalPedidosDiaSemana = Object.values(contagemPorDiaSemana).reduce(
      (sum, dia) => sum + dia.pedidos,
      0,
    );

    const vendasPorDiaSemana = Object.entries(contagemPorDiaSemana).map(
      ([dia, dados]) => ({
        diaSemana: dia,
        totalPedidos: dados.pedidos,
        receitaTotal: dados.receita,
        percentualTotal:
          totalPedidosDiaSemana > 0
            ? (dados.pedidos / totalPedidosDiaSemana) * 100
            : 0,
      }),
    );

    return {
      crescimentoSemanal,
      crescimentoMensal,
      crescimentoDiario,
      horariosPico,
      vendasPorDiaSemana,
      performancePorFonte,
    };
  }
  private async getMetricasFinanceiras(
    empresaId: string,
    dataInicio: Date,
    diasPeriodo?: number,
    dataFimPersonalizado?: Date,
  ): Promise<MetricasFinanceirasDto> {
    // Usar data de fim personalizada se fornecida, senão calcular
    let dataFim: Date | undefined = dataFimPersonalizado;
    if (!dataFim && diasPeriodo) {
      dataFim = new Date(dataInicio);
      dataFim.setUTCDate(dataFim.getUTCDate() + diasPeriodo - 1);
      dataFim.setUTCHours(23, 59, 59, 999);
    }

    // ✅ BUSCAR PEDIDOS COM INFORMAÇÕES DE ENDEREÇO PARA ANÁLISE DE ENTREGA
    const pedidos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        confirmado: true,
        criadoEm: dataFim
          ? { gte: dataInicio, lte: dataFim }
          : { gte: dataInicio },
      },
      select: {
        valorTotal: true,
        taxaEntrega: true,
        desconto: true,
        endereco: {
          select: {
            id: true, // Para verificar se tem endereço
          },
        },
      },
    });

    const totalPedidos = pedidos.length;

    // ✅ MÉTRICAS BÁSICAS (mantidas)
    const taxaEntregaMedia =
      pedidos.length > 0
        ? pedidos.reduce((sum, p) => sum + (p.taxaEntrega || 0), 0) /
          pedidos.length
        : 0;

    const descontoMedio =
      pedidos.length > 0
        ? pedidos.reduce((sum, p) => sum + (p.desconto || 0), 0) /
          pedidos.length
        : 0;

    const receitaLiquida = pedidos.reduce(
      (sum, p) => sum + p.valorTotal - (p.desconto || 0),
      0,
    );

    const receitaEntregas = pedidos.reduce(
      (sum, p) => sum + (p.taxaEntrega || 0),
      0,
    );

    const percentualReceitaEntrega =
      receitaLiquida > 0 ? (receitaEntregas / receitaLiquida) * 100 : 0;

    // ✅ NOVAS MÉTRICAS DE ENTREGA
    // Pedidos de entrega = pedidos com endereço
    const pedidosComEndereco = pedidos.filter((p) => p.endereco !== null);
    const numeroPedidosEntrega = pedidosComEndereco.length;
    const porcentagemPedidosEntrega =
      totalPedidos > 0 ? (numeroPedidosEntrega / totalPedidos) * 100 : 0;

    // Pedidos de entrega cobradas = pedidos com endereço E taxa de entrega > 0
    const pedidosEntregaCobradas = pedidos.filter(
      (p) => p.endereco !== null && (p.taxaEntrega || 0) > 0,
    );
    const numeroPedidosEntregaCobradas = pedidosEntregaCobradas.length;
    const porcentagemPedidosEntregaCobradas =
      totalPedidos > 0
        ? (numeroPedidosEntregaCobradas / totalPedidos) * 100
        : 0;

    // Valor médio de taxa de entrega (apenas dos pedidos que têm taxa > 0)
    const valorMedioTaxaEntrega =
      numeroPedidosEntregaCobradas > 0
        ? pedidosEntregaCobradas.reduce(
            (sum, p) => sum + (p.taxaEntrega || 0),
            0,
          ) / numeroPedidosEntregaCobradas
        : 0;

    // Valor total de taxas de entrega cobradas
    const valorTotalTaxasEntrega = pedidosEntregaCobradas.reduce(
      (sum, p) => sum + (p.taxaEntrega || 0),
      0,
    );

    // ✅ NOVAS MÉTRICAS DE DESCONTO
    // Pedidos com desconto = pedidos com desconto > 0
    const pedidosComDesconto = pedidos.filter((p) => (p.desconto || 0) > 0);
    const numeroPedidosComDesconto = pedidosComDesconto.length;
    const porcentagemPedidosComDesconto =
      totalPedidos > 0 ? (numeroPedidosComDesconto / totalPedidos) * 100 : 0;

    // Valor médio de desconto (apenas dos pedidos que têm desconto > 0)
    const valorMedioDesconto =
      numeroPedidosComDesconto > 0
        ? pedidosComDesconto.reduce((sum, p) => sum + (p.desconto || 0), 0) /
          numeroPedidosComDesconto
        : 0;

    // Valor total de descontos dados
    const valorTotalDescontos = pedidos.reduce(
      (sum, p) => sum + (p.desconto || 0),
      0,
    );

    return {
      // Métricas básicas existentes
      taxaEntregaMedia,
      descontoMedio,
      receitaLiquida,
      percentualReceitaEntrega,
      // Novas métricas de entrega
      valorMedioTaxaEntrega,
      numeroPedidosEntrega,
      porcentagemPedidosEntrega,
      numeroPedidosEntregaCobradas,
      porcentagemPedidosEntregaCobradas,
      valorTotalTaxasEntrega,
      // Novas métricas de desconto
      valorMedioDesconto,
      numeroPedidosComDesconto,
      porcentagemPedidosComDesconto,
      valorTotalDescontos,
    };
  }

  private async getMetricasOperacionais(
    empresaId: string,
    dataInicio: Date,
    diasPeriodo?: number,
    dataFimPersonalizado?: Date,
  ): Promise<MetricasOperacionaisDto> {
    // Usar data de fim personalizada se fornecida, senão calcular
    let dataFim: Date | undefined = dataFimPersonalizado;
    if (!dataFim && diasPeriodo) {
      dataFim = new Date(dataInicio);
      dataFim.setUTCDate(dataFim.getUTCDate() + diasPeriodo - 1);
      dataFim.setUTCHours(23, 59, 59, 999);
    }

    // Pedidos por status
    const statusPedidos = await this.prisma.pedido.groupBy({
      by: ['statusId'],
      where: {
        empresaId,
        criadoEm: dataFim
          ? { gte: dataInicio, lte: dataFim }
          : { gte: dataInicio },
      },
      _count: true,
    });

    const totalPedidosStatus = statusPedidos.reduce(
      (sum, s) => sum + s._count,
      0,
    );

    const pedidosPorStatus: PedidosPorStatusDto[] = await Promise.all(
      statusPedidos.map(async (status) => {
        const pedidoStatus = await this.prisma.pedidoStatus.findUnique({
          where: { id: status.statusId },
          select: { titulo: true },
        });

        return {
          statusId: status.statusId,
          titulo: pedidoStatus?.titulo || 'Status não encontrado',
          totalPedidos: status._count,
          percentualTotal:
            totalPedidosStatus > 0
              ? (status._count / totalPedidosStatus) * 100
              : 0,
        };
      }),
    );

    // Formas de pagamento mais usadas
    const pagamentos = await this.prisma.pedido.groupBy({
      by: ['pagamentoId'],
      where: {
        empresaId,
        criadoEm: dataFim
          ? { gte: dataInicio, lte: dataFim }
          : { gte: dataInicio },
      },
      _count: true,
    });

    const totalPedidosPagamentos = pagamentos.reduce(
      (sum, p) => sum + p._count,
      0,
    );

    const formasPagamentoPreferidas: FormaPagamentoPopularDto[] =
      await Promise.all(
        pagamentos.map(async (pagamento) => {
          const formaPagamento = await this.prisma.formaPagamento.findUnique({
            where: { id: pagamento.pagamentoId },
            select: { nome: true },
          });

          return {
            pagamentoId: pagamento.pagamentoId,
            nome: formaPagamento?.nome || 'Forma de pagamento não encontrada',
            totalPedidos: pagamento._count,
            percentualTotal:
              totalPedidosPagamentos > 0
                ? (pagamento._count / totalPedidosPagamentos) * 100
                : 0,
          };
        }),
      );

    // ✅ CORREÇÃO: Movimentações no board baseadas no período selecionado
    const movimentacoesBoard = await this.prisma.logMovimentacao.count({
      where: {
        dataMovimentacao: { gte: dataInicio },
        pedido: { empresaId },
      },
    });

    return {
      pedidosPorStatus,
      formasPagamentoPreferidas,
      movimentacoesBoard,
    };
  }

  /**
   * Constrói a cláusula WHERE baseada nos filtros
   */
  private buildWhereClause(
    empresaId: string,
    dataInicio: Date,
    filters: DashboardFilters,
  ) {
    const where: {
      empresaId: string;
      criadoEm: { gte: Date };
      statusId?: string;
      fonteId?: string;
    } = {
      empresaId,
      criadoEm: { gte: dataInicio },
    };

    // Filtro por status - aqui seria necessário buscar o ID do status pelo nome
    if (filters.status && filters.status !== 'todos') {
      // Implementação seria necessária para converter nome para ID
      // where.statusId = statusId;
    }

    // Filtro por fonte - aqui seria necessário buscar o ID da fonte pelo nome
    if (filters.fonte && filters.fonte !== 'todas') {
      // Implementação seria necessária para converter nome para ID
      // where.fonteId = fonteId;
    }

    return where;
  }

  /**
   * Retorna o rótulo do período
   */
  private getPeriodLabel(
    periodo: string,
    dataInicio?: string,
    dataFim?: string,
  ): string {
    if (periodo === 'personalizado' && dataInicio && dataFim) {
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);
      const diferencaMs = fim.getTime() - inicio.getTime();
      const dias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24)) + 1;
      return `${dias} dias (${dataInicio} a ${dataFim})`;
    }

    const labels: Record<string, string> = {
      '7': '7 dias',
      '30': '30 dias',
      '90': '90 dias',
      '180': '6 meses',
      '365': '1 ano',
      personalizado: 'Período personalizado',
    };

    return labels[periodo] || `Últimos ${periodo} dias`;
  }
  /**
   * ✅ CORREÇÃO: Método para dados comparativos com cálculo correto do período anterior
   */
  async getDashboardComparativo(
    empresaId: string,
    filters: DashboardFilters,
  ): Promise<{ atual: DashboardResponseDto; anterior: DashboardResponseDto }> {
    const atual = await this.getDashboardDataWithFilters(empresaId, filters);

    let diasPeriodo: number;

    if (
      filters.periodo === 'personalizado' &&
      filters.dataInicio &&
      filters.dataFim
    ) {
      // Para período personalizado, calcular a diferença em dias
      const dataInicio = new Date(filters.dataInicio);
      const dataFim = new Date(filters.dataFim);
      const diferencaMs = dataFim.getTime() - dataInicio.getTime();
      diasPeriodo = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24)) + 1;
    } else {
      // Para períodos predefinidos
      diasPeriodo = parseInt(filters.periodo);
    }

    // Calcular período anterior equivalente
    const anterior = await this.getDashboardPeriodoAnterior(
      empresaId,
      filters,
      diasPeriodo,
    );

    return { atual, anterior };
  }

  /**
   * Calcula dados do dashboard para o período anterior equivalente
   */
  private async getDashboardPeriodoAnterior(
    empresaId: string,
    filters: DashboardFilters,
    diasPeriodo: number,
  ): Promise<DashboardResponseDto> {
    // Calcular as datas do período anterior
    const { dataInicioAnterior, dataFimAnterior } =
      this.calcularPeriodoAnterior(diasPeriodo, filters);

    // Buscar dados usando as métricas específicas para período anterior
    const vendas = await this.getMetricasVendasPeriodoAnterior(
      empresaId,
      dataInicioAnterior,
      diasPeriodo,
    );
    const performance = await this.getMetricasPerformance(
      empresaId,
      dataInicioAnterior,
      diasPeriodo,
    );
    const operacional = await this.getMetricasOperacionais(
      empresaId,
      dataInicioAnterior,
      diasPeriodo,
    );
    const produtos = await this.getMetricasProdutos(
      empresaId,
      dataInicioAnterior,
      diasPeriodo,
    );
    const financeiro = await this.getMetricasFinanceiras(
      empresaId,
      dataInicioAnterior,
      diasPeriodo,
    );
    const crescimento = await this.getMetricasCrescimento(
      empresaId,
      dataInicioAnterior,
      filters.periodo,
      diasPeriodo,
    );
    return {
      vendas,
      performance,
      operacional,
      produtos,
      financeiro,
      crescimento,
      periodo: filters.periodo,
      ultimaAtualizacao: new Date(),
    };
  }

  /**
   * Calcula as datas do período anterior equivalente
   * Para 7 dias: se hoje é 14/06, período atual é 08/06 00:00 a 14/06 23:59
   * e período anterior é 01/06 00:00 a 07/06 23:59
   */
  private calcularPeriodoAnterior(
    diasPeriodo: number,
    filters?: DashboardFilters,
  ): {
    dataInicioAnterior: Date;
    dataFimAnterior: Date;
  } {
    const agora = new Date();

    // Para período personalizado
    if (
      filters?.periodo === 'personalizado' &&
      filters.dataInicio &&
      filters.dataFim
    ) {
      const dataInicioAtual = new Date(filters.dataInicio);
      const dataFimAtual = new Date(filters.dataFim);

      // Calcular período anterior: mesmo número de dias, mas deslocado para trás
      const dataFimAnterior = new Date(dataInicioAtual);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - 1); // Um dia antes do início atual
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(
        dataInicioAnterior.getUTCDate() - (diasPeriodo - 1),
      ); // Mesmo número de dias para trás
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    }

    if (diasPeriodo === 7) {
      // Para 7 dias: se hoje é 14/06, anterior vai de 01/06 00:00 a 07/06 23:59
      const dataFimAnterior = new Date(agora);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - 7); // 7 dias atrás (07/06)
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(dataInicioAnterior.getUTCDate() - 6); // 6 dias antes (01/06)
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    } else if (diasPeriodo === 30) {
      // Para 30 dias: comparar com os 30 dias anteriores
      const dataFimAnterior = new Date(agora);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - 30); // 30 dias atrás
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(dataInicioAnterior.getUTCDate() - 29); // 29 dias antes
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    } else if (diasPeriodo === 90) {
      // Para 90 dias: comparar com os 90 dias anteriores
      const dataFimAnterior = new Date(agora);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - 90); // 90 dias atrás
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(dataInicioAnterior.getUTCDate() - 89); // 89 dias antes
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    } else if (diasPeriodo === 180) {
      // Para 6 meses: comparar com os 6 meses anteriores
      const dataFimAnterior = new Date(agora);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - 180); // 6 meses atrás (aproximado)
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(dataInicioAnterior.getUTCDate() - 179); // 179 dias antes
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    } else if (diasPeriodo === 365) {
      // Para 1 ano: comparar com o ano anterior
      const dataFimAnterior = new Date(agora);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - 365); // 1 ano atrás (aproximado)
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(dataInicioAnterior.getUTCDate() - 364); // 364 dias antes
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    } else {
      // Fallback para outros períodos: usar o mesmo número de dias
      const dataFimAnterior = new Date(agora);
      dataFimAnterior.setUTCDate(dataFimAnterior.getUTCDate() - diasPeriodo);
      dataFimAnterior.setUTCHours(23, 59, 59, 999);

      const dataInicioAnterior = new Date(dataFimAnterior);
      dataInicioAnterior.setUTCDate(
        dataInicioAnterior.getUTCDate() - (diasPeriodo - 1),
      );
      dataInicioAnterior.setUTCHours(0, 0, 0, 0);

      return { dataInicioAnterior, dataFimAnterior };
    }
  }
}
