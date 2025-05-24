import { Injectable } from '@nestjs/common';
import { Empresa } from '@prisma/client';
import { BoardService } from 'src/board/board.service';
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
      statusDefault.map((titulo, index) =>
        this.pedidoStatusService.create({
          boardId: board.id,
          titulo,
          ordem: index + 1,
        }),
      ),
    );

    return empresa;
  }

  findAll(): Promise<Empresa[]> {
    return this.prisma.empresa.findMany();
  }

  findOne(id: string): Promise<Empresa | null> {
    return this.prisma.empresa.findUnique({ where: { id } });
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
