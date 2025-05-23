import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const { empresaId, senha, ...rest } = data;
    const senhaHash = await bcrypt.hash(senha, 10);
    return this.prisma.usuario.create({
      data: {
        ...rest,
        senhaHash,
        empresa: { connect: { id: empresaId } },
      },
    });
  }

  findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  findOne(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
  findByEmpresaId(empresaId: string): Promise<Usuario[]> {
    return this.prisma.usuario.findMany({
      where: { empresaId },
    });
  }

  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    const { empresaId, senha, ...rest } = data;
    const updateData: Partial<UpdateUsuarioDto> & {
      senhaHash?: string;
      empresa?: any;
    } = { ...rest };
    if (senha) {
      const senhaHash = await bcrypt.hash(senha, 10);
      updateData.senhaHash = senhaHash;
    }

    if (empresaId) updateData.empresa = { connect: { id: empresaId } };
    return this.prisma.usuario.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: string): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
