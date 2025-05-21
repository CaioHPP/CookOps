import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './pedido/pedido.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PedidoModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
