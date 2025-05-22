import { Injectable } from '@nestjs/common';
import { Endereco, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EnderecoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EnderecoCreateInput): Promise<Endereco> {
    return this.prisma.endereco.create({ data });
  }

  findAll(): Promise<Endereco[]> {
    return this.prisma.endereco.findMany();
  }

  findOne(id: string): Promise<Endereco | null> {
    return this.prisma.endereco.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.EnderecoUpdateInput): Promise<Endereco> {
    return this.prisma.endereco.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<Endereco> {
    return this.prisma.endereco.delete({
      where: { id },
    });
  }
}
