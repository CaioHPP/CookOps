import { Injectable } from '@nestjs/common';
import { Pedido } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePedidoDto): Promise<Pedido> {
    // Remove scalar foreign keys from data before spreading
    const {
      empresaId,
      statusId,
      pagamentoId,
      fonteId,
      enderecoId,
      itens,
      ...rest
    } = data;

    return this.prisma.pedido.create({
      data: {
        ...rest,
        itens: {
          create: itens?.map((item) => ({
            produto: { connect: { id: item.produtoId } },
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            observacao: item.observacao,
          })),
        },
        empresa: { connect: { id: empresaId } },
        status: { connect: { id: statusId } },
        pagamento: { connect: { id: pagamentoId } },
        fonte: { connect: { id: fonteId } },
        ...(enderecoId && {
          endereco: { connect: { id: enderecoId } },
        }),
      },
    });
  }

  findAll(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany();
  }

  findOne(id: string): Promise<Pedido | null> {
    return this.prisma.pedido.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdatePedidoDto): Promise<Pedido> {
    // Remove scalar foreign keys from data before spreading
    const {
      empresaId,
      statusId,
      pagamentoId,
      fonteId,
      enderecoId,
      itens,
      ...rest
    } = data;

    return this.prisma.pedido.update({
      where: { id },
      data: {
        ...rest,
        ...(empresaId && { empresa: { connect: { id: empresaId } } }),
        ...(statusId && { status: { connect: { id: statusId } } }),
        ...(pagamentoId && { pagamento: { connect: { id: pagamentoId } } }),
        ...(fonteId && { fonte: { connect: { id: fonteId } } }),
        ...(enderecoId && { endereco: { connect: { id: enderecoId } } }),
        ...(itens && {
          itens: {
            deleteMany: {}, // remove todos e recria, simples mas funcional
            create: itens
              .filter(
                (item) =>
                  item.produtoId !== undefined &&
                  item.quantidade !== undefined &&
                  item.precoUnitario !== undefined &&
                  item.observacao !== undefined,
              )
              .map((item) => ({
                ...(item.id && { id: item.id }), // opcional
                produto: { connect: { id: item.produtoId! } },
                quantidade: item.quantidade!,
                precoUnitario: item.precoUnitario!,
                observacao: item.observacao!,
              })),
          },
        }),
      },
    });
  }

  remove(id: string): Promise<Pedido> {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }

  findByEmpresaId(empresaId: string): Promise<Pedido[]> {
    return this.prisma.pedido.findMany({
      where: { empresaId },
    });
  }
}
