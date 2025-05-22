import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    // Aqui você pode adicionar lógica para hash de senha, etc.
    return this.prisma.usuario.create({
      data: {
        ...data,
        senhaHash: data.senha,
        senha: undefined, // Remove o campo senha se necessário
      } as any,
    });
  }

  findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  findOne(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    // Se for atualizar a senha, trate aqui
    const { senha, ...rest } = data as any;
    const updateData: any = { ...rest };
    if (senha) updateData.senhaHash = senha;
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
