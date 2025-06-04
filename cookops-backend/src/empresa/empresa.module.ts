import { Module } from '@nestjs/common';
import { BoardModule } from 'src/board/board.module';
import { FormaPagamentoModule } from 'src/formapagamento/formapagamento.module';
import { PedidoModule } from 'src/pedido/pedido.module';
import { PedidoStatusModule } from 'src/pedidostatus/pedidostatus.module';
import { PrismaService } from '../prisma.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [
    BoardModule,
    PedidoStatusModule,
    FormaPagamentoModule,
    PedidoModule,
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
