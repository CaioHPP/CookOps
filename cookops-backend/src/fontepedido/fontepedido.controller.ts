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
import { CreateFontePedidoDto } from './dto/create-fontepedido.dto';
import { UpdateFontePedidoDto } from './dto/update-fontepedido.dto';
import { FontePedidoService } from './fontepedido.service';

@Controller('fontepedidos')
@UseGuards(JwtAuthGuard)
export class FontePedidoController {
  constructor(private readonly fontePedidoService: FontePedidoService) {}

  @Post()
  create(
    @Request() req: { user: { role: string } },
    @Body() data: CreateFontePedidoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.findAll();
  }

  @Get(':id')
  findOne(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.findOne(id);
  }

  @Put(':id')
  update(
    @Request() req: { user: { role: string } },
    @Param('id') id: string,
    @Body() data: UpdateFontePedidoDto,
  ) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.update(id, data);
  }

  @Delete(':id')
  remove(@Request() req: { user: { role: string } }, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.fontePedidoService.remove(id);
  }
}
