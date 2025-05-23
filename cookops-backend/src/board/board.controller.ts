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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreateBoardDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.create(data, empresaId);
  }

  @Get()
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.findOne(id);
  }

  @Put(':id')
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdateBoardDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.update(id, data, empresaId);
  }

  @Delete(':id')
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.remove(id);
  }

  @Get('empresa/')
  findByEmpresaId(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.boardService.findByEmpresaId(empresaId);
  }
}
