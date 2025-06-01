import { Injectable, NotFoundException } from '@nestjs/common';
import { Empresa } from '@prisma/client';
import { BoardService } from 'src/board/board.service';
import { FormaPagamentoService } from 'src/formapagamento/formapagamento.service';
import { PedidoStatusService } from 'src/pedidostatus/pedidostatus.service';
import { PrismaService } from '../prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    private prisma: PrismaService,
    private boardService: BoardService,
    private pedidoStatusService: PedidoStatusService,
    private formaPagamentoService: FormaPagamentoService,
  ) {}

  async create(data: CreateEmpresaDto): Promise<Empresa> {
    const { planoAtualId, ...rest } = data;
    const empresa = await this.prisma.empresa.create({
      data: {
        ...rest,
        plano: { connect: { id: planoAtualId } },
      },
    });

    const board = await this.boardService.create(
      {
        titulo: 'Quadro Principal',
      },
      empresa.id,
    );

    const statusDefault = [
      'Recebido',
      'Em preparo',
      'Pronto',
      'Em entrega',
      'Finalizado',
    ];

    await Promise.all(
      statusDefault.map(
        async (titulo, index) =>
          await this.pedidoStatusService.create({
            boardId: board.id,
            titulo,
            ordem: index + 1,
          }),
      ),
    );

    await this.formaPagamentoService.create({
      empresaId: empresa.id,
      nome: 'Dinheiro',
    });
    await this.formaPagamentoService.create({
      empresaId: empresa.id,
      nome: 'Cartão de Crédito',
    });
    await this.formaPagamentoService.create({
      empresaId: empresa.id,
      nome: 'Cartão de Débito',
    });

    return empresa;
  }

  findAll(): Promise<Empresa[]> {
    return this.prisma.empresa.findMany();
  }

  async findOne(id: string): Promise<Empresa> {
    const empresa = await this.prisma.empresa.findUnique({ where: { id } });
    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return empresa;
  }

  update(id: string, data: UpdateEmpresaDto): Promise<Empresa> {
    const { planoAtualId, ...rest } = data;
    return this.prisma.empresa.update({
      where: { id },
      data: {
        ...rest,
        ...(planoAtualId && { plano: { connect: { id: planoAtualId } } }),
      },
    });
  }

  remove(id: string): Promise<Empresa> {
    return this.prisma.empresa.delete({
      where: { id },
    });
  }
}
