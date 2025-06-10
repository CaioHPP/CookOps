import { Module } from '@nestjs/common';
import { CentralWebSocketModule } from 'src/common/gateways/central-websocket.module';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  imports: [CentralWebSocketModule],
  exports: [ProdutoService],
})
export class ProdutoModule {}
