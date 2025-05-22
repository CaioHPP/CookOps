import { Injectable } from '@nestjs/common';
import { LogMovimentacao } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateLogMovimentacaoDto } from './dto/create-logmovimentacao.dto';
import { UpdateLogMovimentacaoDto } from './dto/update-logmovimentacao.dto';

@Injectable()
export class LogMovimentacaoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateLogMovimentacaoDto): Promise<LogMovimentacao> {
    return this.prisma.logMovimentacao.create({ data });
  }

  findAll(): Promise<LogMovimentacao[]> {
    return this.prisma.logMovimentacao.findMany();
  }

  findOne(id: string): Promise<LogMovimentacao | null> {
    return this.prisma.logMovimentacao.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateLogMovimentacaoDto): Promise<LogMovimentacao> {
    return this.prisma.logMovimentacao.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<LogMovimentacao> {
    return this.prisma.logMovimentacao.delete({
      where: { id },
    });
  }
}
