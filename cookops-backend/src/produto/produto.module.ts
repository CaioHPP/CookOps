import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService], // Export the ProdutoService if needed in other modules
})
export class ProdutoModule {}
