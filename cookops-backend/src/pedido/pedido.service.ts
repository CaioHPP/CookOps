import { Injectable } from '@nestjs/common';
import { Pedido } from '@prisma/client';
import { PedidoStatusService } from 'src/pedidostatus/pedidostatus.service';
import { PrismaService } from '../prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    private prisma: PrismaService,
    private readonly pedidoStatusService: PedidoStatusService, // Importando o serviço de status de pedido
  ) {}

  async create(data: CreatePedidoDto, empresaId: string): Promise<Pedido> {
    // Remove scalar foreign keys from data before spreading
    const { boardId, pagamentoId, fonteId, enderecoId, itens, ...rest } = data;

    const ultimoPedidoHoje = await this.prisma.pedido.count({
      where: {
        empresaId,
        criadoEm: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // Início do dia
        },
      },
    });

    const codigo = `#${(ultimoPedidoHoje + 1).toString().padStart(3, '0')}`;

    const status = await this.pedidoStatusService.findFirstByBoardId(boardId);
    if (!status) {
      throw new Error('Status não encontrado para o boardId fornecido');
    }
    const statusId = status.id;

    return this.prisma.pedido.create({
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
  }

  findAll(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany();
  }

  findOne(id: string): Promise<Pedido | null> {
    return this.prisma.pedido.findUnique({
      where: { id },
    });
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
    });
  }

  async moverPedido(
    id: string,
    paraStatusId: number,
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
      throw new Error('Pedido não encontrado');
    }
    if (pedido.status.board.empresaId !== empresaId) {
      throw new Error('Empresa não autorizada a mover este pedido');
    }
    const deStatusId = pedido.status.id;

    const updated = await this.prisma.pedido.update({
      where: { id },
      data: {
        status: { connect: { id: paraStatusId } },
      },
    });

    await this.prisma.logMovimentacao.create({
      data: {
        pedidoId: id,
        deStatusId,
        paraStatusId,
      },
    });

    return updated;
  }
}
