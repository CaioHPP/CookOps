import { Module } from '@nestjs/common';
import { BoardModule } from 'src/board/board.module';
import { PedidoStatusModule } from 'src/pedidostatus/pedidostatus.module';
import { PrismaService } from '../prisma.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [BoardModule, PedidoStatusModule],
  controllers: [EmpresaController],
  providers: [EmpresaService, PrismaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
