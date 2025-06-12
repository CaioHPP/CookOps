import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssinaturaModule } from './assinatura/assinatura.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CentralWebSocketModule } from './common/gateways/central-websocket.module';
import { ConfiguracaoEmpresaModule } from './configuracao-empresa/configuracao-empresa.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmpresaModule } from './empresa/empresa.module';
import { FontePedidoModule } from './fontepedido/fontepedido.module';
import { FormaPagamentoModule } from './formapagamento/formapagamento.module';
import { LogMovimentacaoModule } from './logmovimentacao/logmovimentacao.module';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoStatusModule } from './pedidostatus/pedidostatus.module';
import { PlanoModule } from './plano/plano.module';
import { PrismaModule } from './prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    CentralWebSocketModule, // Gateway centralizado
    ProdutoModule,
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
    ConfiguracaoEmpresaModule,
    DashboardModule,
    AuthModule,
    ThrottlerModule.forRoot({
      //Limite de 20 requisições por minuto por IP
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
