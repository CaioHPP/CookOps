import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService], // Export the PedidoService if needed in other modules
})
export class PedidoModule {}
