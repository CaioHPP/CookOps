import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFormaPagamentoDto } from './dto/create-formapagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-formapagamento.dto';
import { FormaPagamentoService } from './formapagamento.service';

@Controller('formapagamentos')
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(@Body() data: CreateFormaPagamentoDto) {
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
  update(@Param('id') id: string, @Body() data: UpdateFormaPagamentoDto) {
    return this.formaPagamentoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formaPagamentoService.remove(id);
  }
}
