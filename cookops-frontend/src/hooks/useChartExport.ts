// hooks/useChartExport.ts
"use client";

import { ProdutoService } from "@/api/services/produto.service";
import { DashboardData } from "@/types/dashboard.types";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { useCallback } from "react";
import * as XLSX from "xlsx";

export interface ExportOptions {
  format: "csv" | "xlsx" | "png" | "pdf";
  title: string;
  includeMetadata?: boolean;
}

export function useChartExport() {
  const exportToCSV = useCallback((data: unknown[], filename: string) => {
    if (!data.length) return;

    const headers = Object.keys(data[0] as Record<string, unknown>);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = (row as Record<string, unknown>)[header];
            return typeof value === "string" && value.includes(",")
              ? `"${value}"`
              : value;
          })
          .join(",")
      ),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  const exportToPNG = useCallback(
    (chartRef: React.RefObject<HTMLDivElement>, filename: string) => {
      if (!chartRef.current) return;

      // Implementação básica sem html2canvas por enquanto
      console.log("Exportação PNG não implementada ainda:", filename);
      // TODO: Implementar exportação PNG quando necessário
    },
    []
  );
  // Função utilitária para criar e baixar arquivo Excel
  const downloadExcelFile = useCallback(
    (workbook: XLSX.WorkBook, filename: string) => {
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    []
  );

  // Função utilitária para adicionar metadados
  const addMetadataSheet = useCallback(
    (workbook: XLSX.WorkBook, title: string) => {
      const metadataData = [
        ["ℹ️ INFORMAÇÕES DO RELATÓRIO", "", ""],
        ["", "", ""],
        ["Título", title, ""],
        ["Data de Geração", new Date().toLocaleString("pt-BR"), ""],
        ["Sistema", "CookOps Dashboard", ""],
        ["Formato", "Excel (.xlsx)", ""],
        ["", "", ""],
        ["⚠️ OBSERVAÇÕES", "", ""],
        ["• Este relatório foi gerado automaticamente", "", ""],
        ["• Dados baseados no período selecionado", "", ""],
        ["• Para dúvidas, consulte a documentação", "", ""],
      ];

      const metadataSheet = XLSX.utils.aoa_to_sheet(metadataData);
      XLSX.utils.book_append_sheet(workbook, metadataSheet, "ℹ️ Metadados");
    },
    []
  );

  const exportVendasData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const workbook = XLSX.utils.book_new();

      // Detecção inteligente do tipo de exportação
      const isVendasDiaSemana =
        options.title.toLowerCase().includes("dia da semana") ||
        options.title.toLowerCase().includes("vendas por dia");
      const isTendenciaVendas =
        options.title.toLowerCase().includes("tendência") ||
        options.title.toLowerCase().includes("crescimento");

      if (isVendasDiaSemana) {
        const vendasDiaData = [
          ["📅 VENDAS POR DIA DA SEMANA", "", "", "", ""],
          [
            "Dia da Semana",
            "Total Pedidos",
            "Receita Total",
            "Percentual",
            "Performance",
          ],
        ];

        if (
          dashboardData.crescimento.vendasPorDiaSemana &&
          dashboardData.crescimento.vendasPorDiaSemana.length > 0
        ) {
          dashboardData.crescimento.vendasPorDiaSemana.forEach((dia) => {
            let performance = "Normal";
            if (dia.percentualTotal > 20) performance = "Excelente";
            else if (dia.percentualTotal > 15) performance = "Muito Bom";
            else if (dia.percentualTotal < 10) performance = "Baixo";

            vendasDiaData.push([
              dia.diaSemana,
              dia.totalPedidos.toString(),
              `R$ ${dia.receitaTotal.toFixed(2)}`,
              `${dia.percentualTotal.toFixed(1)}%`,
              performance,
            ]);
          });
        }

        const vendasDiaSheet = XLSX.utils.aoa_to_sheet(vendasDiaData);
        XLSX.utils.book_append_sheet(
          workbook,
          vendasDiaSheet,
          "Vendas por Dia da Semana"
        );
      } else if (isTendenciaVendas) {
        // Dados de tendência/crescimento
        const tendenciaData = [
          ["📈 TENDÊNCIA DE VENDAS", "", "", ""],
          ["Período", "Total Pedidos", "Crescimento %", "Tendência"],
        ];

        if (dashboardData.crescimento?.crescimentoSemanal) {
          dashboardData.crescimento.crescimentoSemanal.forEach((item) => {
            let tendencia = "Estável";
            if (item.crescimentoPercentual > 10)
              tendencia = "Forte Crescimento";
            else if (item.crescimentoPercentual > 0) tendencia = "Crescimento";
            else if (item.crescimentoPercentual < -10)
              tendencia = "Forte Queda";
            else if (item.crescimentoPercentual < 0) tendencia = "Queda";

            tendenciaData.push([
              item.semana,
              item.totalPedidos.toString(),
              `${item.crescimentoPercentual.toFixed(1)}%`,
              tendencia,
            ]);
          });
        }

        const tendenciaSheet = XLSX.utils.aoa_to_sheet(tendenciaData);
        XLSX.utils.book_append_sheet(
          workbook,
          tendenciaSheet,
          "Tendência de Vendas"
        );
      } else {
        // Dados gerais de vendas
        const vendasData = [
          ["💰 DADOS DE VENDAS", "", ""],
          ["Métrica", "Valor", "Período"],
        ];

        vendasData.push(
          [
            "Receita Total",
            `R$ ${dashboardData.vendas.receitaTotal.toLocaleString("pt-BR")}`,
            "Período Selecionado",
          ],
          [
            "Total de Pedidos",
            dashboardData.vendas.totalPedidos.toString(),
            "Período Selecionado",
          ],
          [
            "Ticket Médio",
            `R$ ${dashboardData.vendas.ticketMedio.toFixed(2)}`,
            "Período Selecionado",
          ],
          [
            "Taxa de Conversão",
            `${dashboardData.vendas.taxaConversao.toFixed(1)}%`,
            "Período Selecionado",
          ]
        );

        if (dashboardData.vendas.crescimentoReceita !== undefined) {
          vendasData.push([
            "Crescimento da Receita",
            `${dashboardData.vendas.crescimentoReceita.toFixed(1)}%`,
            "vs período anterior",
          ]);
        }

        const vendasSheet = XLSX.utils.aoa_to_sheet(vendasData);
        XLSX.utils.book_append_sheet(workbook, vendasSheet, "Dados de Vendas");
      }

      addMetadataSheet(workbook, options.title);
      downloadExcelFile(
        workbook,
        `vendas_${options.title.toLowerCase().replace(/\\s+/g, "_")}`
      );
    },
    [downloadExcelFile, addMetadataSheet]
  );
  const exportProdutosData = useCallback(
    async (dashboardData: DashboardData, options: ExportOptions) => {
      try {
        // Buscar TODOS os produtos da empresa
        const todosProdutos = await ProdutoService.getProdutosByEmpresaAuth();
        console.log(
          `✅ Encontrados ${todosProdutos.length} produtos na empresa`
        );

        const mapaProdutos = new Map<string, ProdutoResponseDto>();
        todosProdutos.forEach((produto) => {
          mapaProdutos.set(produto.id, produto);
        });

        const workbook = XLSX.utils.book_new();

        // 1. PRODUTOS POPULARES (do dashboard)
        const produtosPopulares = [
          ["🏆 PRODUTOS MAIS POPULARES", "", "", "", "", "", ""],
          [
            "Posição",
            "Nome",
            "Qtd Vendida",
            "Receita",
            "Participação %",
            "Status",
            "Preço Base",
          ],
        ];

        dashboardData.produtos.itensMaisPopulares.forEach((produto, index) => {
          const produtoInfo = mapaProdutos.get(produto.produtoId);
          const status = produtoInfo?.ativo ? "Ativo" : "Inativo";
          const precoBase = produtoInfo?.precoBase || 0;

          produtosPopulares.push([
            (index + 1).toString(),
            produto.nome,
            produto.quantidadeVendida.toString(),
            `R$ ${produto.receita.toFixed(2)}`,
            `${(
              (produto.quantidadeVendida / dashboardData.vendas.totalPedidos) *
              100
            ).toFixed(1)}%`,
            status,
            `R$ ${precoBase.toFixed(2)}`,
          ]);
        });

        const populareSheet = XLSX.utils.aoa_to_sheet(produtosPopulares);
        XLSX.utils.book_append_sheet(workbook, populareSheet, "Top Produtos");

        // 2. TODOS OS PRODUTOS DA EMPRESA
        const produtosVendidos = new Map<
          string,
          { quantidade: number; receita: number }
        >();
        [
          ...dashboardData.produtos.itensMaisPopulares,
          ...(dashboardData.produtos.receitaPorProduto || []),
          ...(dashboardData.produtos.produtosBaixoDesempenho || []),
        ].forEach((produto) => {
          if (!produtosVendidos.has(produto.produtoId)) {
            produtosVendidos.set(produto.produtoId, {
              quantidade: produto.quantidadeVendida,
              receita: produto.receita,
            });
          }
        });

        const todosOsProdutos = [
          ["📋 TODOS OS PRODUTOS DA EMPRESA", "", "", "", "", "", "", ""],
          [
            "Nome",
            "Preço Base",
            "Status",
            "Qtd Vendida",
            "Receita",
            "Performance",
            "Observações",
            "Ação Recomendada",
          ],
        ];

        todosProdutos.forEach((produto) => {
          const vendas = produtosVendidos.get(produto.id);
          const quantidade = vendas?.quantidade || 0;
          const receita = vendas?.receita || 0;

          let performance = "Sem vendas";
          let observacoes = "Não vendido no período";
          let acaoRecomendada = "Analisar demanda";

          if (quantidade > 0) {
            if (quantidade >= 30) {
              performance = "Excelente";
              observacoes = "Alto volume, produto estrela";
              acaoRecomendada = "Manter estratégia";
            } else if (quantidade >= 15) {
              performance = "Muito Bom";
              observacoes = "Bom volume de vendas";
              acaoRecomendada = "Potencializar marketing";
            } else if (quantidade >= 5) {
              performance = "Bom";
              observacoes = "Volume moderado";
              acaoRecomendada = "Considerar promoções";
            } else {
              performance = "Baixo";
              observacoes = "Poucas vendas";
              acaoRecomendada = "Revisar preço/posicionamento";
            }
          } else if (!produto.ativo) {
            observacoes = "Produto desativado";
            acaoRecomendada = "Avaliar reativação";
          } else {
            acaoRecomendada = "Investigar causa/considerar remoção";
          }

          todosOsProdutos.push([
            produto.nome,
            `R$ ${produto.precoBase.toFixed(2)}`,
            produto.ativo ? "Ativo" : "Inativo",
            quantidade.toString(),
            receita > 0 ? `R$ ${receita.toFixed(2)}` : "R$ 0,00",
            performance,
            observacoes,
            acaoRecomendada,
          ]);
        });

        const todosSheet = XLSX.utils.aoa_to_sheet(todosOsProdutos);
        XLSX.utils.book_append_sheet(workbook, todosSheet, "Todos os Produtos");

        // 3. PRODUTOS SEM VENDAS (se houver)
        const produtosSemVendas = [
          ["🚫 PRODUTOS SEM VENDAS", "", "", "", ""],
          ["Nome", "Preço Base", "Status", "Recomendação", "Prioridade"],
        ];

        let temProdutosSemVendas = false;
        todosProdutos.forEach((produto) => {
          const vendas = produtosVendidos.get(produto.id);
          if (!vendas || vendas.quantidade === 0) {
            temProdutosSemVendas = true;
            let recomendacao = "Analisar demanda";
            let prioridade = "Média";

            if (!produto.ativo) {
              recomendacao = "Produto já inativo";
              prioridade = "Baixa";
            } else {
              recomendacao = "Revisar preço/disponibilidade";
              prioridade = "Alta";
            }

            produtosSemVendas.push([
              produto.nome,
              `R$ ${produto.precoBase.toFixed(2)}`,
              produto.ativo ? "Ativo" : "Inativo",
              recomendacao,
              prioridade,
            ]);
          }
        });

        if (temProdutosSemVendas) {
          const semVendasSheet = XLSX.utils.aoa_to_sheet(produtosSemVendas);
          XLSX.utils.book_append_sheet(workbook, semVendasSheet, "Sem Vendas");
        }

        // 4. TOP 20 RECEITA
        const produtosComVendas = todosProdutos
          .filter((produto) => {
            const vendas = produtosVendidos.get(produto.id);
            return vendas && vendas.quantidade > 0;
          })
          .map((produto) => {
            const vendas = produtosVendidos.get(produto.id)!;
            return {
              nome: produto.nome,
              precoBase: produto.precoBase,
              quantidade: vendas.quantidade,
              receita: vendas.receita,
              ticketMedio: vendas.receita / vendas.quantidade,
            };
          })
          .sort((a, b) => b.receita - a.receita)
          .slice(0, 20);

        if (produtosComVendas.length > 0) {
          const top20Data = [
            ["🏆 TOP 20 PRODUTOS POR RECEITA", "", "", "", "", ""],
            [
              "Posição",
              "Nome",
              "Qtd Vendida",
              "Receita Total",
              "Ticket Médio",
              "Preço Base",
            ],
          ];

          produtosComVendas.forEach((produto, index) => {
            top20Data.push([
              (index + 1).toString(),
              produto.nome,
              produto.quantidade.toString(),
              `R$ ${produto.receita.toFixed(2)}`,
              `R$ ${produto.ticketMedio.toFixed(2)}`,
              `R$ ${produto.precoBase.toFixed(2)}`,
            ]);
          });

          const top20Sheet = XLSX.utils.aoa_to_sheet(top20Data);
          XLSX.utils.book_append_sheet(workbook, top20Sheet, "Top 20 Receita");
        }

        addMetadataSheet(
          workbook,
          options.title + " - Análise Completa de Produtos"
        );
        downloadExcelFile(
          workbook,
          `produtos_completo_${options.title
            .toLowerCase()
            .replace(/\\s+/g, "_")}`
        );
      } catch (error) {
        console.error("❌ Erro ao buscar todos os produtos:", error);

        // Fallback: usar apenas dados do dashboard
        const produtosData = dashboardData.produtos.itensMaisPopulares.map(
          (produto, index) => ({
            posicao: index + 1,
            nome: produto.nome,
            quantidadeVendida: produto.quantidadeVendida,
            receita: produto.receita,
            receitaFormatada: `R$ ${produto.receita.toFixed(2)}`,
            participacao: `${(
              (produto.quantidadeVendida / dashboardData.vendas.totalPedidos) *
              100
            ).toFixed(1)}%`,
          })
        );

        // Usar CSV como fallback
        const csvContent = [
          "Posição,Nome,Quantidade Vendida,Receita,Participação %",
          ...produtosData.map(
            (p) =>
              `${p.posicao},${p.nome},${p.quantidadeVendida},${p.receitaFormatada},${p.participacao}`
          ),
        ].join("\\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `produtos_${options.title.toLowerCase().replace(/\\s+/g, "_")}.csv`
        );
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    [downloadExcelFile, addMetadataSheet]
  );
  const exportHorariosData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const workbook = XLSX.utils.book_new();

      const horariosData = [
        ["⏰ ANÁLISE DE HORÁRIOS", "", "", "", ""],
        [
          "Horário",
          "Total de Pedidos",
          "Percentual",
          "Receita Estimada",
          "Classificação",
        ],
      ];

      dashboardData.crescimento.horariosPico.forEach((horario) => {
        let classificacao = "Normal";
        if (horario.percentualTotal > 8) classificacao = "Pico Intenso";
        else if (horario.percentualTotal > 5) classificacao = "Pico Moderado";
        else if (horario.percentualTotal < 2) classificacao = "Baixo";

        horariosData.push([
          `${horario.hora}:00`,
          horario.totalPedidos.toString(),
          `${horario.percentualTotal.toFixed(1)}%`,
          `R$ ${(
            horario.totalPedidos * dashboardData.vendas.ticketMedio
          ).toFixed(2)}`,
          classificacao,
        ]);
      });

      const horariosSheet = XLSX.utils.aoa_to_sheet(horariosData);
      XLSX.utils.book_append_sheet(
        workbook,
        horariosSheet,
        "Análise de Horários"
      );

      addMetadataSheet(workbook, options.title);
      downloadExcelFile(
        workbook,
        `horarios_${options.title.toLowerCase().replace(/\\s+/g, "_")}`
      );
    },
    [downloadExcelFile, addMetadataSheet]
  );
  const exportPerformanceData = useCallback(
    (dashboardData: DashboardData, options: ExportOptions) => {
      const workbook = XLSX.utils.book_new();

      const performanceData = [
        ["📈 MÉTRICAS DE PERFORMANCE", "", "", "", ""],
        ["Métrica", "Valor Atual", "Meta/Benchmark", "Status", "Observações"],
      ];

      performanceData.push(
        [
          "Receita Total",
          `R$ ${dashboardData.vendas.receitaTotal.toLocaleString("pt-BR")}`,
          "Variável",
          "Info",
          "Receita do período",
        ],
        [
          "Total de Pedidos",
          dashboardData.vendas.totalPedidos.toString(),
          "> 100/mês",
          dashboardData.vendas.totalPedidos > 100 ? "Bom" : "Atenção",
          dashboardData.vendas.totalPedidos > 100
            ? "Volume adequado"
            : "Volume baixo",
        ],
        [
          "Ticket Médio",
          `R$ ${dashboardData.vendas.ticketMedio.toFixed(2)}`,
          "R$ 25,00+",
          dashboardData.vendas.ticketMedio >= 25 ? "Excelente" : "Regular",
          dashboardData.vendas.ticketMedio >= 25
            ? "Ticket alto"
            : "Oportunidade de upsell",
        ],
        [
          "Taxa de Conversão",
          `${dashboardData.vendas.taxaConversao.toFixed(1)}%`,
          "> 3%",
          dashboardData.vendas.taxaConversao > 3 ? "Bom" : "Atenção",
          dashboardData.vendas.taxaConversao > 3
            ? "Conversão adequada"
            : "Melhorar funil",
        ],
        [
          "Pedidos em Atraso",
          dashboardData.performance.pedidosEmAtraso.toString(),
          "0",
          dashboardData.performance.pedidosEmAtraso === 0
            ? "Excelente"
            : "Atenção",
          "Controle de prazos operacionais",
        ],
        [
          "Tempo Médio Finalização",
          `${dashboardData.performance.tempoMedioFinalizacao} min`,
          "≤ 30 min",
          dashboardData.performance.tempoMedioFinalizacao <= 30
            ? "Bom"
            : "Atenção",
          "Eficiência operacional",
        ],
        [
          "Taxa Confirmação Automática",
          `${dashboardData.performance.taxaConfirmacaoAutomatica.toFixed(1)}%`,
          "≥ 80%",
          dashboardData.performance.taxaConfirmacaoAutomatica >= 80
            ? "Excelente"
            : "Regular",
          "Automação de processos",
        ]
      );

      if (dashboardData.vendas.crescimentoReceita !== undefined) {
        performanceData.push([
          "Crescimento Receita",
          `${dashboardData.vendas.crescimentoReceita.toFixed(1)}%`,
          "> 0%",
          dashboardData.vendas.crescimentoReceita > 0 ? "Positivo" : "Negativo",
          dashboardData.vendas.crescimentoReceita > 0
            ? "Tendência de crescimento"
            : "Revisar estratégia",
        ]);
      }

      const performanceSheet = XLSX.utils.aoa_to_sheet(performanceData);
      XLSX.utils.book_append_sheet(
        workbook,
        performanceSheet,
        "Métricas de Performance"
      );

      addMetadataSheet(workbook, options.title);
      downloadExcelFile(
        workbook,
        `performance_${options.title.toLowerCase().replace(/\\s+/g, "_")}`
      );
    },
    [downloadExcelFile, addMetadataSheet]
  );
  const exportAllData = useCallback(
    (dashboardData: DashboardData) => {
      // Exportar dados completos com todas as métricas
      const summaryData = [
        {
          categoria: "Vendas",
          receita_total: dashboardData.vendas.receitaTotal,
          total_pedidos: dashboardData.vendas.totalPedidos,
          ticket_medio: dashboardData.vendas.ticketMedio,
          taxa_conversao: dashboardData.vendas.taxaConversao,
          crescimento_receita: dashboardData.vendas.crescimentoReceita || 0,
        },
        {
          categoria: "Performance",
          pedidos_atraso: dashboardData.performance.pedidosEmAtraso,
          tempo_medio_finalizacao:
            dashboardData.performance.tempoMedioFinalizacao,
          taxa_confirmacao_auto:
            dashboardData.performance.taxaConfirmacaoAutomatica,
          pedidos_hora_pico: dashboardData.performance.pedidosPorHoraPico,
        },
      ];

      exportToCSV(
        summaryData,
        `dashboard_completo_${new Date().toISOString().split("T")[0]}`
      );
    },
    [exportToCSV]
  );

  // Função SUPER COMPLETA - Exporta TODOS os dados do dashboard
  const exportAllDataCompleto = useCallback(
    async (dashboardData: DashboardData) => {
      const workbook = XLSX.utils.book_new();

      try {
        // Buscar TODOS os produtos
        const todosProdutos = await ProdutoService.getProdutosByEmpresaAuth();
        console.log(
          `🔥 EXPORTAR TUDO: ${todosProdutos.length} produtos carregados`
        );

        const mapaProdutos = new Map<string, ProdutoResponseDto>();
        todosProdutos.forEach((produto) => {
          mapaProdutos.set(produto.id, produto);
        }); // 1. RESUMO EXECUTIVO COMPLETO
        const resumoData = [
          [
            "🏢 COOKOPS DASHBOARD - RELATÓRIO EXECUTIVO COMPLETO",
            "",
            "",
            "",
            "",
          ],
          ["📅 Período:", dashboardData.periodo, "", "", ""],
          [
            "🕐 Última Atualização:",
            dashboardData.ultimaAtualizacao,
            "",
            "",
            "",
          ],
          ["", "", "", "", ""],
          ["📊 MÉTRICAS PRINCIPAIS DE VENDAS", "", "", "", ""],
          ["Métrica", "Valor", "Status", "Variação", "Observações"],
          [
            "Receita Total",
            `R$ ${dashboardData.vendas.receitaTotal.toLocaleString("pt-BR")}`,
            "Principal",
            dashboardData.vendas.crescimentoReceita
              ? `${dashboardData.vendas.crescimentoReceita.toFixed(1)}%`
              : "N/A",
            "Faturamento total do período",
          ],
          [
            "Total de Pedidos",
            dashboardData.vendas.totalPedidos.toString(),
            dashboardData.vendas.totalPedidos > 100
              ? "Excelente"
              : dashboardData.vendas.totalPedidos > 50
              ? "Bom"
              : "Regular",
            "",
            "Volume de vendas realizadas",
          ],
          [
            "Ticket Médio",
            `R$ ${dashboardData.vendas.ticketMedio.toFixed(2)}`,
            dashboardData.vendas.ticketMedio >= 30
              ? "Excelente"
              : dashboardData.vendas.ticketMedio >= 20
              ? "Bom"
              : "Regular",
            dashboardData.vendas.variacaoTicketMedio
              ? `${dashboardData.vendas.variacaoTicketMedio.toFixed(1)}%`
              : "N/A",
            "Valor médio por pedido",
          ],
          [
            "Taxa de Conversão",
            `${dashboardData.vendas.taxaConversao.toFixed(1)}%`,
            dashboardData.vendas.taxaConversao > 5
              ? "Excelente"
              : dashboardData.vendas.taxaConversao > 3
              ? "Bom"
              : "Regular",
            "",
            "Efetividade das vendas",
          ],
          ["", "", "", "", ""],
          ["🚀 PERFORMANCE OPERACIONAL", "", "", "", ""],
          [
            "Tempo Médio Finalização",
            `${dashboardData.performance.tempoMedioFinalizacao} min`,
            dashboardData.performance.tempoMedioFinalizacao <= 30
              ? "Excelente"
              : dashboardData.performance.tempoMedioFinalizacao <= 45
              ? "Bom"
              : "Atenção",
            "",
            "Eficiência operacional",
          ],
          [
            "Pedidos em Atraso",
            dashboardData.performance.pedidosEmAtraso.toString(),
            dashboardData.performance.pedidosEmAtraso === 0
              ? "Excelente"
              : dashboardData.performance.pedidosEmAtraso <= 5
              ? "Bom"
              : "Atenção",
            "",
            "Controle de prazos",
          ],
          [
            "Taxa Confirmação Automática",
            `${dashboardData.performance.taxaConfirmacaoAutomatica.toFixed(
              1
            )}%`,
            dashboardData.performance.taxaConfirmacaoAutomatica > 80
              ? "Excelente"
              : dashboardData.performance.taxaConfirmacaoAutomatica > 60
              ? "Bom"
              : "Regular",
            "",
            "Automação de processos",
          ],
          ["", "", "", "", ""],
          ["💰 ANÁLISE FINANCEIRA", "", "", "", ""],
          [
            "Receita Líquida",
            `R$ ${dashboardData.financeiro.receitaLiquida.toLocaleString(
              "pt-BR"
            )}`,
            "Principal",
            "",
            "Após descontos e taxas",
          ],
          [
            "Taxa Entrega Média",
            `R$ ${dashboardData.financeiro.taxaEntregaMedia.toFixed(2)}`,
            "Info",
            "",
            "Valor médio cobrado",
          ],
          [
            "Desconto Médio",
            `R$ ${dashboardData.financeiro.descontoMedio.toFixed(2)}`,
            "Info",
            "",
            "Desconto médio aplicado",
          ],
          [
            "% Receita Entrega",
            `${dashboardData.financeiro.percentualReceitaEntrega.toFixed(1)}%`,
            "Info",
            "",
            "Participação das entregas",
          ],
        ];

        const resumoSheet = XLSX.utils.aoa_to_sheet(resumoData);
        XLSX.utils.book_append_sheet(
          workbook,
          resumoSheet,
          "📊 Resumo Executivo"
        );

        // 2. ANÁLISE TEMPORAL E TENDÊNCIAS COMPLETA
        const tendenciaData = [
          ["⏰ ANÁLISE TEMPORAL E TENDÊNCIAS", "", "", "", ""],
          ["", "", "", "", ""],
          ["📈 CRESCIMENTO SEMANAL", "", "", "", ""],
          [
            "Semana",
            "Total Pedidos",
            "Crescimento %",
            "Tendência",
            "Receita Estimada",
          ],
        ];

        if (dashboardData.crescimento?.crescimentoSemanal) {
          dashboardData.crescimento.crescimentoSemanal.forEach((item) => {
            let tendencia = "Estável";
            if (item.crescimentoPercentual > 20)
              tendencia = "Crescimento Acelerado";
            else if (item.crescimentoPercentual > 10)
              tendencia = "Forte Crescimento";
            else if (item.crescimentoPercentual > 0) tendencia = "Crescimento";
            else if (item.crescimentoPercentual < -20)
              tendencia = "Queda Acentuada";
            else if (item.crescimentoPercentual < -10)
              tendencia = "Forte Queda";
            else if (item.crescimentoPercentual < 0) tendencia = "Queda";

            const receitaEstimada =
              item.totalPedidos * dashboardData.vendas.ticketMedio;

            tendenciaData.push([
              item.semana,
              item.totalPedidos.toString(),
              `${item.crescimentoPercentual.toFixed(1)}%`,
              tendencia,
              `R$ ${receitaEstimada.toFixed(2)}`,
            ]);
          });
        }

        // Adicionar crescimento mensal se disponível
        if (dashboardData.crescimento?.crescimentoMensal) {
          tendenciaData.push(
            ["", "", "", "", ""],
            ["📅 CRESCIMENTO MENSAL", "", "", "", ""],
            [
              "Mês",
              "Total Pedidos",
              "Crescimento %",
              "Tendência",
              "Receita Estimada",
            ]
          );

          dashboardData.crescimento.crescimentoMensal.forEach((item) => {
            let tendencia = "Estável";
            if (item.crescimentoPercentual > 15)
              tendencia = "Forte Crescimento";
            else if (item.crescimentoPercentual > 5) tendencia = "Crescimento";
            else if (item.crescimentoPercentual < -15)
              tendencia = "Forte Queda";
            else if (item.crescimentoPercentual < -5) tendencia = "Queda";

            const receitaEstimada =
              item.totalPedidos * dashboardData.vendas.ticketMedio;

            tendenciaData.push([
              item.mes,
              item.totalPedidos.toString(),
              `${item.crescimentoPercentual.toFixed(1)}%`,
              tendencia,
              `R$ ${receitaEstimada.toFixed(2)}`,
            ]);
          });
        }

        // Adicionar crescimento diário se disponível
        if (dashboardData.crescimento?.crescimentoDiario) {
          tendenciaData.push(
            ["", "", "", "", ""],
            ["📆 CRESCIMENTO DIÁRIO (Últimos dias)", "", "", "", ""],
            [
              "Dia",
              "Total Pedidos",
              "Crescimento %",
              "Tendência",
              "Receita Estimada",
            ]
          );

          dashboardData.crescimento.crescimentoDiario.forEach((item) => {
            let tendencia = "Normal";
            if (item.crescimentoPercentual > 50) tendencia = "Pico Excepcional";
            else if (item.crescimentoPercentual > 20) tendencia = "Muito Alto";
            else if (item.crescimentoPercentual > 0) tendencia = "Positivo";
            else if (item.crescimentoPercentual < -50)
              tendencia = "Muito Baixo";
            else if (item.crescimentoPercentual < 0) tendencia = "Negativo";

            const receitaEstimada =
              item.totalPedidos * dashboardData.vendas.ticketMedio;

            tendenciaData.push([
              item.dia,
              item.totalPedidos.toString(),
              `${item.crescimentoPercentual.toFixed(1)}%`,
              tendencia,
              `R$ ${receitaEstimada.toFixed(2)}`,
            ]);
          });
        }

        const tendenciaSheet = XLSX.utils.aoa_to_sheet(tendenciaData);
        XLSX.utils.book_append_sheet(
          workbook,
          tendenciaSheet,
          "⏰ Tendências Completo"
        );

        // 3. TODOS OS PRODUTOS - ANÁLISE COMPLETA
        const produtosCompletos = [
          [
            "🛍️ ANÁLISE COMPLETA DE TODOS OS PRODUTOS",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          ["", "", "", "", "", "", "", ""],
          [
            "📈 PRODUTOS MAIS POPULARES (Dashboard)",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            "Posição",
            "Nome",
            "Qtd Vendida",
            "Receita",
            "Participação %",
            "Status",
            "Preço Base",
            "Performance",
          ],
        ];

        dashboardData.produtos.itensMaisPopulares.forEach((produto, index) => {
          const produtoInfo = mapaProdutos.get(produto.produtoId);
          const status = produtoInfo?.ativo ? "Ativo" : "Inativo";
          const precoBase = produtoInfo?.precoBase || 0;
          let performance = "Regular";
          if (produto.quantidadeVendida >= 30) performance = "Excelente";
          else if (produto.quantidadeVendida >= 15) performance = "Muito Bom";
          else if (produto.quantidadeVendida >= 5) performance = "Bom";

          produtosCompletos.push([
            (index + 1).toString(),
            produto.nome,
            produto.quantidadeVendida.toString(),
            `R$ ${produto.receita.toFixed(2)}`,
            `${(
              (produto.quantidadeVendida / dashboardData.vendas.totalPedidos) *
              100
            ).toFixed(1)}%`,
            status,
            `R$ ${precoBase.toFixed(2)}`,
            performance,
          ]);
        });

        // TODOS OS PRODUTOS DA EMPRESA
        produtosCompletos.push(
          ["", "", "", "", "", "", "", ""],
          ["📋 TODOS OS PRODUTOS DA EMPRESA", "", "", "", "", "", "", ""],
          [
            "Nome",
            "Preço Base",
            "Status",
            "Qtd Vendida",
            "Receita",
            "Performance",
            "Observações",
            "Ação Recomendada",
          ]
        );

        const produtosVendidos = new Map<
          string,
          { quantidade: number; receita: number }
        >();
        [
          ...dashboardData.produtos.itensMaisPopulares,
          ...(dashboardData.produtos.receitaPorProduto || []),
          ...(dashboardData.produtos.produtosBaixoDesempenho || []),
        ].forEach((produto) => {
          if (!produtosVendidos.has(produto.produtoId)) {
            produtosVendidos.set(produto.produtoId, {
              quantidade: produto.quantidadeVendida,
              receita: produto.receita,
            });
          }
        });

        todosProdutos.forEach((produto) => {
          const vendas = produtosVendidos.get(produto.id);
          const quantidade = vendas?.quantidade || 0;
          const receita = vendas?.receita || 0;

          let performance = "Sem vendas";
          let observacoes = "Não vendido no período";
          let acaoRecomendada = "Analisar demanda";

          if (quantidade > 0) {
            if (quantidade >= 30) {
              performance = "Excelente";
              observacoes = "Alto volume, produto estrela";
              acaoRecomendada = "Manter estratégia atual";
            } else if (quantidade >= 15) {
              performance = "Muito Bom";
              observacoes = "Bom volume de vendas";
              acaoRecomendada = "Potencializar marketing";
            } else if (quantidade >= 5) {
              performance = "Bom";
              observacoes = "Volume moderado";
              acaoRecomendada = "Considerar promoções";
            } else {
              performance = "Baixo";
              observacoes = "Poucas vendas";
              acaoRecomendada = "Revisar preço/posicionamento";
            }
          } else if (!produto.ativo) {
            observacoes = "Produto desativado";
            acaoRecomendada = "Avaliar reativação";
          } else {
            acaoRecomendada = "Investigar causa/considerar remoção";
          }

          produtosCompletos.push([
            produto.nome,
            `R$ ${produto.precoBase.toFixed(2)}`,
            produto.ativo ? "Ativo" : "Inativo",
            quantidade.toString(),
            receita > 0 ? `R$ ${receita.toFixed(2)}` : "R$ 0,00",
            performance,
            observacoes,
            acaoRecomendada,
          ]);
        });
        const produtosSheet = XLSX.utils.aoa_to_sheet(produtosCompletos);
        XLSX.utils.book_append_sheet(
          workbook,
          produtosSheet,
          "🛍️ Produtos Completo"
        );

        // 4. ANÁLISE OPERACIONAL COMPLETA
        const operacionalData = [
          ["🔄 ANÁLISE OPERACIONAL COMPLETA", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["📊 PEDIDOS POR STATUS", "", "", "", "", ""],
          [
            "Status",
            "Total Pedidos",
            "Percentual",
            "Análise",
            "Impacto",
            "Ação Recomendada",
          ],
        ];

        dashboardData.operacional.pedidosPorStatus.forEach((status) => {
          let analise = "Normal";
          let impacto = "Baixo";
          let acaoRecomendada = "Monitorar";

          if (status.titulo.toLowerCase().includes("cancelado")) {
            if (status.percentualTotal > 15) {
              analise = "Taxa crítica de cancelamento";
              impacto = "Alto";
              acaoRecomendada = "Ação urgente - investigar causas";
            } else if (status.percentualTotal > 8) {
              analise = "Taxa elevada de cancelamento";
              impacto = "Médio";
              acaoRecomendada = "Revisar processo";
            }
          } else if (
            status.titulo.toLowerCase().includes("finalizado") ||
            status.titulo.toLowerCase().includes("entregue")
          ) {
            if (status.percentualTotal > 70) {
              analise = "Excelente taxa de sucesso";
              impacto = "Muito Positivo";
              acaoRecomendada = "Manter excelência";
            } else if (status.percentualTotal > 50) {
              analise = "Boa taxa de sucesso";
              impacto = "Positivo";
              acaoRecomendada = "Buscar melhorias";
            }
          }

          operacionalData.push([
            status.titulo,
            status.totalPedidos.toString(),
            `${status.percentualTotal.toFixed(1)}%`,
            analise,
            impacto,
            acaoRecomendada,
          ]);
        });

        operacionalData.push(
          ["", "", "", "", "", ""],
          ["💳 FORMAS DE PAGAMENTO DETALHADAS", "", "", "", "", ""],
          [
            "Forma Pagamento",
            "Total Pedidos",
            "Percentual",
            "Popularidade",
            "Eficiência",
            "Estratégia",
          ]
        );

        dashboardData.operacional.formasPagamentoPreferidas.forEach(
          (pagamento) => {
            let popularidade = "Baixa";
            let eficiencia = "Regular";
            let estrategia = "Monitorar";

            if (pagamento.percentualTotal > 40) {
              popularidade = "Muito Alta";
              estrategia = "Manter destaque";
            } else if (pagamento.percentualTotal > 25) {
              popularidade = "Alta";
              estrategia = "Incentivar uso";
            } else if (pagamento.percentualTotal > 15) {
              popularidade = "Média";
              estrategia = "Promover mais";
            } else {
              estrategia = "Avaliar viabilidade";
            }

            if (pagamento.nome.toLowerCase().includes("pix")) {
              eficiencia = "Muito Alta";
            } else if (pagamento.nome.toLowerCase().includes("débito")) {
              eficiencia = "Alta";
            } else if (pagamento.nome.toLowerCase().includes("crédito")) {
              eficiencia = "Média";
            } else if (pagamento.nome.toLowerCase().includes("dinheiro")) {
              eficiencia = "Baixa";
            }

            operacionalData.push([
              pagamento.nome,
              pagamento.totalPedidos.toString(),
              `${pagamento.percentualTotal.toFixed(1)}%`,
              popularidade,
              eficiencia,
              estrategia,
            ]);
          }
        );

        const operacionalSheet = XLSX.utils.aoa_to_sheet(operacionalData);
        XLSX.utils.book_append_sheet(
          workbook,
          operacionalSheet,
          "🔄 Operacional COMPLETO"
        );

        // 4. COMPORTAMENTO E PADRÕES MEGA DETALHADO
        const comportamentoData = [
          ["📈 ANÁLISE DE COMPORTAMENTO COMPLETA", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["⏰ HORÁRIOS DE PICO DETALHADO", "", "", "", "", ""],
          [
            "Horário",
            "Pedidos",
            "Percentual",
            "Receita Estimada",
            "Classificação",
            "Estratégia",
          ],
        ];

        dashboardData.crescimento.horariosPico.forEach((horario) => {
          let classificacao = "Normal";
          let estrategia = "Monitorar";

          if (horario.percentualTotal > 12) {
            classificacao = "Pico Extremo";
            estrategia = "Máxima capacidade operacional";
          } else if (horario.percentualTotal > 8) {
            classificacao = "Pico Intenso";
            estrategia = "Reforçar equipe obrigatório";
          } else if (horario.percentualTotal > 5) {
            classificacao = "Pico Moderado";
            estrategia = "Atenção operacional requerida";
          } else if (horario.percentualTotal < 2) {
            classificacao = "Baixo";
            estrategia = "Oportunidade - promover horário";
          }

          const receitaEstimada =
            horario.totalPedidos * dashboardData.vendas.ticketMedio;

          comportamentoData.push([
            `${horario.hora.toString().padStart(2, "0")}:00`,
            horario.totalPedidos.toString(),
            `${horario.percentualTotal.toFixed(1)}%`,
            `R$ ${receitaEstimada.toFixed(2)}`,
            classificacao,
            estrategia,
          ]);
        });

        comportamentoData.push(
          ["", "", "", "", "", ""],
          ["📅 VENDAS POR DIA DA SEMANA DETALHADO", "", "", "", "", ""],
          [
            "Dia",
            "Pedidos",
            "Receita",
            "Percentual",
            "Performance",
            "Oportunidade",
          ]
        );

        dashboardData.crescimento.vendasPorDiaSemana.forEach((dia) => {
          let performance = "Regular";
          let oportunidade = "Manter padrão";

          if (dia.percentualTotal > 20) {
            performance = "Excelente";
            oportunidade = "Dia forte - maximizar tudo";
          } else if (dia.percentualTotal > 15) {
            performance = "Muito Bom";
            oportunidade = "Alto potencial exploração";
          } else if (dia.percentualTotal > 12) {
            performance = "Bom";
            oportunidade = "Crescimento viável";
          } else if (dia.percentualTotal < 8) {
            performance = "Baixo";
            oportunidade = "Promover intensivamente";
          }

          comportamentoData.push([
            dia.diaSemana,
            dia.totalPedidos.toString(),
            `R$ ${dia.receitaTotal.toFixed(2)}`,
            `${dia.percentualTotal.toFixed(1)}%`,
            performance,
            oportunidade,
          ]);
        });

        comportamentoData.push(
          ["", "", "", "", "", ""],
          ["🎯 FONTES E CANAIS DETALHADO", "", "", "", "", ""],
          [
            "Fonte",
            "Pedidos",
            "Valor Médio",
            "Percentual",
            "Eficiência",
            "Estratégia",
          ]
        );

        dashboardData.crescimento.performancePorFonte.forEach((fonte) => {
          let eficiencia = "Regular";
          let estrategia = "Manter";

          if (fonte.valorMedio > dashboardData.vendas.ticketMedio * 1.3) {
            eficiencia = "Valor Muito Alto";
            estrategia = "Investir pesadamente";
          } else if (
            fonte.valorMedio >
            dashboardData.vendas.ticketMedio * 1.1
          ) {
            eficiencia = "Alto Valor";
            estrategia = "Expandir significativamente";
          } else if (fonte.percentualTotal > 30) {
            eficiencia = "Alto Volume";
            estrategia = "Maximizar alcance";
          } else if (fonte.percentualTotal > 15) {
            eficiencia = "Bom";
            estrategia = "Otimizar performance";
          } else if (fonte.percentualTotal < 5) {
            eficiencia = "Baixo ROI";
            estrategia = "Revisar ou eliminar";
          }

          comportamentoData.push([
            fonte.nome,
            fonte.totalPedidos.toString(),
            `R$ ${fonte.valorMedio.toFixed(2)}`,
            `${fonte.percentualTotal.toFixed(1)}%`,
            eficiencia,
            estrategia,
          ]);
        });

        const comportamentoSheet = XLSX.utils.aoa_to_sheet(comportamentoData);
        XLSX.utils.book_append_sheet(
          workbook,
          comportamentoSheet,
          "📈 Comportamento TOTAL"
        ); // 5. ANÁLISE FINANCEIRA COMPLETA
        const financeiroData = [
          ["💰 ANÁLISE FINANCEIRA COMPLETA", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["📊 MÉTRICAS FINANCEIRAS PRINCIPAIS", "", "", "", "", ""],
          [
            "Métrica",
            "Valor",
            "Impacto %",
            "Status",
            "Tendência",
            "Ação Recomendada",
          ],
        ];

        const impactoReceita =
          (dashboardData.financeiro.receitaLiquida /
            dashboardData.vendas.receitaTotal) *
          100;
        const impactoEntrega =
          (dashboardData.financeiro.valorTotalTaxasEntrega /
            dashboardData.vendas.receitaTotal) *
          100;
        const impactoDesconto =
          (dashboardData.financeiro.valorTotalDescontos /
            dashboardData.vendas.receitaTotal) *
          100;

        financeiroData.push(
          [
            "Receita Líquida",
            `R$ ${dashboardData.financeiro.receitaLiquida.toLocaleString(
              "pt-BR"
            )}`,
            `${impactoReceita.toFixed(1)}%`,
            "Principal",
            "Monitorar",
            "Maximizar margem",
          ],
          [
            "Taxa Entrega Média",
            `R$ ${dashboardData.financeiro.taxaEntregaMedia.toFixed(2)}`,
            `${impactoEntrega.toFixed(1)}%`,
            impactoEntrega > 10 ? "Alto" : "Normal",
            "Estável",
            impactoEntrega > 15 ? "Revisar valor" : "Manter",
          ],
          [
            "Desconto Médio",
            `R$ ${dashboardData.financeiro.descontoMedio.toFixed(2)}`,
            `${impactoDesconto.toFixed(1)}%`,
            impactoDesconto > 15 ? "Alto" : "Normal",
            "Controlar",
            impactoDesconto > 20
              ? "Reduzir descontos"
              : "Usar estrategicamente",
          ]
        );

        financeiroData.push(
          ["", "", "", "", "", ""],
          ["🚚 ANÁLISE DETALHADA DE ENTREGAS", "", "", "", "", ""],
          [
            "Métrica",
            "Valor",
            "Volume",
            "Eficiência",
            "Cobertura",
            "Observação",
          ]
        );

        financeiroData.push(
          [
            "Valor Médio Taxa",
            `R$ ${dashboardData.financeiro.valorMedioTaxaEntrega.toFixed(2)}`,
            dashboardData.financeiro.numeroPedidosEntrega.toString(),
            "Info",
            `${dashboardData.financeiro.porcentagemPedidosEntrega.toFixed(1)}%`,
            "Taxa por entrega",
          ],
          [
            "Entregas Cobradas",
            dashboardData.financeiro.numeroPedidosEntregaCobradas.toString(),
            `${dashboardData.financeiro.porcentagemPedidosEntregaCobradas.toFixed(
              1
            )}%`,
            dashboardData.financeiro.porcentagemPedidosEntregaCobradas > 80
              ? "Alta"
              : "Média",
            "Cobrança",
            "Taxa aplicada",
          ],
          [
            "Valor Total Taxas",
            `R$ ${dashboardData.financeiro.valorTotalTaxasEntrega.toFixed(2)}`,
            "Total",
            "Receita",
            "Adicional",
            "Faturamento entregas",
          ]
        );

        const financeiroSheet = XLSX.utils.aoa_to_sheet(financeiroData);
        XLSX.utils.book_append_sheet(
          workbook,
          financeiroSheet,
          "💰 Financeiro COMPLETO"
        ); // 6. ANÁLISE TEMPORAL COMPLETA
        const temporalData = [
          ["⏰ ANÁLISE TEMPORAL COMPLETA", "", "", "", ""],
          ["", "", "", "", ""],
          ["📈 CRESCIMENTO SEMANAL", "", "", "", ""],
          [
            "Semana",
            "Total Pedidos",
            "Crescimento %",
            "Tendência",
            "Receita Estimada",
          ],
        ];

        if (dashboardData.crescimento?.crescimentoSemanal) {
          dashboardData.crescimento.crescimentoSemanal.forEach((item) => {
            let tendencia = "Estável";
            if (item.crescimentoPercentual > 20)
              tendencia = "Crescimento Acelerado";
            else if (item.crescimentoPercentual > 10)
              tendencia = "Forte Crescimento";
            else if (item.crescimentoPercentual > 0) tendencia = "Crescimento";
            else if (item.crescimentoPercentual < -20)
              tendencia = "Queda Acentuada";
            else if (item.crescimentoPercentual < -10)
              tendencia = "Forte Queda";
            else if (item.crescimentoPercentual < 0) tendencia = "Queda";

            const receitaEstimada =
              item.totalPedidos * dashboardData.vendas.ticketMedio;

            temporalData.push([
              item.semana,
              item.totalPedidos.toString(),
              `${item.crescimentoPercentual.toFixed(1)}%`,
              tendencia,
              `R$ ${receitaEstimada.toFixed(2)}`,
            ]);
          });
        }

        const temporalSheet = XLSX.utils.aoa_to_sheet(temporalData);
        XLSX.utils.book_append_sheet(
          workbook,
          temporalSheet,
          "⏰ Temporal COMPLETO"
        );

        // 7. METADADOS
        const metadataData = [
          ["ℹ️ INFORMAÇÕES DO RELATÓRIO ULTRA COMPLETO", "", ""],
          ["", "", ""],
          ["Título", "CookOps Dashboard - RELATÓRIO EXECUTIVO COMPLETO", ""],
          ["Data de Geração", new Date().toLocaleString("pt-BR"), ""],
          ["Sistema", "CookOps Dashboard", ""],
          ["Formato", "Excel (.xlsx)", ""],
          ["Total de Produtos Analisados", todosProdutos.length.toString(), ""],
          ["", "", ""],
          ["⚠️ OBSERVAÇÕES", "", ""],
          ["• Este é o relatório MAIS COMPLETO do sistema", "", ""],
          ["• Inclui TODOS os produtos da empresa", "", ""],
          ["• Análises automáticas e recomendações", "", ""],
          ["• Dados em tempo real do período selecionado", "", ""],
        ];

        const metadataSheet = XLSX.utils.aoa_to_sheet(metadataData);
        XLSX.utils.book_append_sheet(workbook, metadataSheet, "ℹ️ Metadados"); // Download do arquivo COMPLETO
        XLSX.writeFile(
          workbook,
          `cookops_dashboard_completo_todos_dados_${
            new Date().toISOString().split("T")[0]
          }.xlsx`
        );

        console.log(
          "🎉 SUCESSO: Relatório COMPLETO exportado com TODOS os dados!"
        );
      } catch (error) {
        console.error("❌ Erro ao gerar relatório completo:", error);

        // Fallback: versão simples
        const dadosSimples = [
          ["❌ ERRO - Relatório Simplificado", "", ""],
          ["", "", ""],
          [
            "Receita Total",
            `R$ ${dashboardData.vendas.receitaTotal.toLocaleString("pt-BR")}`,
            "",
          ],
          ["Total Pedidos", dashboardData.vendas.totalPedidos.toString(), ""],
          [
            "Ticket Médio",
            `R$ ${dashboardData.vendas.ticketMedio.toFixed(2)}`,
            "",
          ],
          ["", "", ""],
          ["⚠️ ERRO", "Não foi possível buscar todos os produtos", ""],
        ];

        const simpleSheet = XLSX.utils.aoa_to_sheet(dadosSimples);
        XLSX.utils.book_append_sheet(workbook, simpleSheet, "Dados Básicos");

        XLSX.writeFile(
          workbook,
          `cookops_dashboard_basico_${
            new Date().toISOString().split("T")[0]
          }.xlsx`
        );
      }
    },
    []
  );

  return {
    exportToCSV,
    exportToPNG,
    exportVendasData,
    exportProdutosData,
    exportHorariosData,
    exportPerformanceData,
    exportAllData,
    exportAllDataCompleto,
  };
}
