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
import { FormaPagamentoService } from './formapagamento.service';

@Controller('formapagamentos')
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(@Body() data: Prisma.FormaPagamentoCreateInput) {
    return this.formaPagamentoService.create(data);
  }

  @Get()
  findAll() {
    return this.formaPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formaPagamentoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.FormaPagamentoUpdateInput,
  ) {
    return this.formaPagamentoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formaPagamentoService.remove(id);
  }
}
