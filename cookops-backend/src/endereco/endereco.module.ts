import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService, PrismaService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
