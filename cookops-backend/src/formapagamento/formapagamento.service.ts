import { Injectable } from '@nestjs/common';
import { FormaPagamento } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateFormaPagamentoDto } from './dto/create-formapagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-formapagamento.dto';

@Injectable()
export class FormaPagamentoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFormaPagamentoDto): Promise<FormaPagamento> {
    return this.prisma.formaPagamento.create({ data });
  }

  findAll(): Promise<FormaPagamento[]> {
    return this.prisma.formaPagamento.findMany();
  }

  findOne(id: string): Promise<FormaPagamento | null> {
    return this.prisma.formaPagamento.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateFormaPagamentoDto): Promise<FormaPagamento> {
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
