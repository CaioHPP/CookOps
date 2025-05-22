import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AssinaturaService } from './assinatura.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@Controller('assinaturas')
export class AssinaturaController {
  constructor(private readonly assinaturaService: AssinaturaService) {}

  @Post()
  create(@Body() data: CreateAssinaturaDto) {
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
  update(@Param('id') id: string, @Body() data: UpdateAssinaturaDto) {
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
