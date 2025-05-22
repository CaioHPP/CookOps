import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Prisma, Produto } from '@prisma/client';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() data: Prisma.ProdutoCreateInput) {
    return this.produtoService.create(data);
  }
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ProdutoUpdateInput) {
    return this.produtoService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
  @Get('empresa/:empresaId')
  findByEmpresaId(@Param('empresaId') empresaId: string): Promise<Produto[]> {
    return this.produtoService.findByEmpresaId(empresaId);
  }
}
