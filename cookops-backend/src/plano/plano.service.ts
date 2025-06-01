import { Injectable, NotFoundException } from '@nestjs/common';
import { Plano } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Injectable()
export class PlanoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePlanoDto): Promise<Plano> {
    return this.prisma.plano.create({ data });
  }

  findAll(): Promise<Plano[]> {
    return this.prisma.plano.findMany();
  }

  async findOne(id: number): Promise<Plano> {
    const plano = await this.prisma.plano.findUnique({ where: { id } });
    if (!plano) {
      throw new NotFoundException('Plano não encontrado');
    }
    return plano;
  }

  update(id: number, data: UpdatePlanoDto): Promise<Plano> {
    return this.prisma.plano.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Plano> {
    return this.prisma.plano.delete({
      where: { id },
    });
  }
}
