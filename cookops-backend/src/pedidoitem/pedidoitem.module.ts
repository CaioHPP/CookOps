import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PedidoItemController } from './pedidoitem.controller';
import { PedidoItemService } from './pedidoitem.service';

@Module({
  controllers: [PedidoItemController],
  providers: [PedidoItemService, PrismaService],
  exports: [PedidoItemService],
})
export class PedidoItemModule {}
