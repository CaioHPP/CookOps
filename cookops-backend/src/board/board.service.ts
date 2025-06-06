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

  remove(id: string): Promise<Board> {
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
}
