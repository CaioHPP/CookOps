import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FontePedidoController } from './fontepedido.controller';
import { FontePedidoService } from './fontepedido.service';

@Module({
  controllers: [FontePedidoController],
  providers: [FontePedidoService, PrismaService],
  exports: [FontePedidoService],
})
export class FontePedidoModule {}
