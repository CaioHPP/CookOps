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
import { AssinaturaService } from './assinatura.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@Controller('assinaturas')
@UseGuards(JwtAuthGuard)
export class AssinaturaController {
  constructor(private readonly assinaturaService: AssinaturaService) {}

  @Post()
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateAssinaturaDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.findAll();
  }

  @Get(':id')
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.findOne(id);
  }

  @Put(':id')
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
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.remove(id);
  }

  @Get('empresa/:empresaId')
  findByEmpresaId(
    @Request() req: { user: { role: string } },
    @Param('empresaId') empresaId: string,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.assinaturaService.findByEmpresaId(empresaId);
  }
}
