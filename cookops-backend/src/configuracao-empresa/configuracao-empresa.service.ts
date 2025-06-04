import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConfiguracaoEmpresaResponseDto } from './dto/configuracao-empresa-response.dto';
import { CreateConfiguracaoEmpresaDto } from './dto/create-configuracao-empresa.dto';
import { UpdateConfiguracaoEmpresaDto } from './dto/update-configuracao-empresa.dto';

@Injectable()
export class ConfiguracaoEmpresaService {
  constructor(private prisma: PrismaService) {}

  async create(
    createConfiguracaoEmpresaDto: CreateConfiguracaoEmpresaDto,
  ): Promise<ConfiguracaoEmpresaResponseDto> {
    const configuracao = await this.prisma.configuracaoEmpresa.create({
      data: createConfiguracaoEmpresaDto,
    });

    return new ConfiguracaoEmpresaResponseDto(configuracao);
  }

  async findByEmpresaId(
    empresaId: string,
  ): Promise<ConfiguracaoEmpresaResponseDto | null> {
    const configuracao = await this.prisma.configuracaoEmpresa.findUnique({
      where: { empresaId },
    });

    if (!configuracao) {
      return null;
    }

    return new ConfiguracaoEmpresaResponseDto(configuracao);
  }

  async findByEmpresaIdOrCreate(
    empresaId: string,
  ): Promise<ConfiguracaoEmpresaResponseDto> {
    let configuracao = await this.prisma.configuracaoEmpresa.findUnique({
      where: { empresaId },
    });

    if (!configuracao) {
      // Criar configuração padrão se não existir
      configuracao = await this.prisma.configuracaoEmpresa.create({
        data: {
          empresaId,
          horarioAbertura: '08:00',
          horarioFechamento: '18:00',
          diasFuncionamento: 'segunda,terca,quarta,quinta,sexta',
          tempoPreparoMedio: 30,
          notificacaoNovoPedido: true,
          notificacaoPedidoPronto: true,
          notificacaoSms: false,
          emailMarketing: false,
        },
      });
    }

    return new ConfiguracaoEmpresaResponseDto(configuracao);
  }

  async update(
    empresaId: string,
    updateConfiguracaoEmpresaDto: UpdateConfiguracaoEmpresaDto,
  ): Promise<ConfiguracaoEmpresaResponseDto> {
    const configuracao = await this.prisma.configuracaoEmpresa.findUnique({
      where: { empresaId },
    });

    if (!configuracao) {
      throw new NotFoundException('Configuração da empresa não encontrada');
    }

    const updatedConfiguracao = await this.prisma.configuracaoEmpresa.update({
      where: { empresaId },
      data: updateConfiguracaoEmpresaDto,
    });

    return new ConfiguracaoEmpresaResponseDto(updatedConfiguracao);
  }

  async upsert(
    empresaId: string,
    updateConfiguracaoEmpresaDto: UpdateConfiguracaoEmpresaDto,
  ): Promise<ConfiguracaoEmpresaResponseDto> {
    const configuracao = await this.prisma.configuracaoEmpresa.upsert({
      where: { empresaId },
      update: updateConfiguracaoEmpresaDto,
      create: {
        empresaId,
        ...updateConfiguracaoEmpresaDto,
      },
    });

    return new ConfiguracaoEmpresaResponseDto(configuracao);
  }

  async remove(empresaId: string): Promise<void> {
    const configuracao = await this.prisma.configuracaoEmpresa.findUnique({
      where: { empresaId },
    });

    if (!configuracao) {
      throw new NotFoundException('Configuração da empresa não encontrada');
    }

    await this.prisma.configuracaoEmpresa.delete({
      where: { empresaId },
    });
  }
}
