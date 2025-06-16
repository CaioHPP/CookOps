import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBoardDto, empresaId: string): Promise<Board> {
    return this.prisma.board.create({
      data: {
        ...data,
        empresa: { connect: { id: empresaId } },
      },
    });
  }

  findAll(): Promise<Board[]> {
    return this.prisma.board.findMany();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board) {
      throw new NotFoundException('Board não encontrado');
    }
    return board;
  }

  update(id: string, data: UpdateBoardDto, empresaId: string): Promise<Board> {
    return this.prisma.board.update({
      where: { id },
      data: {
        ...data,
        ...(empresaId && { empresa: { connect: { id: empresaId } } }),
      },
    });
  }

  async remove(id: string): Promise<Board> {
    // First, check if there are any PedidoStatus related to this board
    const statusCount = await this.prisma.pedidoStatus.count({
      where: { boardId: id },
    });

    if (statusCount > 0) {
      // Check if any of these status have related pedidos
      const statusWithPedidos = await this.prisma.pedidoStatus.count({
        where: {
          boardId: id,
          pedidos: {
            some: {},
          },
        },
      });

      if (statusWithPedidos > 0) {
        // If there are status with pedidos, mark board as inactive
        const board = await this.prisma.board.findUnique({ where: { id } });
        if (!board) {
          throw new NotFoundException('Board não encontrado');
        }

        const newTitle = board.titulo.startsWith('[INATIVO]')
          ? board.titulo
          : `[INATIVO] ${board.titulo}`;

        return this.prisma.board.update({
          where: { id },
          data: { titulo: newTitle },
        });
      } else {
        // If there are status but no pedidos, delete status first then board
        await this.prisma.pedidoStatus.deleteMany({
          where: { boardId: id },
        });

        return this.prisma.board.delete({
          where: { id },
        });
      }
    }

    // If no related status, we can safely delete the board
    return this.prisma.board.delete({
      where: { id },
    });
  }

  findByEmpresaId(empresaId: string): Promise<Board[]> {
    if (!empresaId) {
      throw new Error('Empresa ID não fornecido');
    }
    return this.prisma.board.findMany({
      where: { empresaId },
    });
  }

  async setDefault(id: string, empresaId: string): Promise<Board> {
    // Verify that the board exists and belongs to the company
    const board = await this.prisma.board.findFirst({
      where: { id, empresaId },
    });

    if (!board) {
      throw new NotFoundException(
        'Board não encontrado ou não pertence à empresa',
      );
    }

    // For now, we'll just return the board since we don't have a defaultBoardId field
    // In a future migration, you could add a defaultBoardId field to ConfiguracaoEmpresa
    // and update the configuration here

    return board;
  }

  async toggleActive(id: string, empresaId: string): Promise<Board> {
    const board = await this.prisma.board.findFirst({
      where: { id, empresaId },
    });

    if (!board) {
      throw new NotFoundException(
        'Board não encontrado ou não pertence à empresa',
      );
    }

    const isInactive = board.titulo.startsWith('[INATIVO]');
    let newTitle: string;

    if (isInactive) {
      // Reactivate: remove [INATIVO] prefix
      newTitle = board.titulo.replace('[INATIVO] ', '');
    } else {
      // Deactivate: add [INATIVO] prefix
      newTitle = `[INATIVO] ${board.titulo}`;
    }

    return this.prisma.board.update({
      where: { id },
      data: { titulo: newTitle },
    });
  }

  isInactive(board: Board): boolean {
    return board.titulo.startsWith('[INATIVO]');
  }
}
