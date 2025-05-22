import { Injectable } from '@nestjs/common';
import { FormaPagamento, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FormaPagamentoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.FormaPagamentoCreateInput): Promise<FormaPagamento> {
    return this.prisma.formaPagamento.create({ data });
  }

  findAll(): Promise<FormaPagamento[]> {
    return this.prisma.formaPagamento.findMany();
  }

  findOne(id: string): Promise<FormaPagamento | null> {
    return this.prisma.formaPagamento.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: Prisma.FormaPagamentoUpdateInput,
  ): Promise<FormaPagamento> {
    return this.prisma.formaPagamento.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<FormaPagamento> {
    return this.prisma.formaPagamento.delete({
      where: { id },
    });
  }
}
