import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Produto } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produtos')
@UseGuards(JwtAuthGuard)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreateProdutoDto,
  ) {
    const empresaId = req.user.empresaId;
    // ...empresaId disponível para uso futuro...
    return this.produtoService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.findOne(id);
  }

  @Put(':id')
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdateProdutoDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.update(id, data);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.remove(id);
  }

  @Get('empresa/:empresaId')
  findByEmpresaId(
    @Request() req: { user: { empresaId: string } },
    @Param('empresaId') empresaIdParam: string,
  ): Promise<Produto[]> {
    const empresaId = req.user.empresaId;
    return this.produtoService.findByEmpresaId(empresaIdParam);
  }
}
