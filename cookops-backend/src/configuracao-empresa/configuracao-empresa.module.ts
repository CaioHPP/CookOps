import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { ConfiguracaoEmpresaController } from './configuracao-empresa.controller';
import { ConfiguracaoEmpresaService } from './configuracao-empresa.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConfiguracaoEmpresaController],
  providers: [ConfiguracaoEmpresaService],
  exports: [ConfiguracaoEmpresaService],
})
export class ConfiguracaoEmpresaModule {}
