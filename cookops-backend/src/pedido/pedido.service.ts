import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido } from '@prisma/client';
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
  ) {}

  async create(data: CreatePedidoDto, empresaId: string): Promise<Pedido> {
    // Remove scalar foreign keys from data before spreading
    const { boardId, pagamentoId, fonteId, enderecoId, itens, ...rest } = data;

    // Busca o número total de pedidos feitos hoje para a empresa
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

    // Emite atualização via websocket para a empresa
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
            produto: true, // Inclui os detalhes do produto em cada item
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
            produto: true, // Inclui os detalhes do produto em cada item
          },
        },
      },
    });
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return pedido;
  }

  update(
    id: string,
    data: UpdatePedidoDto,
    empresaId: string,
  ): Promise<Pedido> {
    // Remove scalar foreign keys from data before spreading
    const { statusId, pagamentoId, fonteId, enderecoId, itens, ...rest } = data;

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
            deleteMany: {}, // remove todos e recria, simples mas funcional
            create: itens
              .filter(
                (item) =>
                  item.produtoId !== undefined &&
                  item.quantidade !== undefined &&
                  item.precoUnitario !== undefined &&
                  item.observacao !== undefined,
              )
              .map((item) => ({
                ...(item.id && { id: item.id }), // opcional
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
            produto: true, // Inclui os detalhes do produto em cada item
          },
        },
      },
    });
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

    // Emite atualização via websocket para a empresa
    this.pedidoGateway.emitirPedidoAtualizado(empresaId, {
      acao: 'movido',
      pedidoId: updated.id,
      deStatusId,
      paraStatusId: paraStatus.id,
    });

    return updated;
  }
}
