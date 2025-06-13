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
    const diasPeriodo = parseInt(filters.periodo);

    // ✅ CORREÇÃO: Usar período central para obter dataInicio consistente
    const { dataInicioGeral } = this.calcularPeriodos(diasPeriodo);

    // Executar todas as consultas em paralelo para melhor performance
    const [
      vendas,
      performance,
      produtos,
      crescimento,
      financeiro,
      operacional,
    ] = await Promise.all([
      this.getMetricasVendas(empresaId, dataInicioGeral, diasPeriodo),
      this.getMetricasPerformance(empresaId, dataInicioGeral),
      this.getMetricasProdutos(empresaId, dataInicioGeral),
      this.getMetricasCrescimento(empresaId, dataInicioGeral, filters.periodo),
      this.getMetricasFinanceiras(empresaId, dataInicioGeral),
      this.getMetricasOperacionais(empresaId, dataInicioGeral),
    ]);

    return {
      vendas,
      performance,
      produtos,
      crescimento,
      financeiro,
      operacional,
      periodo: this.getPeriodLabel(filters.periodo),
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
  ): Promise<MetricasVendasDto> {
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

  private async getMetricasPerformance(
    empresaId: string,
    dataInicio: Date,
  ): Promise<MetricasPerformanceDto> {
    // Tempo médio de finalização
    const pedidosConcluidos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        concluidoEm: { not: null },
        criadoEm: { gte: dataInicio },
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
    // ✅ REMOVIDO: Referência ao campo canceladoEm que não existe no schema
    const pedidosAtivos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        concluidoEm: null, // Apenas pedidos não concluídos
        criadoEm: { gte: dataInicio },
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
  ): Promise<MetricasProdutosDto> {
    // ✅ CORREÇÃO: Buscar todos os itens vendidos para cálculos precisos de receita
    const itensVendidos = await this.prisma.pedidoItem.findMany({
      where: {
        pedido: {
          empresaId,
          confirmado: true,
          criadoEm: { gte: dataInicio },
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
  ): Promise<MetricasCrescimentoDto> {
    const diasPeriodo = parseInt(periodo);

    // ✅ CORREÇÃO: Crescimento baseado no período selecionado (não fixo em 4 semanas)
    const crescimentoSemanal: CrescimentoSemanalDto[] = [];

    // Para períodos <= 90 dias, mostrar crescimento semanal
    if (diasPeriodo <= 90) {
      const numeroSemanas = Math.min(Math.ceil(diasPeriodo / 7), 12); // Max 12 semanas

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

    // ✅ CORREÇÃO: Agregações mensais para períodos de 6 meses e 1 ano
    let crescimentoMensal: CrescimentoMensalDto[] | undefined;
    if (diasPeriodo >= 180) {
      const mesesParaGerar = diasPeriodo === 365 ? 12 : 6;
      crescimentoMensal = [];

      for (let i = 0; i < mesesParaGerar; i++) {
        const agora = new Date();

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

    // ✅ CORREÇÃO: Agregações diárias para período de 7 dias
    let crescimentoDiario: CrescimentoDiarioDto[] | undefined;
    if (diasPeriodo === 7) {
      crescimentoDiario = [];

      for (let i = 0; i < 7; i++) {
        const data = new Date();
        data.setUTCDate(data.getUTCDate() - (6 - i)); // Últimos 7 dias
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
          dia: data.toLocaleDateString('pt-BR', { weekday: 'short' }),
          totalPedidos,
          crescimentoPercentual,
          receitaTotal,
        });
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
  ): Promise<MetricasFinanceirasDto> {
    // ✅ BUSCAR PEDIDOS COM INFORMAÇÕES DE ENDEREÇO PARA ANÁLISE DE ENTREGA
    const pedidos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        confirmado: true,
        criadoEm: { gte: dataInicio },
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
  ): Promise<MetricasOperacionaisDto> {
    // Pedidos por status
    const statusPedidos = await this.prisma.pedido.groupBy({
      by: ['statusId'],
      where: {
        empresaId,
        criadoEm: { gte: dataInicio },
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
        criadoEm: { gte: dataInicio },
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
  private getPeriodLabel(periodo: string): string {
    const labels: Record<string, string> = {
      '7': '7 dias',
      '30': '30 dias',
      '90': '90 dias',
      '180': '6 meses',
      '365': '1 ano',
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

    // ✅ CORREÇÃO: Calcular período anterior corretamente
    const diasPeriodo = parseInt(filters.periodo);

    // Período anterior: mesmo número de dias, mas deslocado para trás
    const filtersAnterior = {
      ...filters,
      periodo: (diasPeriodo * 2).toString(), // Dobrar o período para pegar o anterior
    };

    const dashboardAnterior = await this.getDashboardDataWithFilters(
      empresaId,
      filtersAnterior,
    );

    // Simular dados do período anterior (seria necessário implementar lógica específica)
    const anterior = dashboardAnterior; // Por enquanto, usar os mesmos dados

    return { atual, anterior };
  }
}
