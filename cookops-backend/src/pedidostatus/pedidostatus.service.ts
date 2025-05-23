import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidoStatus } from '@prisma/client';
import { BoardService } from 'src/board/board.service';
import { PrismaService } from '../prisma.service';
import { CreatePedidoStatusDto } from './dto/create-pedidostatus.dto';
import { UpdatePedidoStatusDto } from './dto/update-pedidostatus.dto';

@Injectable()
export class PedidoStatusService {
  constructor(
    private prisma: PrismaService,
    private boardService: BoardService,
  ) {}

  create(data: CreatePedidoStatusDto): Promise<PedidoStatus> {
    const { boardId, ...rest } = data;
    return this.prisma.pedidoStatus.create({
      data: {
        ...rest,
        board: { connect: { id: boardId } },
      },
    });
  }

  findAll(): Promise<PedidoStatus[]> {
    return this.prisma.pedidoStatus.findMany();
  }

  findOne(id: string): Promise<PedidoStatus | null> {
    return this.prisma.pedidoStatus.findUnique({ where: { id } });
  }

  update(id: string, data: UpdatePedidoStatusDto): Promise<PedidoStatus> {
    const { boardId, ...rest } = data;
    return this.prisma.pedidoStatus.update({
      where: { id },
      data: {
        ...rest,
        ...(boardId && { board: { connect: { id: boardId } } }),
      },
    });
  }

  remove(id: string): Promise<PedidoStatus> {
    return this.prisma.pedidoStatus.delete({
      where: { id },
    });
  }

  findByBoardId(boardId: string): Promise<PedidoStatus[]> {
    return this.prisma.pedidoStatus.findMany({
      where: { boardId },
      orderBy: { ordem: 'asc' },
    });
  }

  async findAllWithPedidos(empresaId: string, boardId?: string, role?: string) {
    if (!boardId) {
      const boards = await this.boardService.findByEmpresaId(empresaId);
      if (!boards || boards.length === 0)
        throw new NotFoundException('Board não encontrado');
      boardId = boards[0].id;
    } else {
      const board = await this.boardService.findOne(boardId);

      if (!board) throw new NotFoundException('Board não encontrado');
      if (board.empresaId !== empresaId && role !== 'ADMIN') {
        throw new NotFoundException('Board não encontrado');
      }
    }

    const statusList = await this.prisma.pedidoStatus.findMany({
      where: { boardId: boardId },
      orderBy: { ordem: 'asc' },
      include: {
        pedidos: {
          orderBy: { criadoEm: 'asc' },
        },
      },
    });

    return statusList.map((status) => ({
      statusId: status.id,
      titulo: status.titulo,
      ordem: status.ordem,
      pedidos: status.pedidos,
    }));
  }
}
