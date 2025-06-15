// hooks/useChartDrilldown.ts
"use client";

import { calculateTrendLine } from "@/lib/dashboard-utils";
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
      periodo?: string,
      dataInicio?: string,
      dataFim?: string
    ): DrilldownData => {
      // Determinar número de dias baseado no período
      let periodoDias: number;
      let isPersonalizado = false;

      if (periodo === "personalizado" && dataInicio && dataFim) {
        isPersonalizado = true;
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        periodoDias =
          Math.ceil(
            (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1;
      } else {
        periodoDias = periodo ? parseInt(periodo) : 30;
      }

      switch (chartType) {
        case "vendas":
          // Determinar granularidade baseada no número de dias
          let granularidade: string;
          let tipoGranularidade: "dias" | "semanas" | "meses" | "anos";

          if (periodoDias <= 14) {
            granularidade = "dia";
            tipoGranularidade = "dias";
          } else if (periodoDias <= 90) {
            granularidade = "semana";
            tipoGranularidade = "semanas";
          } else if (periodoDias <= 365) {
            granularidade = "mês";
            tipoGranularidade = "meses";
          } else {
            granularidade = "ano";
            tipoGranularidade = "anos";
          }

          // Usar os dados corretos baseado na granularidade
          const dadosOriginais = (() => {
            if (tipoGranularidade === "dias") {
              return (
                dashboardData.crescimento.crescimentoDiario?.map((item) => ({
                  periodo: item.dia,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })) || []
              );
            } else if (tipoGranularidade === "semanas") {
              return dashboardData.crescimento.crescimentoSemanal.map(
                (item) => ({
                  periodo: item.semana,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })
              );
            } else if (
              tipoGranularidade === "meses" ||
              tipoGranularidade === "anos"
            ) {
              return (
                dashboardData.crescimento.crescimentoMensal?.map((item) => ({
                  periodo: item.mes,
                  pedidos: item.totalPedidos,
                  receita: item.totalPedidos * dashboardData.vendas.ticketMedio,
                  crescimento: item.crescimentoPercentual,
                })) || []
              );
            }

            // Fallback
            return [];
          })();

          // Se não há dados, criar dados vazios para mostrar estrutura
          if (dadosOriginais.length === 0) {
            return {
              chartType: "vendas",
              title: "Detalhes de Vendas - Tendência",
              period: isPersonalizado
                ? `Período personalizado: ${dataInicio} a ${dataFim} (${periodoDias} dias) - Dados por ${granularidade}`
                : `Últimos ${periodoDias} dias - Dados por ${granularidade}`,
              data: [],
              metadata: {
                totalReceita: dashboardData.vendas.receitaTotal,
                totalPedidos: dashboardData.vendas.totalPedidos,
                crescimento: dashboardData.vendas.crescimentoReceita,
                ticketMedioGeral: dashboardData.vendas.ticketMedio,
                aviso:
                  "Não há dados disponíveis para este período e granularidade",
              },
            };
          }

          // Calcular linha de tendência para os dados
          const dadosComTendencia = calculateTrendLine(
            dadosOriginais.map((item) => ({
              periodo: item.periodo,
              vendas: item.pedidos,
              crescimento: item.crescimento,
            }))
          );

          const dadosVendas = dadosComTendencia.map((item, index) => ({
            periodo: item.periodo,
            receita: Number(dadosOriginais[index].receita.toFixed(2)),
            pedidos: item.vendas,
            tendencia: item.tendencia || 0,
            ticketMedio: Number(
              (dadosOriginais[index].receita / item.vendas).toFixed(2)
            ),
            crescimentoPercentual: item.crescimento || 0,
          }));
          return {
            chartType: "vendas",
            title: "Detalhes de Vendas - Tendência",
            period: isPersonalizado
              ? `Período personalizado: ${dataInicio} a ${dataFim} (${periodoDias} dias) - Dados por ${granularidade} (${dadosVendas.length} ${tipoGranularidade})`
              : `Últimos ${periodoDias} dias - Dados por ${granularidade} (${dadosVendas.length} ${tipoGranularidade})`,
            data: dadosVendas,
            metadata: {
              totalReceita: dashboardData.vendas.receitaTotal,
              totalPedidos: dashboardData.vendas.totalPedidos,
              crescimento: dashboardData.vendas.crescimentoReceita,
              ticketMedioGeral: dashboardData.vendas.ticketMedio,
              tendenciaInicial: dadosVendas[0]?.tendencia || 0,
              tendenciaFinal:
                dadosVendas[dadosVendas.length - 1]?.tendencia || 0,
              variacao:
                dadosVendas.length > 1
                  ? (dadosVendas[dadosVendas.length - 1]?.tendencia || 0) -
                    (dadosVendas[0]?.tendencia || 0)
                  : 0,
              granularidade: tipoGranularidade,
              periodoDias,
              isPersonalizado,
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
