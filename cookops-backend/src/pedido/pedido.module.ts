import { Module } from '@nestjs/common';
import { PedidoStatusModule } from 'src/pedidostatus/pedidostatus.module';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
  imports: [PedidoStatusModule], // Import any other modules if needed, e.g., PrismaModule, PedidoStatusModule
  exports: [PedidoService], // Export the PedidoService if needed in other modules
})
export class PedidoModule {}
