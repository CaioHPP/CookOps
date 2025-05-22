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
import { PedidoStatusService } from './pedidostatus.service';

@Controller('pedidostatus')
export class PedidoStatusController {
  constructor(private readonly pedidoStatusService: PedidoStatusService) {}

  @Post()
  create(@Body() data: Prisma.PedidoStatusCreateInput) {
    return this.pedidoStatusService.create(data);
  }

  @Get()
  findAll() {
    return this.pedidoStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoStatusService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.PedidoStatusUpdateInput,
  ) {
    return this.pedidoStatusService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoStatusService.remove(id);
  }
}
