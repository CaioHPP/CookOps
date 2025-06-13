// hooks/useChartDrilldown.ts
"use client";

import { DashboardData } from "@/types/dashboard.types";
import { useCallback, useState } from "react";

export interface DrilldownData {
  chartType: string;
  title: string;
  period: string;
  data: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface ChartDrilldownState {
  isOpen: boolean;
  data: DrilldownData | null;
}

export function useChartDrilldown() {
  const [drilldownState, setDrilldownState] = useState<ChartDrilldownState>({
    isOpen: false,
    data: null,
  });

  const openDrilldown = useCallback((data: DrilldownData) => {
    setDrilldownState({
      isOpen: true,
      data,
    });
  }, []);

  const closeDrilldown = useCallback(() => {
    setDrilldownState({
      isOpen: false,
      data: null,
    });
  }, []);
  // Gerar dados de drill-down para diferentes tipos de gráficos
  const generateDrilldownData = useCallback(
    (
      chartType: string,
      dashboardData: DashboardData,
      periodo?: string
    ): DrilldownData => {
      const periodoDias = periodo ? parseInt(periodo) : 30;

      switch (chartType) {
        case "vendas":
          const granularidade =
            periodoDias <= 7 ? "dia" : periodoDias < 180 ? "semana" : "mês";

          // Usar os mesmos dados que o gráfico principal está usando
          const dadosOriginais = (() => {
            const periodoNum = periodoDias;

            // Para 1 ano (365 dias) - usar dados mensais
            if (periodoNum === 365) {
              return (
                dashboardData.crescimento.crescimentoMensal?.map((item) => ({
                  periodo: item.mes,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })) || []
              );
            } // Para 6 meses (180 dias) - usar dados mensais disponíveis
            if (periodoNum === 180) {
              return (
                dashboardData.crescimento.crescimentoMensal?.map((item) => ({
                  periodo: item.mes,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })) || []
              );
            }

            // Para 90 dias - usar dados semanais disponíveis (máximo disponível)
            if (periodoNum === 90) {
              return dashboardData.crescimento.crescimentoSemanal.map(
                (item) => ({
                  periodo: item.semana,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })
              );
            }

            // Para 30 dias - usar dados semanais disponíveis
            if (periodoNum === 30) {
              return dashboardData.crescimento.crescimentoSemanal.map(
                (item) => ({
                  periodo: item.semana,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })
              );
            }

            // Para 7 dias - usar dados diários se disponível
            if (periodoNum === 7) {
              return (
                dashboardData.crescimento.crescimentoDiario?.map((item) => ({
                  periodo: item.dia,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })) || []
              );
            }

            // Fallback - usar dados semanais
            return dashboardData.crescimento.crescimentoSemanal.map((item) => ({
              periodo: item.semana,
              pedidos: item.totalPedidos,
              receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
              crescimento: item.crescimentoPercentual,
            }));
          })();

          const dadosVendas = dadosOriginais.map((item) => ({
            periodo: item.periodo,
            receita: Number(item.receita.toFixed(2)),
            pedidos: item.pedidos,
            ticketMedio: Number((item.receita / item.pedidos).toFixed(2)),
          }));
          return {
            chartType: "vendas",
            title: "Detalhes de Vendas - Tendência",
            period: `Últimos ${periodoDias} dias - Dados por ${granularidade} (${dadosVendas.length} ${granularidade}s)`,
            data: dadosVendas,
            metadata: {
              totalReceita: dashboardData.vendas.receitaTotal,
              totalPedidos: dashboardData.vendas.totalPedidos,
              crescimento: dashboardData.vendas.crescimentoReceita,
              ticketMedioGeral: dashboardData.vendas.ticketMedio,
            },
          };
        case "performance":
          return {
            chartType: "performance",
            title: "Análise de Performance",
            period: `Últimos ${periodoDias} dias`,
            data: [
              {
                metrica: "Pedidos em Atraso",
                valor: dashboardData.performance.pedidosEmAtraso,
                limite: 5,
                status:
                  dashboardData.performance.pedidosEmAtraso > 5
                    ? "crítico"
                    : dashboardData.performance.pedidosEmAtraso > 2
                    ? "atenção"
                    : "ok",
                unidade: "pedidos",
              },
              {
                metrica: "Tempo Médio de Finalização",
                valor: Number(
                  dashboardData.performance.tempoMedioFinalizacao.toFixed(1)
                ),
                limite: 30,
                status:
                  dashboardData.performance.tempoMedioFinalizacao > 45
                    ? "crítico"
                    : dashboardData.performance.tempoMedioFinalizacao > 30
                    ? "atenção"
                    : "ok",
                unidade: "min",
              },
              {
                metrica: "Taxa de Confirmação Automática",
                valor: Number(
                  dashboardData.performance.taxaConfirmacaoAutomatica.toFixed(2)
                ),
                limite: 80,
                status:
                  dashboardData.performance.taxaConfirmacaoAutomatica < 70
                    ? "crítico"
                    : dashboardData.performance.taxaConfirmacaoAutomatica < 80
                    ? "atenção"
                    : "ok",
                unidade: "%",
              },
              {
                metrica: "Taxa de Conversão",
                valor: Number(dashboardData.vendas.taxaConversao.toFixed(2)),
                limite: 70,
                status:
                  dashboardData.vendas.taxaConversao < 60
                    ? "crítico"
                    : dashboardData.vendas.taxaConversao < 70
                    ? "atenção"
                    : "ok",
                unidade: "%",
              },
            ],
            metadata: {
              totalMetricas: 4,
              metricasCriticas: [
                dashboardData.performance.pedidosEmAtraso > 5,
                dashboardData.performance.tempoMedioFinalizacao > 45,
                dashboardData.performance.taxaConfirmacaoAutomatica < 70,
                dashboardData.vendas.taxaConversao < 60,
              ].filter(Boolean).length,
            },
          };
        case "produtos":
          // Combinar produtos mais populares com produtos de baixo desempenho para ter uma lista completa
          const todosProdutos = [
            ...dashboardData.produtos.itensMaisPopulares,
            ...(dashboardData.produtos.produtosBaixoDesempenho || []),
          ];

          // Remover duplicatas baseado no produtoId (se existir) ou nome
          const produtosUnicos = todosProdutos.filter(
            (produto, index, array) => {
              return (
                array.findIndex(
                  (p) =>
                    (p.produtoId &&
                      produto.produtoId &&
                      p.produtoId === produto.produtoId) ||
                    (!p.produtoId &&
                      !produto.produtoId &&
                      p.nome === produto.nome)
                ) === index
              );
            }
          );

          // Ordenar por quantidade vendida (maior para menor)
          const produtosOrdenados = produtosUnicos.sort(
            (a, b) => b.quantidadeVendida - a.quantidadeVendida
          );

          return {
            chartType: "produtos",
            title: "Análise Completa de Produtos",
            period: `Últimos ${periodoDias} dias`,
            data: produtosOrdenados.map((produto, index) => ({
              posicao: index + 1,
              nome: produto.nome,
              quantidadeVendida: produto.quantidadeVendida,
              participacao: Number(
                (
                  (produto.quantidadeVendida /
                    produtosOrdenados.reduce(
                      (sum, p) => sum + p.quantidadeVendida,
                      0
                    )) *
                  100
                ).toFixed(2)
              ),
              receita: produto.receita,
              ticketMedio: Number(
                (produto.receita / produto.quantidadeVendida).toFixed(2)
              ),
            })),
            metadata: {
              totalProdutos: produtosOrdenados.length,
              totalVendas: produtosOrdenados.reduce(
                (sum, p) => sum + p.quantidadeVendida,
                0
              ),
              receitaTotal: produtosOrdenados.reduce(
                (sum, p) => sum + p.receita,
                0
              ),
              produtosMaisPopulares:
                dashboardData.produtos.itensMaisPopulares.length,
              produtosBaixoDesempenho: (
                dashboardData.produtos.produtosBaixoDesempenho || []
              ).length,
            },
          };
        case "receita_produtos":
          // Combinar produtos mais populares com produtos de baixo desempenho para análise completa de receita
          const todosProdutosReceita = [
            ...dashboardData.produtos.itensMaisPopulares,
            ...(dashboardData.produtos.produtosBaixoDesempenho || []),
          ];

          // Remover duplicatas baseado no produtoId ou nome
          const produtosUnicosReceita = todosProdutosReceita.filter(
            (produto, index, array) => {
              return (
                array.findIndex(
                  (p) =>
                    (p.produtoId &&
                      produto.produtoId &&
                      p.produtoId === produto.produtoId) ||
                    (!p.produtoId &&
                      !produto.produtoId &&
                      p.nome === produto.nome)
                ) === index
              );
            }
          );

          // Ordenar por receita (maior para menor)
          const produtosPorReceita = produtosUnicosReceita.sort(
            (a, b) => b.receita - a.receita
          );

          return {
            chartType: "receita_produtos",
            title: "Análise Completa de Receita por Produto",
            period: `Últimos ${periodoDias} dias`,
            data: produtosPorReceita.map((produto, index) => ({
              posicao: index + 1,
              nome: produto.nome,
              receita: produto.receita,
              quantidadeVendida: produto.quantidadeVendida,
              ticketMedio: Number(
                (produto.receita / produto.quantidadeVendida).toFixed(2)
              ),
              participacaoReceita: Number(
                (
                  (produto.receita /
                    produtosPorReceita.reduce((sum, p) => sum + p.receita, 0)) *
                  100
                ).toFixed(2)
              ),
              receitaPorUnidade: Number(
                (produto.receita / produto.quantidadeVendida).toFixed(2)
              ),
            })),
            metadata: {
              totalProdutos: produtosPorReceita.length,
              receitaTotal: produtosPorReceita.reduce(
                (sum, p) => sum + p.receita,
                0
              ),
              totalVendas: produtosPorReceita.reduce(
                (sum, p) => sum + p.quantidadeVendida,
                0
              ),
              ticketMedioGeral: Number(
                (
                  produtosPorReceita.reduce((sum, p) => sum + p.receita, 0) /
                  produtosPorReceita.reduce(
                    (sum, p) => sum + p.quantidadeVendida,
                    0
                  )
                ).toFixed(2)
              ),
              maiorReceita: produtosPorReceita[0]?.receita || 0,
              menorReceita:
                produtosPorReceita[produtosPorReceita.length - 1]?.receita || 0,
            },
          };
        case "vendas_dia_semana":
          return {
            chartType: "vendas_dia_semana",
            title: "Análise Detalhada por Dia da Semana",
            period: `Últimos ${periodoDias} dias`,
            data:
              dashboardData.crescimento.vendasPorDiaSemana?.map((dia) => ({
                diaSemana: dia.diaSemana,
                totalPedidos: dia.totalPedidos,
                receitaTotal: dia.receitaTotal,
                percentualTotal: Number(dia.percentualTotal.toFixed(2)),
                ticketMedio: Number(
                  (dia.receitaTotal / dia.totalPedidos).toFixed(2)
                ),
              })) || [],
            metadata: {
              diaMaisMovimentado:
                dashboardData.crescimento.vendasPorDiaSemana?.reduce(
                  (prev, current) =>
                    prev.totalPedidos > current.totalPedidos ? prev : current
                )?.diaSemana || "N/A",
              totalPedidosSemana:
                dashboardData.crescimento.vendasPorDiaSemana?.reduce(
                  (sum, dia) => sum + dia.totalPedidos,
                  0
                ) || 0,
              receitaTotalSemana:
                dashboardData.crescimento.vendasPorDiaSemana?.reduce(
                  (sum, dia) => sum + dia.receitaTotal,
                  0
                ) || 0,
              ticketMedioSemana: Number(
                (
                  (dashboardData.crescimento.vendasPorDiaSemana?.reduce(
                    (sum, dia) => sum + dia.receitaTotal,
                    0
                  ) || 0) /
                  (dashboardData.crescimento.vendasPorDiaSemana?.reduce(
                    (sum, dia) => sum + dia.totalPedidos,
                    0
                  ) || 1)
                ).toFixed(2)
              ),
            },
          };
        case "horarios":
          return {
            chartType: "horarios",
            title: "Análise por Horários (24h Completo)",
            period: `Últimos ${periodoDias} dias`,
            data: dashboardData.crescimento.horariosPico.map((horario) => ({
              hora: `${horario.hora.toString().padStart(2, "0")}:00h`,
              totalPedidos: horario.totalPedidos,
              ocupacao: Number(horario.percentualTotal.toFixed(2)),
              receitaEstimada: Number(
                (
                  horario.totalPedidos * dashboardData.vendas.ticketMedio
                ).toFixed(2)
              ),
            })),
            metadata: {
              horarioPicoHora: `${dashboardData.crescimento.horariosPico
                .reduce((prev, current) =>
                  prev.totalPedidos > current.totalPedidos ? prev : current
                )
                .hora.toString()
                .padStart(2, "0")}:00h`,
              horarioPicoPedidos: dashboardData.crescimento.horariosPico.reduce(
                (prev, current) =>
                  prev.totalPedidos > current.totalPedidos ? prev : current
              ).totalPedidos,
              totalReceita: Number(
                dashboardData.crescimento.horariosPico
                  .reduce(
                    (sum, h) =>
                      sum + h.totalPedidos * dashboardData.vendas.ticketMedio,
                    0
                  )
                  .toFixed(2)
              ),
              totalPedidosHorarios:
                dashboardData.crescimento.horariosPico.reduce(
                  (sum, h) => sum + h.totalPedidos,
                  0
                ),
              totalHorarios: 24,
              horariosComPedidos: dashboardData.crescimento.horariosPico.filter(
                (h) => h.totalPedidos > 0
              ).length,
            },
          };

        default:
          return {
            chartType: "geral",
            title: "Detalhes Gerais",
            period: "Últimos 30 dias",
            data: [],
          };
      }
    },
    []
  );

  return {
    drilldownState,
    openDrilldown,
    closeDrilldown,
    generateDrilldownData,
  };
}
