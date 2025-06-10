import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { CentralWebSocketGateway } from 'src/common/gateways/central-websocket.gateway';
import { PrismaService } from '../prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    private prisma: PrismaService,
    private centralGateway: CentralWebSocketGateway,
  ) {}

  async create(data: CreateProdutoDto, empresaId: string): Promise<Produto> {
    const produto = await this.prisma.produto.create({
      data: {
        ...data,
        empresa: { connect: { id: empresaId } },
      },
    });

    // Emitir evento WebSocket de produto criado
    this.centralGateway.emitProdutoCriado(
      {
        produto,
        produtoId: produto.id,
      },
      empresaId,
    );

    return produto;
  }

  findAll(): Promise<Produto[]> {
    return this.prisma.produto.findMany();
  }

  async findOne(id: string): Promise<Produto> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async update(
    id: string,
    data: UpdateProdutoDto,
    empresaId: string,
  ): Promise<Produto> {
    const produto = await this.prisma.produto.update({
      where: { id },
      data: {
        ...data,
        ...(empresaId && { empresa: { connect: { id: empresaId } } }),
      },
    });

    // Emitir evento WebSocket baseado no tipo de atualização
    if (data.ativo !== undefined) {
      // Se mudou o status ativo
      this.centralGateway.emitStatusProdutoAlterado(
        {
          produto,
          produtoId: produto.id,
        },
        empresaId,
      );
    } else {
      // Atualização geral
      this.centralGateway.emitProdutoAtualizado(
        {
          produto,
          produtoId: produto.id,
        },
        empresaId,
      );
    }

    return produto;
  }

  async remove(id: string, empresaId: string): Promise<Produto> {
    const produto = await this.prisma.produto.delete({
      where: { id },
    });

    // Emitir evento WebSocket de produto removido
    this.centralGateway.emitProdutoRemovido(id, empresaId);

    return produto;
  }

  findByEmpresaId(empresaId: string): Promise<Produto[]> {
    return this.prisma.produto.findMany({
      where: { empresaId },
    });
  }
}
