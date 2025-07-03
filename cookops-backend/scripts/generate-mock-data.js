const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Configurações
const EMPRESA_ID = 'cmbrb3xvn0001h3pggsb50vpm';
const BOARD_ID = 'cmbrb3ypq0002h3pgrpjot1wu'; // ID do board baseado nos status fornecidos

// IDs dos produtos
const PRODUTOS = [
  { id: 'cmbrbcx0v0007h3pg3nm25uvj', nome: 'Marmita P', preco: 15 },
  { id: 'cmbrbdc3z0008h3pgcs3pgugb', nome: 'Marmita M', preco: 18 },
  { id: 'cmbrbdoxn0009h3pg8djmgloe', nome: 'Marmita G', preco: 23 },
  { id: 'cmbrbe2ej000ah3pgekh2amt5', nome: 'Marmita GG', preco: 35 },
  { id: 'cmbrbeh75000bh3pgfn39yqr5', nome: 'Marmita com Divisória', preco: 16 },
  {
    id: 'cmbrbf6wm000ch3pghqr8yzzg',
    nome: 'Coca-Cola Lata',
    preco: 5,
    tipo: 'bebida',
  },
  {
    id: 'cmbrbg78u000dh3pg8h4mcxc2',
    nome: 'Coca-Cola Zero Lata',
    preco: 5,
    tipo: 'bebida',
  },
  {
    id: 'cmbrbh5go000eh3pgrsjy1wnz',
    nome: 'Coca-Cola 2 Litros',
    preco: 13,
    tipo: 'bebida',
  },
  {
    id: 'cmbrbi4x6000fh3pgwssfml0g',
    nome: 'Coca-Cola Zero 2 Litros',
    preco: 13,
    tipo: 'bebida',
  },
  {
    id: 'cmcmnp1zz0000h3r82ad934q3',
    nome: 'Guaraná Antártica Lata',
    preco: 5,
    tipo: 'bebida',
  },
  {
    id: 'cmcmnp1zz0001h3r82ad934q4',
    nome: 'Guaraná Antártica 2 Litros',
    preco: 11,
    tipo: 'bebida',
  },
  {
    id: 'cmcmnp1zz0002h3r82ad934q5',
    nome: 'Guaraná Antártica Zero Lata',
    preco: 5,
    tipo: 'bebida',
  },
];

// IDs das formas de pagamento
const FORMAS_PAGAMENTO = [4, 5, 6, 7, 8, 9]; // Dinheiro, Cartão de Crédito, Cartão de Débito, PIX, Vale Refeição, Escambo

// IDs das fontes de pedido com pesos (balcão tem mais peso)
const FONTES_PEDIDO = [
  { id: 1, nome: 'Balcão', peso: 40, isEntrega: false }, // 40% dos pedidos
  { id: 2, nome: 'iFood', peso: 30, isEntrega: true }, // 30% dos pedidos
  { id: 3, nome: 'Uber Eats', peso: 20, isEntrega: true }, // 20% dos pedidos
  { id: 4, nome: 'WhatsApp', peso: 10, isEntrega: true }, // 10% dos pedidos
];

// IDs dos status do pedido (corretos conforme fornecido)
const STATUS_IDS = {
  RECEBIDO: 4,
  EM_PREPARO: 6,
  PRONTO: 8,
  EM_ENTREGA: 5,
  FINALIZADO: 7,
};

// Função para gerar um peso aleatório baseado nos pesos definidos
function getRandomFonte() {
  const totalPeso = FONTES_PEDIDO.reduce((acc, fonte) => acc + fonte.peso, 0);
  const random = Math.random() * totalPeso;
  let acumulado = 0;

  for (const fonte of FONTES_PEDIDO) {
    acumulado += fonte.peso;
    if (random <= acumulado) {
      return fonte;
    }
  }

  return FONTES_PEDIDO[0]; // fallback
}

