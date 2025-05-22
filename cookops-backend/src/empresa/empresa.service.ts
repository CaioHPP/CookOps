import { Injectable } from '@nestjs/common';
import { Empresa, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EmpresaCreateInput): Promise<Empresa> {
    return this.prisma.empresa.create({ data });
  }

  findAll(): Promise<Empresa[]> {
    return this.prisma.empresa.findMany();
  }

  findOne(id: string): Promise<Empresa | null> {
    return this.prisma.empresa.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.EmpresaUpdateInput): Promise<Empresa> {
    return this.prisma.empresa.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<Empresa> {
    return this.prisma.empresa.delete({
      where: { id },
    });
  }
}
