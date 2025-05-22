import { Injectable } from '@nestjs/common';
import { PedidoStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PedidoStatusService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PedidoStatusCreateInput): Promise<PedidoStatus> {
    return this.prisma.pedidoStatus.create({ data });
  }

  findAll(): Promise<PedidoStatus[]> {
    return this.prisma.pedidoStatus.findMany();
  }

  findOne(id: string): Promise<PedidoStatus | null> {
    return this.prisma.pedidoStatus.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: Prisma.PedidoStatusUpdateInput,
  ): Promise<PedidoStatus> {
    return this.prisma.pedidoStatus.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<PedidoStatus> {
    return this.prisma.pedidoStatus.delete({
      where: { id },
    });
  }
}
