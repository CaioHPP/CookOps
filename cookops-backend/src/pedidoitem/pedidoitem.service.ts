import { Injectable } from '@nestjs/common';
import { PedidoItem, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PedidoItemService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PedidoItemCreateInput): Promise<PedidoItem> {
    return this.prisma.pedidoItem.create({ data });
  }

  findAll(): Promise<PedidoItem[]> {
    return this.prisma.pedidoItem.findMany();
  }

  findOne(id: string): Promise<PedidoItem | null> {
    return this.prisma.pedidoItem.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.PedidoItemUpdateInput): Promise<PedidoItem> {
    return this.prisma.pedidoItem.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<PedidoItem> {
    return this.prisma.pedidoItem.delete({
      where: { id },
    });
  }
}
