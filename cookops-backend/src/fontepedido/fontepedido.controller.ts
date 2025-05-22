import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFontePedidoDto } from './dto/create-fontepedido.dto';
import { UpdateFontePedidoDto } from './dto/update-fontepedido.dto';
import { FontePedidoService } from './fontepedido.service';

@Controller('fontepedidos')
export class FontePedidoController {
  constructor(private readonly fontePedidoService: FontePedidoService) {}

  @Post()
  create(@Body() data: CreateFontePedidoDto) {
    return this.fontePedidoService.create(data);
  }

  @Get()
  findAll() {
    return this.fontePedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fontePedidoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateFontePedidoDto) {
    return this.fontePedidoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fontePedidoService.remove(id);
  }
}