// Função para gerar horário realista de funcionamento da marmitaria
function gerarHorarioAlmoco() {
  // Distribuição de probabilidade para horários de almoço
  const random = Math.random();

  if (random < 0.05) {
    // 5% - Início do funcionamento (11:00-11:30)
    return {
      hora: 11,
      minuto: faker.number.int({ min: 0, max: 29 }),
    };
  } else if (random < 0.25) {
    // 20% - Pré-pico (11:30-11:59)
    return {
      hora: 11,
      minuto: faker.number.int({ min: 30, max: 59 }),
    };
  } else if (random < 0.65) {
    // 40% - Pico principal (12:00-12:45)
    const hora = 12;
    const minuto = faker.number.int({ min: 0, max: 45 });
    return { hora, minuto };
  } else if (random < 0.85) {
    // 20% - Pós-pico (12:45-13:30)
    const random2 = Math.random();
    if (random2 < 0.6) {
      return {
        hora: 12,
        minuto: faker.number.int({ min: 46, max: 59 }),
      };
    } else {
      return {
        hora: 13,
        minuto: faker.number.int({ min: 0, max: 30 }),
      };
    }
  } else {
    // 15% - Final do expediente (13:30-14:30)
    return {
      hora: 13,
      minuto: faker.number.int({ min: 31, max: 59 }),
    };
  }
}

// Função para gerar data aleatória nos últimos 2 anos
function getRandomDateInLastTwoYears() {
  const now = new Date();
  const twoYearsAgo = new Date('2023-04-01'); // Começa em abril de 2023

  return faker.date.between({ from: twoYearsAgo, to: now });
}

// Função para gerar tempo de preparo variável (15-45 minutos, média 30)
function getRandomPreparationTime() {
  // 70% dos pedidos entre 20-40 min, 15% menos que 20, 15% mais que 40
  const random = Math.random();
  if (random < 0.15) {
    return faker.number.int({ min: 15, max: 19 }); // Rápido
  } else if (random < 0.85) {
    return faker.number.int({ min: 20, max: 40 }); // Normal
  } else {
    return faker.number.int({ min: 41, max: 60 }); // Lento
  }
}

// Função para gerar itens do pedido baseado na quantidade de marmitas necessárias
function generatePedidoItens(marmitasAlvo) {
  const itens = [];

  // Sempre incluir pelo menos uma marmita
  const marmitas = PRODUTOS.filter((p) => p.nome.includes('Marmita'));

  let marmitasRestantes = marmitasAlvo;

  // Adicionar marmitas até atingir o alvo
  while (marmitasRestantes > 0) {
    const marmitaEscolhida = faker.helpers.arrayElement(marmitas);
    const quantidade = Math.min(
      marmitasRestantes,
      faker.number.int({ min: 1, max: Math.min(3, marmitasRestantes) }),
    );

    // Verificar se já existe esta marmita no pedido
    const itemExistente = itens.find(
      (item) => item.produtoId === marmitaEscolhida.id,
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      itens.push({
        produtoId: marmitaEscolhida.id,
        quantidade: quantidade,
        precoUnitario: marmitaEscolhida.preco,
        observacao:
          Math.random() < 0.3
            ? faker.helpers.arrayElement([
                'Sem cebola',
                'Sem pimenta',
                'Pouco sal',
                'Bem passado',
                'Sem feijão',
                'Extra molho',
                'Sem salada',
              ])
            : null,
      });
    }

    marmitasRestantes -= quantidade;
  }

  // Adicionar bebidas em 60% dos casos
  if (Math.random() < 0.6) {
    const bebidas = PRODUTOS.filter((p) => p.tipo === 'bebida');
    const bebidaEscolhida = faker.helpers.arrayElement(bebidas);
    const quantidadeBebida = faker.number.int({ min: 1, max: 2 });

    itens.push({
      produtoId: bebidaEscolhida.id,
      quantidade: quantidadeBebida,
      precoUnitario: bebidaEscolhida.preco,
      observacao: null,
    });
  }

  return itens;
}

// Função para calcular valor total do pedido
function calculateTotalValue(itens, desconto, taxaEntrega) {
  const subtotal = itens.reduce(
    (acc, item) => acc + item.precoUnitario * item.quantidade,
    0,
  );
  return subtotal - desconto + taxaEntrega;
}

