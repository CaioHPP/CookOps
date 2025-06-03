import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar planos
  const planoBasico = await prisma.plano.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Básico',
      limitePedidosMes: 100,
      precoMensal: 29.9,
      ativo: true,
    },
  });

  const planoPremium = await prisma.plano.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Premium',
      limitePedidosMes: 500,
      precoMensal: 79.9,
      ativo: true,
    },
  });

  console.log('✅ Planos criados');
  // Criar empresa de teste
  const empresa = await prisma.empresa.upsert({
    where: { id: 'empresa-teste-1' },
    update: {},
    create: {
      id: 'empresa-teste-1',
      nome: 'CookOps Restaurante Demo',
      cnpj: '12.345.678/0001-90',
      email: 'contato@cookops-demo.com',
      telefone: '(11) 99999-9999',
      planoAtualId: planoBasico.id,
    },
  });

  console.log('✅ Empresa criada');

  // Criar usuário admin de teste
  const senhaHash = await bcrypt.hash('admin123', 10);

  const usuarioAdmin = await prisma.usuario.upsert({
    where: { email: 'admin@cookops.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@cookops.com',
      senhaHash,
      role: Role.ADMIN,
      empresaId: empresa.id,
    },
  });

  // Criar usuário funcionário de teste
  const senhaFuncionarioHash = await bcrypt.hash('func123', 10);

  const usuarioFuncionario = await prisma.usuario.upsert({
    where: { email: 'funcionario@cookops.com' },
    update: {},
    create: {
      nome: 'Funcionário Teste',
      email: 'funcionario@cookops.com',
      senhaHash: senhaFuncionarioHash,
      role: Role.FUNCIONARIO,
      empresaId: empresa.id,
    },
  });

  console.log('✅ Usuários criados');

  // Criar board e status de pedidos
  const board = await prisma.board.upsert({
    where: { id: 'board-1' },
    update: {},
    create: {
      id: 'board-1',
      titulo: 'Fluxo de Pedidos',
      empresaId: empresa.id,
    },
  });
  const statusPendente = await prisma.pedidoStatus.upsert({
    where: { id: 1 },
    update: {},
    create: {
      titulo: 'Pendente',
      ordem: 1,
      boardId: board.id,
    },
  });

  const statusPreparo = await prisma.pedidoStatus.upsert({
    where: { id: 2 },
    update: {},
    create: {
      titulo: 'Em Preparo',
      ordem: 2,
      boardId: board.id,
    },
  });

  const statusPronto = await prisma.pedidoStatus.upsert({
    where: { id: 3 },
    update: {},
    create: {
      titulo: 'Pronto',
      ordem: 3,
      boardId: board.id,
    },
  });

  console.log('✅ Board e status criados');
  // Criar formas de pagamento
  const formaPagamentoDinheiro = await prisma.formaPagamento.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Dinheiro',
      empresaId: empresa.id,
    },
  });

  const formaPagamentoCartao = await prisma.formaPagamento.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Cartão',
      empresaId: empresa.id,
    },
  });

  const formaPagamentoPix = await prisma.formaPagamento.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: 'PIX',
      empresaId: empresa.id,
    },
  });

  console.log('✅ Formas de pagamento criadas');

  // Criar fonte de pedidos
  const fontePedidoBalcao = await prisma.fontePedido.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Balcão',
      tipoIntegracao: 'MANUAL',
    },
  });

  const fontePedidoIfood = await prisma.fontePedido.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'iFood',
      tipoIntegracao: 'API',
    },
  });

  console.log('✅ Fontes de pedido criadas');

  // Criar produtos de exemplo
  const produtoHamburguer = await prisma.produto.upsert({
    where: { id: 'produto-hamburguer' },
    update: {},
    create: {
      id: 'produto-hamburguer',
      nome: 'Hambúrguer Artesanal',
      descricao:
        'Hambúrguer com carne 180g, queijo, alface, tomate e molho especial',
      precoBase: 25.9,
      ativo: true,
      empresaId: empresa.id,
    },
  });

  const produtoBatata = await prisma.produto.upsert({
    where: { id: 'produto-batata' },
    update: {},
    create: {
      id: 'produto-batata',
      nome: 'Batata Frita',
      descricao: 'Porção de batata frita crocante',
      precoBase: 12.9,
      ativo: true,
      empresaId: empresa.id,
    },
  });

  const produtoRefrigerante = await prisma.produto.upsert({
    where: { id: 'produto-refrigerante' },
    update: {},
    create: {
      id: 'produto-refrigerante',
      nome: 'Refrigerante 350ml',
      descricao: 'Refrigerante gelado de diversos sabores',
      precoBase: 5.9,
      ativo: true,
      empresaId: empresa.id,
    },
  });

  console.log('✅ Produtos criados');

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📋 Dados criados:');
  console.log(`👤 Admin: admin@cookops.com / admin123`);
  console.log(`👨‍💼 Funcionário: funcionario@cookops.com / func123`);
  console.log(`🏢 Empresa: ${empresa.nome}`);
  console.log(
    `📦 Produtos: ${produtoHamburguer.nome}, ${produtoBatata.nome}, ${produtoRefrigerante.nome}`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
