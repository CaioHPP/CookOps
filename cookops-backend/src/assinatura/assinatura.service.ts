import { Injectable } from '@nestjs/common';
import { Assinatura, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssinaturaService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AssinaturaCreateInput): Promise<Assinatura> {
    return this.prisma.assinatura.create({ data });
  }

  findAll(): Promise<Assinatura[]> {
    return this.prisma.assinatura.findMany();
  }

  findOne(id: string): Promise<Assinatura | null> {
    return this.prisma.assinatura.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.AssinaturaUpdateInput): Promise<Assinatura> {
    return this.prisma.assinatura.update({
      where: { id },
      data,
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
