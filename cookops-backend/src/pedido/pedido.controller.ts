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
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiBody({
    type: CreatePedidoDto,
    description: 'Dados do pedido a ser criado',
  })
  @ApiOperation({ summary: 'Criar um novo pedido' })
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreatePedidoDto,
  ) {
    const empresaId = req.user.empresaId;
    // ...empresaId disponível para uso futuro...
    return this.pedidoService.create(data, empresaId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos (apenas ADMIN)' })
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.pedidoService.findAll();
  }

  @Get('ultimas-12-horas/')
  @ApiOperation({
    summary: 'Buscar pedidos da empresa criados nas últimas 12 horas',
    description:
      'Retorna todos os pedidos da empresa do usuário autenticado que foram criados nas últimas 12 horas, ordenados por data de criação (mais recentes primeiro)',
  })
  findPedidosUltimas12Horas(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.findByEmpresaIdLast12Hours(empresaId);
  }

  @Get('empresa/')
  @ApiOperation({ summary: 'Listar pedidos da empresa do usuário autenticado' })
  findByEmpresaId(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.findByEmpresaId(empresaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.findOne(id);
  }

  @Put('mover/:id')
  @ApiOperation({ summary: 'Mover pedido para outro status' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  @ApiBody({
    schema: {
      properties: {
        paraOrdem: {
          type: 'number',
          description: 'Número da ordem do novo status',
        },
      },
    },
  })
  moverPedido(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: { paraOrdem: number },
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.moverPedido(id, data.paraOrdem, empresaId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  @ApiBody({
    type: UpdatePedidoDto,
    description: 'Dados para atualização do pedido',
  })
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdatePedidoDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.update(id, data, empresaId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.remove(id);
  }

  @Put('concluir/:id')
  @ApiOperation({ summary: 'Concluir um pedido' })
  @ApiParam({ name: 'id', description: 'ID do pedido' })
  concluirPedido(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.concluirPedido(id, empresaId);
  }
}
