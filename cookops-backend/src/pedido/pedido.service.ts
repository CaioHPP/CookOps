import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido } from '@prisma/client';
import { CentralWebSocketGateway } from 'src/common/gateways/central-websocket.gateway';
import { EnderecoService } from 'src/endereco/endereco.service';
import { PedidoStatusService } from 'src/pedidostatus/pedidostatus.service';
import { PrismaService } from '../prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    private prisma: PrismaService,
    private centralGateway: CentralWebSocketGateway,
    private readonly pedidoStatusService: PedidoStatusService,
    private enderecoService: EnderecoService,
  ) {}

  async create(data: CreatePedidoDto, empresaId: string): Promise<Pedido> {
    const { boardId, pagamentoId, fonteId, endereco, itens, ...rest } = data;

    let enderecoId: string | undefined;
    if (endereco) {
      const enderecoExistente =
        await this.enderecoService.findByRuaNumeroBairro(
          endereco.rua,
          endereco.numero,
          endereco.bairro,
        );
      if (enderecoExistente) {
        enderecoId = enderecoExistente.id;
      } else {
        const novoEndereco = await this.enderecoService.create(endereco);
        enderecoId = novoEndereco.id;
      }
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    const totalPedidosHoje = await this.prisma.pedido.count({
      where: {
        empresaId,
        criadoEm: {
          gte: hoje,
          lt: amanha,
        },
      },
    });

    const codigo = `#${(totalPedidosHoje + 1).toString().padStart(3, '0')}`;

    const status = await this.pedidoStatusService.findFirstByBoardId(boardId);
    if (!status) {
      throw new Error('Status não encontrado para o boardId fornecido');
    }
    const statusId = status.id;

    // Buscar informações da fonte do pedido para determinar a confirmação
    const fontePedido = await this.prisma.fontePedido.findUnique({
      where: { id: fonteId },
    });

    if (!fontePedido) {
      throw new Error('Fonte do pedido não encontrada');
    }

    const confirmaAutomatico = fontePedido.confirmaAutomatico;
    const confirmado = confirmaAutomatico && !fontePedido.exigeConfirmacao;

    const pedido = await this.prisma.pedido.create({
      data: {
        ...rest,
        codigo,
        confirmado,
        confirmaAutomatico,
        dataConfirmacao: confirmado ? new Date() : null,
        itens: {
          create: itens?.map((item) => ({
            produto: { connect: { id: item.produtoId } },
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            observacao: item.observacao,
          })),
        },
        empresa: { connect: { id: empresaId } },
        status: { connect: { id: statusId } },
        pagamento: { connect: { id: pagamentoId } },
        fonte: { connect: { id: fonteId } },
        ...(enderecoId && {
          endereco: { connect: { id: enderecoId } },
        }),
      },
    });

    this.centralGateway.emitNovoPedido(
      {
        acao: 'criado',
        pedidoId: pedido.id,
        statusId: pedido.statusId,
      },
      empresaId,
    );

    return pedido;
  }

  findAll(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany({
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return pedido;
  }

  async update(
    id: string,
    data: UpdatePedidoDto,
    empresaId: string,
  ): Promise<Pedido> {
    const { statusId, pagamentoId, fonteId, endereco, itens, ...rest } = data;

    let enderecoId: string | undefined;
    if (endereco) {
      const enderecoExistente =
        await this.enderecoService.findByRuaNumeroBairro(
          endereco.rua,
          endereco.numero,
          endereco.bairro,
        );
      if (enderecoExistente) {
        enderecoId = enderecoExistente.id;
      } else {
        const novoEndereco = await this.enderecoService.create(endereco);
        enderecoId = novoEndereco.id;
      }
    }

    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...rest,
        ...(empresaId && { empresa: { connect: { id: empresaId } } }),
        ...(statusId && { status: { connect: { id: statusId } } }),
        ...(pagamentoId && { pagamento: { connect: { id: pagamentoId } } }),
        ...(fonteId && { fonte: { connect: { id: fonteId } } }),
        ...(enderecoId && { endereco: { connect: { id: enderecoId } } }),
        ...(itens && {
          itens: {
            deleteMany: {},
            create: itens
              .filter(
                (item) =>
                  item.produtoId !== undefined &&
                  item.quantidade !== undefined &&
                  item.precoUnitario !== undefined &&
                  item.observacao !== undefined,
              )
              .map((item) => ({
                ...(item.id && { id: item.id }),
                produto: { connect: { id: item.produtoId! } },
                quantidade: item.quantidade!,
                precoUnitario: item.precoUnitario!,
                observacao: item.observacao!,
              })),
          },
        }),
      },
    });
  }

  remove(id: string): Promise<Pedido> {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }

  async confirmarPedido(
    id: string,
    usuarioConfirmou?: string,
  ): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: { fonte: true },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (pedido.confirmado) {
      throw new Error('Pedido já foi confirmado');
    }

    // Verificar se a fonte exige confirmação
    if (!pedido.fonte.exigeConfirmacao && pedido.fonte.confirmaAutomatico) {
      throw new Error('Este pedido não precisa de confirmação manual');
    }

    // Verificar tempo limite se configurado
    if (pedido.fonte.tempoLimiteConfirma) {
      const tempoLimite = new Date(pedido.criadoEm);
      tempoLimite.setMinutes(
        tempoLimite.getMinutes() + pedido.fonte.tempoLimiteConfirma,
      );

      if (new Date() > tempoLimite) {
        throw new Error('Tempo limite para confirmação expirado');
      }
    }

    const pedidoConfirmado = await this.prisma.pedido.update({
      where: { id },
      data: {
        confirmado: true,
        dataConfirmacao: new Date(),
        usuarioConfirmou,
      },
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    // Emitir evento de pedido confirmado
    this.centralGateway.emitNovoPedido(
      {
        acao: 'confirmado',
        pedidoId: pedido.id,
        statusId: pedido.statusId,
      },
      pedido.empresaId,
    );

    return pedidoConfirmado;
  }

  findByEmpresaId(empresaId: string): Promise<Pedido[]> {
    return this.prisma.pedido.findMany({
      where: { empresaId },
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async findByEmpresaIdWithTimeLimit(empresaId: string): Promise<Pedido[]> {
    const configuracao = await this.prisma.configuracaoEmpresa.findUnique({
      where: { empresaId },
    });

    let horasLimite = 12;

    if (configuracao) {
      const [horaAbertura] = configuracao.horarioAbertura
        .split(':')
        .map(Number);
      const [horaFechamento] = configuracao.horarioFechamento
        .split(':')
        .map(Number);

      let diferencaHoras = horaFechamento - horaAbertura;
      if (diferencaHoras < 0) {
        diferencaHoras += 24;
      }

      horasLimite = diferencaHoras + 2;
    }

    const tempoLimite = new Date();
    tempoLimite.setHours(tempoLimite.getHours() - horasLimite);

    return this.prisma.pedido.findMany({
      where: {
        empresaId,
        criadoEm: {
          gte: tempoLimite,
        },
      },
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async findByEmpresaIdLast12Hours(empresaId: string): Promise<Pedido[]> {
    return this.findByEmpresaIdWithTimeLimit(empresaId);
  }

  async moverPedido(
    id: string,
    paraOrdem: number,
    empresaId: string,
  ): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        status: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    if (pedido.status.board.empresaId !== empresaId) {
      throw new NotFoundException('Empresa não autorizada a mover este pedido');
    }
    const deStatusId = pedido.status.id;

    const paraStatus = await this.pedidoStatusService.findByOrdem(
      pedido.status.boardId,
      paraOrdem,
    );

    if (!paraStatus) {
      throw new NotFoundException(
        'Status de destino não encontrado para a ordem fornecida',
      );
    }

    // Verificar se o pedido estava concluído e limpar data de conclusão ao mover
    const dataUpdate: {
      status: { connect: { id: number } };
      concluidoEm?: null;
    } = {
      status: { connect: { id: paraStatus.id } },
    };

    // Se o pedido estava concluído, limpar a data de conclusão ao mover para outro status
    if (pedido.concluidoEm) {
      dataUpdate.concluidoEm = null;
    }

    const updated = await this.prisma.pedido.update({
      where: { id },
      data: dataUpdate,
    });

    await this.prisma.logMovimentacao.create({
      data: {
        pedidoId: id,
        deStatusId,
        paraStatusId: paraStatus.id,
      },
    });

    this.centralGateway.emitPedidoAtualizado(
      {
        acao: 'movido',
        pedidoId: updated.id,
        deStatusId,
        paraStatusId: paraStatus.id,
      },
      empresaId,
    );

    return updated;
  }

  async concluirPedido(id: string, empresaId: string): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        status: {
          include: {
            board: true,
          },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (pedido.status.board.empresaId !== empresaId) {
      throw new NotFoundException(
        'Empresa não autorizada a concluir este pedido',
      );
    }

    const pedidoAtualizado = await this.prisma.pedido.update({
      where: { id },
      data: {
        concluidoEm: new Date(),
      },
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });
    this.centralGateway.emitPedidoAtualizado(
      {
        acao: 'concluido',
        pedidoId: pedidoAtualizado.id,
      },
      empresaId,
    );

    // Emite evento específico de conclusão
    this.centralGateway.emitStatusPedidoAlterado(
      {
        acao: 'concluido',
        pedidoId: pedidoAtualizado.id,
        pedido: pedidoAtualizado,
      },
      empresaId,
    );

    return pedidoAtualizado;
  }

  async findPedidosPendentesConfirmacao(empresaId: string): Promise<Pedido[]> {
    return this.prisma.pedido.findMany({
      where: {
        empresaId,
        confirmado: false,
        fonte: {
          exigeConfirmacao: true,
        },
      },
      include: {
        status: true,
        pagamento: true,
        fonte: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'asc',
      },
    });
  }
}
