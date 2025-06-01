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
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PlanoService } from './plano.service';

@ApiTags('Planos')
@ApiBearerAuth()
@Controller('planos')
@UseGuards(JwtAuthGuard)
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo plano' })
  @ApiBody({ type: CreatePlanoDto, description: 'Dados do plano a ser criado' })
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreatePlanoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os planos' })
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um plano pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do plano' })
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um plano pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do plano' })
  @ApiBody({
    type: UpdatePlanoDto,
    description: 'Dados para atualização do plano',
  })
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdatePlanoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um plano pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do plano' })
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.remove(id);
  }
}