// Função para gerar endereço para entrega
function generateEnderecoEntrega() {
  return {
    rua: faker.location.streetAddress(),
    numero: faker.location.buildingNumber(),
    complemento:
      Math.random() < 0.3
        ? faker.helpers.arrayElement([
            'Apto 101',
            'Casa 2',
            'Bloco A',
            'Fundos',
          ])
        : null,
    bairro: faker.helpers.arrayElement([
      'Centro',
      'Vila Nova',
      'Jardim América',
      'Bela Vista',
      'São José',
      'Santa Maria',
      'Cidade Nova',
      'Vila Industrial',
      'Parque das Flores',
    ]),
    cidade: 'São Paulo',
    uf: 'SP',
    cep: faker.location.zipCode('########'),
    referencia:
      Math.random() < 0.4
        ? faker.helpers.arrayElement([
            'Próximo ao mercado',
            'Em frente à farmácia',
            'Ao lado da igreja',
            'Esquina com a padaria',
            'Casa azul',
          ])
        : null,
  };
}

// Função para gerar logs de movimentação
function generateLogMovimentacao(pedidoId, isEntrega, criadoEm, concluidoEm) {
  const logs = [];
  let currentTime = new Date(criadoEm);

  // Status inicial: Recebido
  logs.push({
    pedidoId: pedidoId,
    deStatusId: null,
    paraStatusId: STATUS_IDS.RECEBIDO,
    dataMovimentacao: new Date(currentTime),
  });

  // Em preparo (após 2-8 minutos do recebimento)
  currentTime = new Date(
    currentTime.getTime() + faker.number.int({ min: 2, max: 8 }) * 60000,
  );
  logs.push({
    pedidoId: pedidoId,
    deStatusId: STATUS_IDS.RECEBIDO,
    paraStatusId: STATUS_IDS.EM_PREPARO,
    dataMovimentacao: new Date(currentTime),
  });

  // Pronto (tempo principal de preparo)
  const tempoPreparoMinutos = getRandomPreparationTime();
  currentTime = new Date(currentTime.getTime() + tempoPreparoMinutos * 60000);
  logs.push({
    pedidoId: pedidoId,
    deStatusId: STATUS_IDS.EM_PREPARO,
    paraStatusId: STATUS_IDS.PRONTO,
    dataMovimentacao: new Date(currentTime),
  });

  if (isEntrega) {
    // Em entrega (2-5 minutos após ficar pronto)
    currentTime = new Date(
      currentTime.getTime() + faker.number.int({ min: 2, max: 5 }) * 60000,
    );
    logs.push({
      pedidoId: pedidoId,
      deStatusId: STATUS_IDS.PRONTO,
      paraStatusId: STATUS_IDS.EM_ENTREGA,
      dataMovimentacao: new Date(currentTime),
    });

    // Finalizado (10-30 minutos para entrega)
    const tempoEntregaMinutos = faker.number.int({ min: 10, max: 30 });
    currentTime = new Date(currentTime.getTime() + tempoEntregaMinutos * 60000);
    logs.push({
      pedidoId: pedidoId,
      deStatusId: STATUS_IDS.EM_ENTREGA,
      paraStatusId: STATUS_IDS.FINALIZADO,
      dataMovimentacao: new Date(currentTime),
    });
  } else {
    // Takeout: direto para finalizado (1-5 minutos após ficar pronto)
    currentTime = new Date(
      currentTime.getTime() + faker.number.int({ min: 1, max: 5 }) * 60000,
    );
    logs.push({
      pedidoId: pedidoId,
      deStatusId: STATUS_IDS.PRONTO,
      paraStatusId: STATUS_IDS.FINALIZADO,
      dataMovimentacao: new Date(currentTime),
    });
  }

  return { logs, finalTime: currentTime };
}

