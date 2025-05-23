import { Injectable } from '@nestjs/common';
import { PedidoItem } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePedidoItemDto } from './dto/create-pedidoitem.dto';
import { UpdatePedidoItemDto } from './dto/update-pedidoitem.dto';

@Injectable()
export class PedidoItemService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePedidoItemDto): Promise<PedidoItem> {
    const { pedidoId, produtoId, ...rest } = data;
    return this.prisma.pedidoItem.create({
      data: {
        ...rest,
        pedido: { connect: { id: pedidoId } },
        produto: { connect: { id: produtoId } },
      },
    });
  }

  findAll(): Promise<PedidoItem[]> {
    return this.prisma.pedidoItem.findMany();
  }

  findOne(id: string): Promise<PedidoItem | null> {
    return this.prisma.pedidoItem.findUnique({ where: { id } });
  }

  update(id: string, data: UpdatePedidoItemDto): Promise<PedidoItem> {
    const { pedidoId, produtoId, ...rest } = data;
    return this.prisma.pedidoItem.update({
      where: { id },
      data: {
        ...rest,
        ...(pedidoId && { pedido: { connect: { id: pedidoId } } }),
        ...(produtoId && { produto: { connect: { id: produtoId } } }),
      },
    });
  }

  remove(id: string): Promise<PedidoItem> {
    return this.prisma.pedidoItem.delete({
      where: { id },
    });
  }
}
