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
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
@UseGuards(JwtAuthGuard)
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreatePedidoDto,
  ) {
    const empresaId = req.user.empresaId;
    // ...empresaId disponível para uso futuro...
    return this.pedidoService.create(data, empresaId);
  }

  @Get()
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.findOne(id);
  }

  @Put(':id')
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdatePedidoDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.update(id, data, empresaId);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.remove(id);
  }

  @Get('empresa/')
  findByEmpresaId(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.findByEmpresaId(empresaId);
  }
}
