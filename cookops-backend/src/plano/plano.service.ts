import { Injectable } from '@nestjs/common';
import { Plano, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PlanoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PlanoCreateInput): Promise<Plano> {
    return this.prisma.plano.create({ data });
  }

  findAll(): Promise<Plano[]> {
    return this.prisma.plano.findMany();
  }

  findOne(id: string): Promise<Plano | null> {
    return this.prisma.plano.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.PlanoUpdateInput): Promise<Plano> {
    return this.prisma.plano.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<Plano> {
    return this.prisma.plano.delete({
      where: { id },
    });
  }
}
