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
import { LogMovimentacaoService } from './logmovimentacao.service';

@Controller('logmovimentacoes')
export class LogMovimentacaoController {
  constructor(
    private readonly logMovimentacaoService: LogMovimentacaoService,
  ) {}

  @Post()
  create(@Body() data: Prisma.LogMovimentacaoCreateInput) {
    return this.logMovimentacaoService.create(data);
  }

  @Get()
  findAll() {
    return this.logMovimentacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logMovimentacaoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.LogMovimentacaoUpdateInput,
  ) {
    return this.logMovimentacaoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logMovimentacaoService.remove(id);
  }
}
