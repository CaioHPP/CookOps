# Dados de Mockup Gerados - Relatório

## 📊 Resumo dos Dados Gerados

✅ **Dados gerados com sucesso!**

- **Total de pedidos**: 17.770 pedidos
- **Total de itens**: 47.076 itens
- **Total de endereços**: 8.528 endereços
- **Total de logs**: 79.608 logs de movimentação

## 📅 Período Coberto

- **Início**: 12 de janeiro de 2025
- **Fim**: 12 de junho de 2025
- **Duração**: ~5 meses de dados históricos

## 🏢 Empresa

- **ID da Empresa**: `cmbrb3xvn0001h3pggsb50vpm`
- **Board ID**: `cmbrb3ypq0002h3pgrpjot1wu`

## 📈 Distribuição dos Dados

### Volume Diário

- **Dias de semana (Seg-Sex)**: 110-140 pedidos/dia
- **Sábados**: 100-140 pedidos/dia
- **Domingos**: 60-80 pedidos/dia

### Fontes de Pedido

- **Balcão**: 40% dos pedidos (takeout)
- **iFood**: 30% dos pedidos (entrega)
- **Uber Eats**: 20% dos pedidos (entrega)
- **WhatsApp**: 10% dos pedidos (entrega)

### Produtos Mais Vendidos

- **Marmitas**: Sempre pelo menos 1 por pedido
- **Bebidas**: Incluídas em 60% dos pedidos
- **Variação**: 1-4 itens por pedido

### Valores

- **Desconto**: 0-5.0 (máximo conforme solicitado)
- **Taxa de Entrega**: 0-7.0 (máximo conforme solicitado)
- **Valor Total**: Varia conforme itens, descontos e taxas

## 🔄 Fluxo de Status dos Pedidos

### Takeout (Balcão)

1. **Recebido** (Status ID: 4)
2. **Em preparo** (Status ID: 6)
3. **Pronto** (Status ID: 8)
4. **Finalizado** (Status ID: 7)

### Entrega (iFood, Uber Eats, WhatsApp)

1. **Recebido** (Status ID: 4)
2. **Em preparo** (Status ID: 6)
3. **Pronto** (Status ID: 8)
4. **Em entrega** (Status ID: 5)
5. **Finalizado** (Status ID: 7)

## ⏱️ Tempos de Preparo

- **Tempo médio**: 30 minutos
- **Variação**: 15-60 minutos
- **Distribuição**:
  - 15% dos pedidos: 15-19 min (rápido)
  - 70% dos pedidos: 20-40 min (normal)
  - 15% dos pedidos: 41-60 min (lento)

## 🏪 Endereços de Entrega

- **Total gerado**: 8.528 endereços únicos
- **Cidade**: São Paulo, SP
- **Bairros variados**: Centro, Vila Nova, Jardim América, etc.
- **Referências**: 40% dos endereços têm ponto de referência

## 💳 Formas de Pagamento Utilizadas

- Dinheiro (ID: 4)
- Cartão de Crédito (ID: 5)
- Cartão de Débito (ID: 6)
- PIX (ID: 7)
- Vale Refeição (ID: 8)
- Escambo (ID: 9)

## 🗂️ Tabelas Populadas

### `Pedido`

- Status: Todos finalizados (ID: 7)
- Confirmados: Sim
- Data de conclusão: Preenchida
- Códigos sequenciais: #001 até #17770

### `PedidoItem`

- Produtos variados do cardápio
- Quantidades realistas (1-3 por item)
- Observações ocasionais ("Sem cebola", "Pouco sal", etc.)

### `Endereco`

- Endereços realistas para São Paulo
- CEP, complemento e referência variados
- Todos os campos obrigatórios preenchidos

### `LogMovimentacao`

- Rastreamento completo de cada pedido
- Tempos realistas entre transições
- Movimentação sequencial correta

## 🔍 Queries Úteis para Verificação

```sql
-- Total de pedidos por mês
SELECT
  DATE_FORMAT(criadoEm, '%Y-%m') as mes,
  COUNT(*) as total_pedidos
FROM Pedido
WHERE empresaId = 'cmbrb3xvn0001h3pggsb50vpm'
GROUP BY DATE_FORMAT(criadoEm, '%Y-%m')
ORDER BY mes;

-- Pedidos por fonte
SELECT
  fp.nome as fonte,
  COUNT(*) as total_pedidos,
  ROUND(AVG(p.valorTotal), 2) as ticket_medio
FROM Pedido p
JOIN FontePedido fp ON p.fonteId = fp.id
WHERE p.empresaId = 'cmbrb3xvn0001h3pggsb50vpm'
GROUP BY fp.nome;

-- Produtos mais vendidos
SELECT
  pr.nome as produto,
  SUM(pi.quantidade) as total_vendido,
  COUNT(DISTINCT pi.pedidoId) as pedidos_contendo
FROM PedidoItem pi
JOIN Produto pr ON pi.produtoId = pr.id
JOIN Pedido p ON pi.pedidoId = p.id
WHERE p.empresaId = 'cmbrb3xvn0001h3pggsb50vpm'
GROUP BY pr.nome
ORDER BY total_vendido DESC;

-- Tempo médio de preparo por dia da semana
SELECT
  DAYNAME(p.criadoEm) as dia_semana,
  ROUND(AVG(TIMESTAMPDIFF(MINUTE, p.criadoEm, p.concluidoEm)), 2) as tempo_medio_minutos
FROM Pedido p
WHERE p.empresaId = 'cmbrb3xvn0001h3pggsb50vpm'
  AND p.concluidoEm IS NOT NULL
GROUP BY DAYOFWEEK(p.criadoEm), DAYNAME(p.criadoEm)
ORDER BY DAYOFWEEK(p.criadoEm);

-- Faturamento por mês
SELECT
  DATE_FORMAT(criadoEm, '%Y-%m') as mes,
  COUNT(*) as total_pedidos,
  ROUND(SUM(valorTotal), 2) as faturamento_total,
  ROUND(AVG(valorTotal), 2) as ticket_medio
FROM Pedido
WHERE empresaId = 'cmbrb3xvn0001h3pggsb50vpm'
GROUP BY DATE_FORMAT(criadoEm, '%Y-%m')
ORDER BY mes;
```

## ✅ Checklist de Validação

- [x] Pedidos criados com dados realistas
- [x] Fluxo de status respeitado (takeout vs entrega)
- [x] Tempos de preparo variáveis (~30min média)
- [x] Taxa de entrega ≤ 7.0
- [x] Desconto ≤ 5.0
- [x] Distribuição de pedidos por fonte (40/30/20/10%)
- [x] Produtos do cardápio utilizados
- [x] Endereços realistas para entrega
- [x] Logs de movimentação completos
- [x] Todos os pedidos finalizados
- [x] Códigos sequenciais corretos

Os dados estão prontos para uso e fornecem uma base histórica robusta para análises e relatórios da marmitaria! 🍱
