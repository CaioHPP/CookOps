import { Injectable } from '@nestjs/common';
import { PedidoStatus } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePedidoStatusDto } from './dto/create-pedidostatus.dto';
import { UpdatePedidoStatusDto } from './dto/update-pedidostatus.dto';

@Injectable()
export class PedidoStatusService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePedidoStatusDto): Promise<PedidoStatus> {
    return this.prisma.pedidoStatus.create({ data });
  }

  findAll(): Promise<PedidoStatus[]> {
    return this.prisma.pedidoStatus.findMany();
  }

  findOne(id: string): Promise<PedidoStatus | null> {
    return this.prisma.pedidoStatus.findUnique({ where: { id } });
  }

  update(id: string, data: UpdatePedidoStatusDto): Promise<PedidoStatus> {
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
