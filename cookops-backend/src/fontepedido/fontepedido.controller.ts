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
import { CreateFontePedidoDto } from './dto/create-fontepedido.dto';
import { UpdateFontePedidoDto } from './dto/update-fontepedido.dto';
import { FontePedidoService } from './fontepedido.service';

@ApiTags('FontePedidos')
@ApiBearerAuth()
@Controller('fontepedidos')
@UseGuards(JwtAuthGuard)
export class FontePedidoController {
  constructor(private readonly fontePedidoService: FontePedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova fonte de pedido' })
  @ApiBody({
    type: CreateFontePedidoDto,
    description: 'Dados da fonte de pedido a ser criada',
  })
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateFontePedidoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as fontes de pedido' })
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma fonte de pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da fonte de pedido' })
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma fonte de pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da fonte de pedido' })
  @ApiBody({
    type: UpdateFontePedidoDto,
    description: 'Dados para atualização da fonte de pedido',
  })
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdateFontePedidoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma fonte de pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da fonte de pedido' })
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.remove(id);
  }
}
