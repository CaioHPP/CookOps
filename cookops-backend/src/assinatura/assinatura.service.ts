import { Injectable } from '@nestjs/common';
import { Assinatura } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@Injectable()
export class AssinaturaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAssinaturaDto): Promise<Assinatura> {
    return this.prisma.assinatura.create({ data });
  }

  findAll(): Promise<Assinatura[]> {
    return this.prisma.assinatura.findMany();
  }

  findOne(id: string): Promise<Assinatura | null> {
    return this.prisma.assinatura.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateAssinaturaDto): Promise<Assinatura> {
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
