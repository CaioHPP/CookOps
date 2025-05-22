import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PedidoItemService } from './pedidoitem.service';

@Controller('pedidoitens')
export class PedidoItemController {
  constructor(private readonly pedidoItemService: PedidoItemService) {}

  @Post()
  create(@Body() data: Prisma.PedidoItemCreateInput) {
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
  update(@Param('id') id: string, @Body() data: Prisma.PedidoItemUpdateInput) {
    return this.pedidoItemService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoItemService.remove(id);
  }
}
