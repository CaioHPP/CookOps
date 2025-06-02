import { Module } from '@nestjs/common';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { PedidoStatusModule } from 'src/pedidostatus/pedidostatus.module';
import { PrismaService } from 'src/prisma.service';
import { PedidoController } from './pedido.controller';
import { PedidoGateway } from './pedido.gateway';
import { PedidoService } from './pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService, PedidoGateway, PrismaService],
  imports: [PedidoStatusModule, EnderecoModule], // Import any other modules if needed, e.g., PrismaModule, PedidoStatusModule
  exports: [PedidoService], // Export the PedidoService if needed in other modules
})
export class PedidoModule {}
