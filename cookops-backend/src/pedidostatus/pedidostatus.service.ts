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

  async findOne(id: number): Promise<PedidoStatus> {
    const status = await this.prisma.pedidoStatus.findUnique({ where: { id } });
    if (!status) {
      throw new NotFoundException('Status de pedido não encontrado');
    }
    return status;
  }

  update(id: number, data: UpdatePedidoStatusDto): Promise<PedidoStatus> {
    const { boardId, ...rest } = data;
    return this.prisma.pedidoStatus.update({
      where: { id },
      data: {
        ...rest,
        ...(boardId && { board: { connect: { id: boardId } } }),
      },
    });
  }

  remove(id: number): Promise<PedidoStatus> {
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

  async findFirstByBoardId(boardId: string): Promise<PedidoStatus> {
    const status = await this.prisma.pedidoStatus.findFirst({
      where: { boardId },
      orderBy: { ordem: 'asc' },
    });
    if (!status) {
      throw new NotFoundException(
        'Status não encontrado para o boardId fornecido',
      );
    }
    return status;
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

  async findAllWithPedidosAndItens(
    empresaId: string,
    boardId?: string,
    role?: string,
  ) {
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
          include: {
            itens: {
              include: {
                produto: true,
              },
            },
            fonte: true,
            pagamento: true,
            endereco: true,
          },
        },
      },
    });

    return statusList.map((status) => ({
      statusId: status.id,
      titulo: status.titulo,
      ordem: status.ordem,
      pedidos: status.pedidos.map((pedido) => ({
        id: pedido.id,
        empresaId: pedido.empresaId,
        codigo: pedido.codigo,
        desconto: pedido.desconto,
        taxaEntrega: pedido.taxaEntrega,
        valorTotal: pedido.valorTotal,
        observacao: pedido.observacao,
        criadoEm: pedido.criadoEm,
        concluidoEm: pedido.concluidoEm,
        itens: pedido.itens,
        fonte: pedido.fonte,
        pagamento: pedido.pagamento,
        endereco: pedido.endereco,
      })),
    }));
  }

  async findByOrdem(boardId: string, ordem: number): Promise<PedidoStatus> {
    const status = await this.prisma.pedidoStatus.findFirst({
      where: {
        boardId: boardId,
        ordem: ordem,
      },
    });
    if (!status) {
      throw new NotFoundException(
        'Status não encontrado para a ordem fornecida',
      );
    }
    return status;
  }
}
