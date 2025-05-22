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
import { EnderecoService } from './endereco.service';

@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  create(@Body() data: Prisma.EnderecoCreateInput) {
    return this.enderecoService.create(data);
  }

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.EnderecoUpdateInput) {
    return this.enderecoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(id);
  }
}
