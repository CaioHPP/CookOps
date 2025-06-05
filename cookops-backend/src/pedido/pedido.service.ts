import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido } from '@prisma/client';
import { EnderecoService } from 'src/endereco/endereco.service';
import { PedidoStatusService } from 'src/pedidostatus/pedidostatus.service';
import { PrismaService } from '../prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoGateway } from './pedido.gateway';

@Injectable()
export class PedidoService {
  constructor(
    private prisma: PrismaService,
    private pedidoGateway: PedidoGateway,
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

    const pedido = await this.prisma.pedido.create({
      data: {
        ...rest,
        codigo,
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

    this.pedidoGateway.emitirPedidoCriado(empresaId, {
      acao: 'criado',
      pedidoId: pedido.id,
      statusId: pedido.statusId,
    });

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

    const updated = await this.prisma.pedido.update({
      where: { id },
      data: {
        status: { connect: { id: paraStatus.id } },
      },
    });

    await this.prisma.logMovimentacao.create({
      data: {
        pedidoId: id,
        deStatusId,
        paraStatusId: paraStatus.id,
      },
    });

    this.pedidoGateway.emitirPedidoAtualizado(empresaId, {
      acao: 'movido',
      pedidoId: updated.id,
      deStatusId,
      paraStatusId: paraStatus.id,
    });

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
    this.pedidoGateway.emitirPedidoAtualizado(empresaId, {
      acao: 'concluido',
      pedidoId: pedidoAtualizado.id,
    });

    // Emite evento específico de conclusão
    this.pedidoGateway.emitirPedidoConcluido(empresaId, {
      acao: 'concluido',
      pedidoId: pedidoAtualizado.id,
      pedido: pedidoAtualizado,
    });

    return pedidoAtualizado;
  }
}
