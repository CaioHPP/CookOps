import { Injectable } from '@nestjs/common';
import { FontePedido } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateFontePedidoDto } from './dto/create-fontepedido.dto';
import { UpdateFontePedidoDto } from './dto/update-fontepedido.dto';

@Injectable()
export class FontePedidoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFontePedidoDto): Promise<FontePedido> {
    return this.prisma.fontePedido.create({ data });
  }

  findAll(): Promise<FontePedido[]> {
    return this.prisma.fontePedido.findMany();
  }

  findOne(id: number): Promise<FontePedido | null> {
    return this.prisma.fontePedido.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateFontePedidoDto): Promise<FontePedido> {
    return this.prisma.fontePedido.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<FontePedido> {
    return this.prisma.fontePedido.delete({
      where: { id },
    });
  }
}
