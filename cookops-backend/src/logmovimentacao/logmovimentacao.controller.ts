import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateLogMovimentacaoDto } from './dto/create-logmovimentacao.dto';
import { UpdateLogMovimentacaoDto } from './dto/update-logmovimentacao.dto';
import { LogMovimentacaoService } from './logmovimentacao.service';

@Controller('logmovimentacoes')
export class LogMovimentacaoController {
  constructor(
    private readonly logMovimentacaoService: LogMovimentacaoService,
  ) {}

  @Post()
  create(@Body() data: CreateLogMovimentacaoDto) {
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
  update(@Param('id') id: string, @Body() data: UpdateLogMovimentacaoDto) {
    return this.logMovimentacaoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logMovimentacaoService.remove(id);
  }
}
