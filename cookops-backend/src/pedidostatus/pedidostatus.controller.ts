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
import { CreatePedidoStatusDto } from './dto/create-pedidostatus.dto';
import { UpdatePedidoStatusDto } from './dto/update-pedidostatus.dto';
import { PedidoStatusService } from './pedidostatus.service';

@Controller('pedidostatus')
@UseGuards(JwtAuthGuard)
export class PedidoStatusController {
  constructor(private readonly pedidoStatusService: PedidoStatusService) {}

  @Post()
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreatePedidoStatusDto,
  ) {
    const empresaId = req.user.empresaId;
    // ...empresaId disponível para uso futuro...
    return this.pedidoStatusService.create(data);
  }

  @Get()
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.pedidoStatusService.findAll();
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.findOne(id);
  }

  @Put(':id')
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdatePedidoStatusDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.update(id, data);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.remove(id);
  }

  @Get('board/:id')
  findByBoardId(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.pedidoStatusService.findByBoardId(id);
  }
}
