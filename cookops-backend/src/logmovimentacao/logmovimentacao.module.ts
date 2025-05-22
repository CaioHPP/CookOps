import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LogMovimentacaoController } from './logmovimentacao.controller';
import { LogMovimentacaoService } from './logmovimentacao.service';

@Module({
  controllers: [LogMovimentacaoController],
  providers: [LogMovimentacaoService, PrismaService],
  exports: [LogMovimentacaoService],
})
export class LogMovimentacaoModule {}
