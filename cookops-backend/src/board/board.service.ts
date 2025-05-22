import { Injectable } from '@nestjs/common';
import { Board, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BoardCreateInput): Promise<Board> {
    return this.prisma.board.create({ data });
  }

  findAll(): Promise<Board[]> {
    return this.prisma.board.findMany();
  }

  findOne(id: string): Promise<Board | null> {
    return this.prisma.board.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.BoardUpdateInput): Promise<Board> {
    return this.prisma.board.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<Board> {
    return this.prisma.board.delete({
      where: { id },
    });
  }

  findByEmpresaId(empresaId: string): Promise<Board[]> {
    return this.prisma.board.findMany({
      where: { empresaId },
    });
  }
}
