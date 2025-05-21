// EMPRESA E USUÁRIOS

Table Empresa {
  id String [pk]
  nome String [not null]
  cnpj String
  email String
  telefone String
  planoAtualId String
  criadaEm DateTime [default: `now()`]

  
  plano Plano [not null]
  usuarios Usuario[]
  boards Board[]
}

Table Usuario {
  id String [pk]
  empresaId String [not null]
  nome String [not null]
  email String [not null, unique]
  senhaHash String [not null]
  role Role [not null, default: 'FUNCIONARIO']

  empresa Empresa [not null]
}

Enum Role {
  ADMIN
  FUNCIONARIO
}

Table Plano {
  id String [pk]
  nome String [not null]
  limitePedidosMes Int
  precoMensal Float
  ativo Boolean [default: true]
}

// STRIPE / PAGAMENTO DO PLANO

Table Assinatura {
  id String [pk]
  empresaId String [unique, not null]
  stripeCustomerId String [unique]
  stripeSubscriptionId String [unique]
  periodoFim DateTime
  planoId String [not null]

  empresa Empresa [not null]
  plano Plano [not null]
}

// BOARD (ESTILO TRELLO)

Table Board {
  id String [pk]
  empresaId String [not null]
  titulo String [not null]
  createdAt DateTime [default: `now()`]
  
  empresa Empresa [not null]
  listas PedidoStatus[]
}

Table PedidoStatus {
  id String [pk]
  boardId String [not null]
  titulo String [not null]       // Ex: "Backlog", "Preparo", "Pronto"
  ordem Int [not null]

  board Board [not null]
  pedidos Pedido[]
}

// PEDIDOS

Table Pedido {
  id String [pk]
  statusId String [not null]
  empresaId String [not null]
  codigo String [not null, unique]
  fonteId String [not null]
  pagamentoId String [not null]
  enderecoId String
  desconto Float [default: 0]
  taxaEntrega Float [default: 0]
  valorTotal Float [not null]
  observacao String
  criadoEm DateTime [default: `now()`]
  concluidoEm DateTime

  status PedidoStatus [not null]
  empresa Empresa [not null]
  itens PedidoItem[]
  pagamento FormaPagamento [not null]
  endereco Endereco
  fonte FontePedido [not null]
  logs LogMovimentacao[]
}

Table PedidoItem {
  id String [pk]
  pedidoId String [not null]
  produtoId String [not null]
  quantidade Int [not null]
  precoUnitario Float [not null]
  observacao String

  pedido Pedido [not null]
  produto Produto [not null]
}

Table Produto {
  id String [pk]
  empresaId String [not null]
  nome String [not null]
  descricao String
  precoBase Float [not null]
  ativo Boolean [default: true]

  empresa Empresa [not null]
}

// FORMAS DE PAGAMENTO, FONTE, ENDEREÇO

Table FormaPagamento {
  id String [pk]
  nome String [not null] // pix, cartão, etc
}

Table FontePedido {
  id String [pk]
  nome String [not null]     // iFood, WhatsApp, etc.
  tipoIntegracao String      // webhook, manual, etc.
}

Table Endereco {
  id String [pk]
  rua String [not null]
  numero String [not null]
  complemento String
  bairro String [not null]
  cidade String [not null]
  uf String [not null]
  cep String
  referencia String
}

// LOGS E HISTÓRICO

Table LogMovimentacao {
  id String [pk]
  pedidoId String [not null]
  deStatusId String
  paraStatusId String [not null]
  dataMovimentacao DateTime [default: `now()`]

  pedido Pedido [not null]
  deStatus PedidoStatus
  paraStatus PedidoStatus [not null]
}

