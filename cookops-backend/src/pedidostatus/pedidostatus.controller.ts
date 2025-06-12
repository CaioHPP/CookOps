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
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreatePedidoStatusDto } from './dto/create-pedidostatus.dto';
import { UpdatePedidoStatusDto } from './dto/update-pedidostatus.dto';
import { PedidoStatusService } from './pedidostatus.service';

@ApiTags('PedidoStatus')
@ApiBearerAuth()
@Controller('pedidostatus')
@UseGuards(JwtAuthGuard)
export class PedidoStatusController {
  constructor(private readonly pedidoStatusService: PedidoStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo status de pedido' })
  @ApiBody({
    type: CreatePedidoStatusDto,
    description: 'Dados do status de pedido a ser criado',
  })
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreatePedidoStatusDto,
  ) {
    const empresaId = req.user.empresaId;
    // ...empresaId disponível para uso futuro...
    return this.pedidoStatusService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os status de pedido (apenas ADMIN)' })
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.pedidoStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um status de pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do status de pedido' })
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: number,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um status de pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do status de pedido' })
  @ApiBody({
    type: UpdatePedidoStatusDto,
    description: 'Dados para atualização do status de pedido',
  })
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: number,
    @Body() data: UpdatePedidoStatusDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um status de pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do status de pedido' })
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: number,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.remove(id);
  }

  @Get('board/:id')
  @ApiOperation({ summary: 'Listar status de pedido por board' })
  @ApiParam({ name: 'id', description: 'ID do board' })
  findByBoardId(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.findByBoardId(id);
  }

  @Get('pedidos/:boardId')
  @ApiOperation({
    summary: 'Listar todos os status de pedido com pedidos por board',
  })
  @ApiParam({ name: 'boardId', description: 'ID do board' })
  findAllWithPedidos(
    @Request() req: { user: { empresaId: string; role: string } },
    @Param('boardId') boardId: string,
  ) {
    const empresaId = req.user.empresaId;
    const role = req.user.role;
    return this.pedidoStatusService.findAllWithPedidos(
      empresaId,
      boardId,
      role,
    );
  }

  @Get('pedidos/itens/:boardId')
  @ApiOperation({
    summary: 'Listar todos os status de pedido com itens por board',
  })
  @ApiParam({ name: 'boardId', description: 'ID do board' })
  findAllWithPedidosAndItens(
    @Request() req: { user: { empresaId: string; role: string } },
    @Param('boardId') boardId: string,
  ) {
    const empresaId = req.user.empresaId;
    const role = req.user.role;
    return this.pedidoStatusService.findAllWithPedidosAndItens(
      empresaId,
      boardId,
      role,
    );
  }

  @Put('reorder')
  @ApiOperation({ summary: 'Reordenar status de pedido' })
  @ApiBody({
    description: 'Array de status com suas novas ordens',
    schema: {
      type: 'object',
      properties: {
        updates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              ordem: { type: 'number' },
            },
          },
        },
      },
    },
  })
  async reorderStatus(
    @Request() req: { user: { empresaId: string } },
    @Body() data: { updates: Array<{ id: number; ordem: number }> },
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.reorderStatus(data.updates, empresaId);
  }
}
