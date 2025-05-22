import { Injectable } from '@nestjs/common';
import { Pedido, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PedidoCreateInput): Promise<Pedido> {
    return this.prisma.pedido.create({
      data,
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

  update(id: string, data: Prisma.PedidoUpdateInput): Promise<Pedido> {
    return this.prisma.pedido.update({
      where: { id },
      data,
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
}
