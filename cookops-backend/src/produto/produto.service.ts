import { Injectable } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProdutoDto, empresaId: string): Promise<Produto> {
    return this.prisma.produto.create({
      data: {
        ...data,
        empresa: { connect: { id: empresaId } },
      },
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

  update(
    id: string,
    data: UpdateProdutoDto,
    empresaId: string,
  ): Promise<Produto> {
    return this.prisma.produto.update({
      where: { id },
      data: {
        ...data,
        ...(empresaId && { empresa: { connect: { id: empresaId } } }),
      },
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
