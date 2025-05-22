import { Injectable } from '@nestjs/common';
import { Prisma, Produto } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    return this.prisma.produto.create({
      data,
    });
  }
  findAll(): Promise<Produto[]> {
    return this.prisma.produto.findMany();
  }
  findOne(id: string): Promise<Produto | null> {
    return this.prisma.produto.findUnique({
      where: { id },
    });
  }
  update(id: string, data: Prisma.ProdutoUpdateInput): Promise<Produto> {
    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }
  remove(id: string): Promise<Produto> {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
  findByEmpresaId(empresaId: string): Promise<Produto[]> {
    return this.prisma.produto.findMany({
      where: { empresaId },
    });
  }
}
