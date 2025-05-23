import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, PrismaService],
  exports: [BoardService],
})
export class BoardModule {}
