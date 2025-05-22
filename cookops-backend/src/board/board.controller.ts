import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() data: CreateBoardDto) {
    return this.boardService.create(data);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateBoardDto) {
    return this.boardService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }

  @Get('empresa/:empresaId')
  findByEmpresaId(@Param('empresaId') empresaId: string) {
    return this.boardService.findByEmpresaId(empresaId);
  }
}
