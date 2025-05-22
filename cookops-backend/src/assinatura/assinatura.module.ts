import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AssinaturaController } from './assinatura.controller';
import { AssinaturaService } from './assinatura.service';

@Module({
  controllers: [AssinaturaController],
  providers: [AssinaturaService, PrismaService],
  exports: [AssinaturaService],
})
export class AssinaturaModule {}
