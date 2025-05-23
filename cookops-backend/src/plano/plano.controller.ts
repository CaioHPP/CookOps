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
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PlanoService } from './plano.service';

@Controller('planos')
@UseGuards(JwtAuthGuard)
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreatePlanoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.findAll();
  }

  @Get(':id')
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.findOne(id);
  }

  @Put(':id')
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
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.planoService.remove(id);
  }
}
