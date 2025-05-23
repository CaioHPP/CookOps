import { Injectable } from '@nestjs/common';
import { Assinatura } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@Injectable()
export class AssinaturaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAssinaturaDto): Promise<Assinatura> {
    const { empresaId, planoId, ...rest } = data;
    return this.prisma.assinatura.create({
      data: {
        ...rest,
        empresa: { connect: { id: empresaId } },
        plano: { connect: { id: planoId } },
      },
    });
  }

  findAll(): Promise<Assinatura[]> {
    return this.prisma.assinatura.findMany();
  }

  findOne(id: string): Promise<Assinatura | null> {
    return this.prisma.assinatura.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateAssinaturaDto): Promise<Assinatura> {
    const { empresaId, planoId, ...rest } = data;
    return this.prisma.assinatura.update({
      where: { id },
      data: {
        ...rest,
        ...(empresaId && { empresa: { connect: { id: empresaId } } }),
        ...(planoId && { plano: { connect: { id: planoId } } }),
      },
    });
  }

  remove(id: string): Promise<Assinatura> {
    return this.prisma.assinatura.delete({
      where: { id },
    });
  }

  findByEmpresaId(empresaId: string): Promise<Assinatura | null> {
    return this.prisma.assinatura.findUnique({
      where: { empresaId },
    });
  }
}
