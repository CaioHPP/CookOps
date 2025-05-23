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
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('empresas')
@UseGuards(JwtAuthGuard)
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateEmpresaDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.findOne(id);
  }

  @Put(':id')
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
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.empresaService.remove(id);
  }
}
