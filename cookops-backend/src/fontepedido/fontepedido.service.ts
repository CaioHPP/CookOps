import { Injectable } from '@nestjs/common';
import { FontePedido, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FontePedidoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.FontePedidoCreateInput): Promise<FontePedido> {
    return this.prisma.fontePedido.create({ data });
  }

  findAll(): Promise<FontePedido[]> {
    return this.prisma.fontePedido.findMany();
  }

  findOne(id: string): Promise<FontePedido | null> {
    return this.prisma.fontePedido.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: Prisma.FontePedidoUpdateInput,
  ): Promise<FontePedido> {
    return this.prisma.fontePedido.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<FontePedido> {
    return this.prisma.fontePedido.delete({
      where: { id },
    });
  }
}
