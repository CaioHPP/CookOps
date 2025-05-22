import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FormaPagamentoController } from './formapagamento.controller';
import { FormaPagamentoService } from './formapagamento.service';

@Module({
  controllers: [FormaPagamentoController],
  providers: [FormaPagamentoService, PrismaService],
  exports: [FormaPagamentoService],
})
export class FormaPagamentoModule {}
