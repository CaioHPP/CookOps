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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PedidoService } from 'src/pedido/pedido.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';

@ApiTags('Empresas')
@ApiBearerAuth()
@Controller('empresas')
@UseGuards(JwtAuthGuard)
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly pedidoService: PedidoService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiBody({
    type: CreateEmpresaDto,
    description: 'Dados da empresa a ser criada',
  })
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateEmpresaDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma empresa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma empresa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiBody({
    type: UpdateEmpresaDto,
    description: 'Dados para atualização da empresa',
  })
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdateEmpresaDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma empresa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.remove(id);
  }

  @Get('pedidos/ultimas-12-horas')
  @ApiOperation({
    summary: 'Buscar pedidos da empresa criados nas últimas 12 horas',
    description:
      'Retorna todos os pedidos da empresa do usuário autenticado que foram criados nas últimas 12 horas, ordenados por data de criação (mais recentes primeiro)',
  })
  findPedidosUltimas12Horas(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.pedidoService.findByEmpresaIdLast12Hours(empresaId);
  }
}
