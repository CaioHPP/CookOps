import { Module } from '@nestjs/common';
import { CentralWebSocketModule } from 'src/common/gateways/central-websocket.module';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { PedidoStatusModule } from 'src/pedidostatus/pedidostatus.module';
import { PrismaService } from 'src/prisma.service';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService, PrismaService],
  imports: [PedidoStatusModule, EnderecoModule, CentralWebSocketModule],
  exports: [PedidoService],
})
export class PedidoModule {}
