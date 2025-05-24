import { Module } from '@nestjs/common';
import { BoardModule } from 'src/board/board.module';
import { PrismaService } from '../prisma.service';
import { PedidoStatusController } from './pedidostatus.controller';
import { PedidoStatusService } from './pedidostatus.service';

@Module({
  imports: [BoardModule],
  controllers: [PedidoStatusController],
  providers: [PedidoStatusService, PrismaService],
  exports: [PedidoStatusService],
})
export class PedidoStatusModule {}
