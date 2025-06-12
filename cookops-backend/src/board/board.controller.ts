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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo board' })
  @ApiBody({ type: CreateBoardDto, description: 'Dados do board a ser criado' })
  create(
    @Request() req: { user: { empresaId: string } },
    @Body() data: CreateBoardDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.create(data, empresaId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os boards (apenas ADMIN)' })
  findAll(@Request() req: { user: { role: string; empresaId: string } }) {
    const empresaId = req.user.empresaId;
    if (req.user.role !== 'ADMIN')
      throw new ForbiddenException('Acesso negado');
    return this.boardService.findAll();
  }

  @Get('empresa/')
  @ApiOperation({ summary: 'Listar boards da empresa do usuário autenticado' })
  findByEmpresaId(@Request() req: { user: { empresaId: string } }) {
    const empresaId = req.user.empresaId;
    return this.boardService.findByEmpresaId(empresaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um board pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do board' })
  findOne(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um board pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do board' })
  @ApiBody({
    type: UpdateBoardDto,
    description: 'Dados para atualização do board',
  })
  update(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
    @Body() data: UpdateBoardDto,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.update(id, data, empresaId);
  }

  @Put(':id/set-default')
  @ApiOperation({ summary: 'Definir um board como padrão para a empresa' })
  @ApiParam({ name: 'id', description: 'ID do board' })
  setDefault(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.setDefault(id, empresaId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um board pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do board' })
  remove(
    @Request() req: { user: { empresaId: string } },
    @Param('id') id: string,
  ) {
    const empresaId = req.user.empresaId;
    return this.boardService.remove(id);
  }
}
