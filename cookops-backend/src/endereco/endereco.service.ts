import { Injectable, NotFoundException } from '@nestjs/common';
import { Endereco } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEnderecoDto): Promise<Endereco> {
    return this.prisma.endereco.create({ data });
  }

  findAll(): Promise<Endereco[]> {
    return this.prisma.endereco.findMany();
  }

  async findOne(id: string): Promise<Endereco> {
    const endereco = await this.prisma.endereco.findUnique({ where: { id } });
    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado');
    }
    return endereco;
  }

  update(id: string, data: UpdateEnderecoDto): Promise<Endereco> {
    return this.prisma.endereco.update({
      where: { id },
      data,
    });
  }

  remove(id: string): Promise<Endereco> {
    return this.prisma.endereco.delete({
      where: { id },
    });
  }
}
