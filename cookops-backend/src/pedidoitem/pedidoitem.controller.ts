import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePedidoItemDto } from './dto/create-pedidoitem.dto';
import { UpdatePedidoItemDto } from './dto/update-pedidoitem.dto';
import { PedidoItemService } from './pedidoitem.service';

@Controller('pedidoitens')
export class PedidoItemController {
  constructor(private readonly pedidoItemService: PedidoItemService) {}

  @Post()
  create(@Body() data: CreatePedidoItemDto) {
    return this.pedidoItemService.create(data);
  }

  @Get()
  findAll() {
    return this.pedidoItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoItemService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdatePedidoItemDto) {
    return this.pedidoItemService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoItemService.remove(id);
  }
}
