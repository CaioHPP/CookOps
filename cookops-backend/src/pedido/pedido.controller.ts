import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() data: CreatePedidoDto) {
    return this.pedidoService.create(data);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePedidoDto) {
    return this.pedidoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(id);
  }

  @Get('empresa/:empresaId')
  findByEmpresaId(@Param('empresaId') empresaId: string) {
    return this.pedidoService.findByEmpresaId(empresaId);
  }
}
