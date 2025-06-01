import { Injectable, NotFoundException } from '@nestjs/common';
import { LogMovimentacao } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateLogMovimentacaoDto } from './dto/create-logmovimentacao.dto';
import { UpdateLogMovimentacaoDto } from './dto/update-logmovimentacao.dto';

@Injectable()
export class LogMovimentacaoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLogMovimentacaoDto): Promise<LogMovimentacao> {
    const { pedidoId, deStatusId, paraStatusId, ...rest } = data;
    return this.prisma.logMovimentacao.create({
      data: {
        ...rest,
        pedido: { connect: { id: pedidoId } },
        ...(deStatusId && { deStatus: { connect: { id: deStatusId } } }),
        paraStatus: { connect: { id: paraStatusId } },
      },
    });
  }

  findAll(): Promise<LogMovimentacao[]> {
    return this.prisma.logMovimentacao.findMany();
  }

  async findOne(id: string): Promise<LogMovimentacao> {
    const log = await this.prisma.logMovimentacao.findUnique({ where: { id } });
    if (!log) {
      throw new NotFoundException('Log de movimentação não encontrado');
    }
    return log;
  }

  update(id: string, data: UpdateLogMovimentacaoDto): Promise<LogMovimentacao> {
    const { pedidoId, deStatusId, paraStatusId, ...rest } = data;
    return this.prisma.logMovimentacao.update({
      where: { id },
      data: {
        ...rest,
        ...(pedidoId && { pedido: { connect: { id: pedidoId } } }),
        ...(deStatusId && { deStatus: { connect: { id: deStatusId } } }),
        ...(paraStatusId && { paraStatus: { connect: { id: paraStatusId } } }),
      },
    });
  }

  remove(id: string): Promise<LogMovimentacao> {
    return this.prisma.logMovimentacao.delete({
      where: { id },
    });
  }
}
