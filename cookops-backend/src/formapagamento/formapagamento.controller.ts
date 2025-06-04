import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateFormaPagamentoDto } from './dto/create-formapagamento.dto';
import { ToggleStatusFormaPagamentoDto } from './dto/toggle-status-formapagamento.dto';
import { UpdateFormaPagamentoDto } from './dto/update-formapagamento.dto';
import { FormaPagamentoService } from './formapagamento.service';

@ApiTags('FormaPagamentos')
@ApiBearerAuth()
@Controller('formapagamentos')
@UseGuards(JwtAuthGuard)
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova forma de pagamento' })
  @ApiBody({
    type: CreateFormaPagamentoDto,
    description: 'Dados da forma de pagamento a ser criada',
  })
  create(
    @Request() req: { user: { role: string; empresaId: string } },
    @Body() data: CreateFormaPagamentoDto,
  ) {
    data.empresaId = req.user.empresaId;
    return this.formaPagamentoService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as formas de pagamento' })
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.formaPagamentoService.findAll();
  }

  @Get('empresa/')
  @ApiOperation({
    summary: 'Listar formas de pagamento da empresa do usuário autenticado',
  })
  findByEmpresaId(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.formaPagamentoService.findByEmpresaId(empresaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma forma de pagamento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da forma de pagamento' })
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: number) {
    return this.formaPagamentoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma forma de pagamento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da forma de pagamento' })
  @ApiBody({
    type: UpdateFormaPagamentoDto,
    description: 'Dados para atualização da forma de pagamento',
  })
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: number,
    @Body() data: UpdateFormaPagamentoDto,
  ) {
    return this.formaPagamentoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma forma de pagamento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da forma de pagamento' })
  remove(@Request() req: { user: { role: string } }, @Param('id') id: number) {
    return this.formaPagamentoService.remove(id);
  }

  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Ativar/desativar uma forma de pagamento' })
  @ApiParam({ name: 'id', description: 'ID da forma de pagamento' })
  @ApiBody({
    type: ToggleStatusFormaPagamentoDto,
    description: 'Status ativo/inativo da forma de pagamento',
  })
  toggleStatus(
    @Request() req: { user: { role: string; empresaId: string } },
    @Param('id') id: number,
    @Body() data: ToggleStatusFormaPagamentoDto,
  ) {
    return this.formaPagamentoService.toggleStatus(id, data);
  }
}
