import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
