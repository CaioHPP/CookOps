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
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({
    type: CreateUsuarioDto,
    description: 'Dados do usuário a ser criado',
  })
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateUsuarioDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({
    type: UpdateUsuarioDto,
    description: 'Dados para atualização do usuário',
  })
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdateUsuarioDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.remove(id);
  }
}