// Função para gerar número de marmitas por dia baseado no ano
function getMarmitasPorDia(date) {
  const dayOfWeek = date.getDay(); // 0 = domingo, 6 = sábado
  const year = date.getFullYear();

  let maxMarmitas;

  // Definir máximo baseado no ano
  if (year <= 2023) {
    maxMarmitas = 110; // Primeiro ano
  } else if (year === 2024) {
    maxMarmitas = 140; // Segundo ano
  } else {
    maxMarmitas = 200; // 2025 em diante
  }

  // Ajustar baseado no dia da semana
  if (dayOfWeek === 0) {
    // Domingo - 40-60% do máximo
    return faker.number.int({
      min: Math.floor(maxMarmitas * 0.4),
      max: Math.floor(maxMarmitas * 0.6),
    });
  } else if (dayOfWeek === 6) {
    // Sábado - 70-90% do máximo
    return faker.number.int({
      min: Math.floor(maxMarmitas * 0.7),
      max: Math.floor(maxMarmitas * 0.9),
    });
  } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Segunda a sexta - 80-100% do máximo
    return faker.number.int({
      min: Math.floor(maxMarmitas * 0.8),
      max: maxMarmitas,
    });
  }

  return faker.number.int({
    min: Math.floor(maxMarmitas * 0.6),
    max: Math.floor(maxMarmitas * 0.8),
  });
}

