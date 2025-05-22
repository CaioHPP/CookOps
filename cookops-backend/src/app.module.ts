import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssinaturaModule } from './assinatura/assinatura.module';
import { BoardModule } from './board/board.module';
import { EmpresaModule } from './empresa/empresa.module';
import { FontePedidoModule } from './fontepedido/fontepedido.module';
import { FormaPagamentoModule } from './formapagamento/formapagamento.module';
import { LogMovimentacaoModule } from './logmovimentacao/logmovimentacao.module';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoStatusModule } from './pedidostatus/pedidostatus.module';
import { PlanoModule } from './plano/plano.module';
import { PrismaModule } from './prisma.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    PedidoModule,
    PrismaModule,
    EmpresaModule,
    UsuarioModule,
    PlanoModule,
    BoardModule,
    FontePedidoModule,
    FormaPagamentoModule,
    LogMovimentacaoModule,
    PedidoStatusModule,
    AssinaturaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
