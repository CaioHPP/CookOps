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
import { PlanoService } from './plano.service';

@Controller('planos')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  create(@Body() data: Prisma.PlanoCreateInput) {
    return this.planoService.create(data);
  }

  @Get()
  findAll() {
    return this.planoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.PlanoUpdateInput) {
    return this.planoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planoService.remove(id);
  }
}
