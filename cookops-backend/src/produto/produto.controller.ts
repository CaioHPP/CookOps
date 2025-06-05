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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Produto } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiBody({
    type: CreateProdutoDto,
    description: 'Dados do produto a ser criado',
  })
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreateProdutoDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.create(data, empresaId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos (apenas ADMIN)' })
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.produtoService.findAll();
  }

  @Get('empresa')
  @ApiOperation({
    summary: 'Listar produtos da empresa do usuário autenticado',
  })
  findByEmpresaIdAuth(
    @Request() req: { user: { empresaId: string } },
  ): Promise<Produto[]> {
    const empresaId = req.user.empresaId;
    return this.produtoService.findByEmpresaId(empresaId);
  }

  @Get('empresa/:empresaId')
  @ApiOperation({ summary: 'Listar produtos por empresa' })
  @ApiParam({ name: 'empresaId', description: 'ID da empresa' })
  findByEmpresaId(
    @Request() req: { user: { role: string } },
    @Param('empresaId') empresaId: string,
  ): Promise<Produto[]> {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');

    return this.produtoService.findByEmpresaId(empresaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiBody({
    type: UpdateProdutoDto,
    description: 'Dados para atualização do produto',
  })
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdateProdutoDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.update(id, data, empresaId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.produtoService.remove(id);
  }
}
