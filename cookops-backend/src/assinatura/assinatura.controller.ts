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
import { AssinaturaService } from './assinatura.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@ApiTags('Assinaturas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assinaturas')
export class AssinaturaController {
  constructor(private readonly assinaturaService: AssinaturaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova assinatura' })
  @ApiBody({
    type: CreateAssinaturaDto,
    description: 'Dados da assinatura a ser criada',
  })
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateAssinaturaDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as assinaturas' })
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma assinatura pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da assinatura' })
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma assinatura pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da assinatura' })
  @ApiBody({
    type: UpdateAssinaturaDto,
    description: 'Dados para atualização da assinatura',
  })
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdateAssinaturaDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma assinatura pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da assinatura' })
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.remove(id);
  }

  @Get('empresa/:empresaId')
  @ApiOperation({ summary: 'Listar assinaturas por empresa' })
  @ApiParam({ name: 'empresaId', description: 'ID da empresa' })
  findByEmpresaId(
    @Request() req: { user: { role: string } },
    @Param('empresaId') empresaId: string,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.findByEmpresaId(empresaId);
  }
}
