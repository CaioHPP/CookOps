import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() data: CreateEmpresaDto) {
    return this.empresaService.create(data);
  }

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateEmpresaDto) {
    return this.empresaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(id);
  }
}