// Função principal para gerar dados
async function generateMockData() {
  console.log('🚀 Iniciando geração de dados de mockup...');

  try {
    // Primeiro, zerar as tabelas existentes
    console.log('🗑️ Zerando tabelas de pedidos...');
    await prisma.logMovimentacao.deleteMany({});
    await prisma.pedidoItem.deleteMany({});
    await prisma.pedido.deleteMany({});
    console.log('✅ Tabelas zeradas com sucesso!');

    const pedidosData = [];
    const itensData = [];
    const enderecosData = [];
    const logsData = [];

    // Gerar dados para os últimos 2 anos (abril 2023 até julho 2025)
    const now = new Date('2025-07-01'); // Até 01/07/2025
    const startDate = new Date('2023-04-01'); // Começa em abril de 2023

    let totalPedidos = 0;
    let totalMarmitas = 0;
    let codigoSequence = 1;

    // Gerar pedidos dia por dia
    for (
      let date = new Date(startDate);
      date <= now;
      date.setDate(date.getDate() + 1)
    ) {
      const marmitasNoDia = getMarmitasPorDia(date);
      let marmitasVendidas = 0;
      let pedidosNoDia = 0;

      // Gerar pedidos até atingir a meta de marmitas do dia
      while (marmitasVendidas < marmitasNoDia) {
        const pedidoId = `mock_${Date.now()}_${totalPedidos}`;
        const fonte = getRandomFonte();
        const isEntrega = fonte.isEntrega && Math.random() < 0.8; // 80% dos pedidos de app são entrega

        // Gerar horário realista para marmitaria (funcionamento das 11h às 14:30h)
        const pedidoDate = new Date(date);
        const { hora, minuto } = gerarHorarioAlmoco();
        pedidoDate.setHours(hora, minuto, 0, 0);

        // Calcular quantas marmitas ainda precisamos
        const marmitasRestantes = marmitasNoDia - marmitasVendidas;
        const marmitasNestePedido = Math.min(
          marmitasRestantes,
          faker.number.int({ min: 1, max: Math.min(4, marmitasRestantes) }),
        );

        // Gerar itens do pedido
        const itens = generatePedidoItens(marmitasNestePedido);

        // Contar marmitas no pedido
        const marmitasNoPedido = itens
          .filter((item) =>
            PRODUTOS.find(
              (p) => p.id === item.produtoId && p.nome.includes('Marmita'),
            ),
          )
          .reduce((acc, item) => acc + item.quantidade, 0);

        // Gerar valores
        const desconto =
          Math.random() < 0.2
            ? faker.number.float({ min: 1, max: 5, multipleOf: 0.5 })
            : 0;
        const taxaEntrega = isEntrega
          ? faker.number.float({ min: 2, max: 7, multipleOf: 0.5 })
          : 0;
        const valorTotal = calculateTotalValue(itens, desconto, taxaEntrega);

        // Gerar endereço se for entrega
        let enderecoId = null;
        if (isEntrega) {
          enderecoId = `endereco_${pedidoId}`;
          enderecosData.push({
            id: enderecoId,
            ...generateEnderecoEntrega(),
          });
        }

        // Gerar logs de movimentação e tempo final
        const { logs, finalTime } = generateLogMovimentacao(
          pedidoId,
          isEntrega,
          pedidoDate,
          null,
        );

        // Criar pedido
        const pedido = {
          id: pedidoId,
          statusId: STATUS_IDS.FINALIZADO,
          empresaId: EMPRESA_ID,
          codigo: `#${String(codigoSequence).padStart(3, '0')}`,
          fonteId: fonte.id,
          pagamentoId: faker.helpers.arrayElement(FORMAS_PAGAMENTO),
          enderecoId: enderecoId,
          desconto: desconto,
          taxaEntrega: taxaEntrega,
          valorTotal: valorTotal,
          observacao:
            Math.random() < 0.3
              ? faker.helpers.arrayElement([
                  'Urgente',
                  'Cliente preferencial',
                  'Primeira compra',
                  'Sem pressa',
                ])
              : null,
          confirmado: true,
          confirmaAutomatico: fonte.id === 1, // Balcão confirma automático
          dataConfirmacao: pedidoDate,
          usuarioConfirmou: null,
          criadoEm: pedidoDate,
          concluidoEm: finalTime,
        };

        pedidosData.push(pedido);

        // Adicionar itens do pedido
        itens.forEach((item, index) => {
          itensData.push({
            id: `item_${pedidoId}_${index}`,
            pedidoId: pedidoId,
            ...item,
          });
        });

        // Adicionar logs de movimentação
        logs.forEach((log, index) => {
          logsData.push({
            id: `log_${pedidoId}_${index}`,
            ...log,
          });
        });

        marmitasVendidas += marmitasNoPedido;
        totalPedidos++;
        pedidosNoDia++;
        codigoSequence++;
      }

      totalMarmitas += marmitasVendidas;
      console.log(
        `📅 ${date.toISOString().split('T')[0]} - ${pedidosNoDia} pedidos, ${marmitasVendidas} marmitas`,
      );
    }

    console.log(
      `📊 Dados gerados: ${totalPedidos} pedidos, ${totalMarmitas} marmitas, ${itensData.length} itens, ${enderecosData.length} endereços, ${logsData.length} logs`,
    );

    // Inserir dados no banco (em lotes para melhor performance)
    console.log('💾 Inserindo endereços...');
    if (enderecosData.length > 0) {
      for (let i = 0; i < enderecosData.length; i += 100) {
        const batch = enderecosData.slice(i, i + 100);
        await prisma.endereco.createMany({
          data: batch,
          skipDuplicates: true,
        });
      }
    }

    console.log('💾 Inserindo pedidos...');
    for (let i = 0; i < pedidosData.length; i += 100) {
      const batch = pedidosData.slice(i, i + 100);
      await prisma.pedido.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }

    console.log('💾 Inserindo itens dos pedidos...');
    for (let i = 0; i < itensData.length; i += 100) {
      const batch = itensData.slice(i, i + 100);
      await prisma.pedidoItem.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }

    console.log('💾 Inserindo logs de movimentação...');
    for (let i = 0; i < logsData.length; i += 100) {
      const batch = logsData.slice(i, i + 100);
      await prisma.logMovimentacao.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }

    console.log('✅ Dados de mockup gerados com sucesso!');
    console.log(`📈 Total de pedidos: ${totalPedidos}`);
    console.log(`📈 Total de marmitas: ${totalMarmitas}`);
    console.log(`📈 Total de itens: ${itensData.length}`);
    console.log(`📈 Total de endereços: ${enderecosData.length}`);
    console.log(`📈 Total de logs: ${logsData.length}`);
  } catch (error) {
    console.error('❌ Erro ao gerar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função
generateMockData();
