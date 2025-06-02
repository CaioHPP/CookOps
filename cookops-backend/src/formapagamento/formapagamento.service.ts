import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<FormaPagamento> {
    const forma = await this.prisma.formaPagamento.findUnique({
      where: { id },
    });
    if (!forma) {
      throw new NotFoundException('Forma de pagamento não encontrada');
    }
    return forma;
  }

  update(id: number, data: UpdateFormaPagamentoDto): Promise<FormaPagamento> {
    return this.prisma.formaPagamento.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<FormaPagamento> {
    return this.prisma.formaPagamento.delete({
      where: { id },
    });
  }

  findByEmpresaId(empresaId: string): Promise<FormaPagamento[]> {
    return this.prisma.formaPagamento.findMany({
      where: { empresaId },
    });
  }
}
