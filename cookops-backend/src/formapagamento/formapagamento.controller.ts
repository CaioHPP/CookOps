import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateFormaPagamentoDto } from './dto/create-formapagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-formapagamento.dto';
import { FormaPagamentoService } from './formapagamento.service';

@Controller('formapagamentos')
@UseGuards(JwtAuthGuard)
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateFormaPagamentoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.formaPagamentoService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.formaPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.formaPagamentoService.findOne(id);
  }

  @Put(':id')
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdateFormaPagamentoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.formaPagamentoService.update(id, data);
  }

  @Delete(':id')
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.formaPagamentoService.remove(id);
  }
}
