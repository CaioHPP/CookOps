import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlanoController } from './plano.controller';
import { PlanoService } from './plano.service';

@Module({
  controllers: [PlanoController],
  providers: [PlanoService, PrismaService],
  exports: [PlanoService],
})
export class PlanoModule {}
