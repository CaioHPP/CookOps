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
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
@UseGuards(JwtAuthGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateUsuarioDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
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
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.usuarioService.remove(id);
  }
}
