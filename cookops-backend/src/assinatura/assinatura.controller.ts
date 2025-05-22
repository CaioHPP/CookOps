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
import { AssinaturaService } from './assinatura.service';

@Controller('assinaturas')
export class AssinaturaController {
  constructor(private readonly assinaturaService: AssinaturaService) {}

  @Post()
  create(@Body() data: Prisma.AssinaturaCreateInput) {
    return this.assinaturaService.create(data);
  }

  @Get()
  findAll() {
    return this.assinaturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assinaturaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.AssinaturaUpdateInput) {
    return this.assinaturaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assinaturaService.remove(id);
  }

  @Get('empresa/:empresaId')
  findByEmpresaId(@Param('empresaId') empresaId: string) {
    return this.assinaturaService.findByEmpresaId(empresaId);
  }
}
