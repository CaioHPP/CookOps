import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PedidoStatusController } from './pedidostatus.controller';
import { PedidoStatusService } from './pedidostatus.service';

@Module({
  controllers: [PedidoStatusController],
  providers: [PedidoStatusService, PrismaService],
  exports: [PedidoStatusService],
})
export class PedidoStatusModule {}
