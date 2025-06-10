# Implementação do WebSocket no Backend

Este documento explica como implementar o WebSocket no backend NestJS para sincronização em tempo real dos produtos.

## 1. Instalar Dependências

```bash
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
npm install --save-dev @types/socket.io
```

## 2. Criar o Gateway WebSocket

### src/produto/produto.gateway.ts

```typescript
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Produto } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/produtos',
})
export class ProdutoGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ProdutoGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-empresa')
  handleJoinEmpresa(
    @MessageBody() data: { empresaId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { empresaId } = data;
    client.join(`empresa-${empresaId}`);
    this.logger.log(`Client ${client.id} joined empresa ${empresaId}`);

    client.emit('joined', { empresaId });
  }

  // Métodos para notificar mudanças
  notifyProdutoCriado(produto: Produto) {
    this.server.to(`empresa-${produto.empresaId}`).emit('produto-atualizado', {
      type: 'PRODUTO_CRIADO',
      produto,
    });
  }

  notifyProdutoAtualizado(produto: Produto) {
    this.server.to(`empresa-${produto.empresaId}`).emit('produto-atualizado', {
      type: 'PRODUTO_ATUALIZADO',
      produto,
    });
  }

  notifyProdutoRemovido(produtoId: string, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('produto-atualizado', {
      type: 'PRODUTO_REMOVIDO',
      produtoId,
    });
  }

  notifyProdutoStatusAlterado(produto: Produto) {
    this.server.to(`empresa-${produto.empresaId}`).emit('produto-atualizado', {
      type: 'PRODUTO_STATUS_ALTERADO',
      produto,
    });
  }
}
```

## 3. Atualizar o Serviço de Produto

### src/produto/produto.service.ts

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoGateway } from './produto.gateway';

@Injectable()
export class ProdutoService {
  constructor(
    private prisma: PrismaService,
    private produtoGateway: ProdutoGateway,
  ) {}

  async create(data: CreateProdutoDto, empresaId: string): Promise<Produto> {
    const produto = await this.prisma.produto.create({
      data: {
        ...data,
        empresa: { connect: { id: empresaId } },
      },
    });

    // Notificar via WebSocket
    this.produtoGateway.notifyProdutoCriado(produto);

    return produto;
  }

  async update(
    id: string,
    data: UpdateProdutoDto,
    empresaId: string,
  ): Promise<Produto> {
    const produtoAnterior = await this.findOne(id);

    const produto = await this.prisma.produto.update({
      where: { id, empresaId },
      data,
    });

    // Verificar se foi mudança de status
    if (produtoAnterior.ativo !== produto.ativo) {
      this.produtoGateway.notifyProdutoStatusAlterado(produto);
    } else {
      this.produtoGateway.notifyProdutoAtualizado(produto);
    }

    return produto;
  }

  async remove(id: string): Promise<Produto> {
    const produto = await this.findOne(id);

    await this.prisma.produto.delete({
      where: { id },
    });

    // Notificar via WebSocket
    this.produtoGateway.notifyProdutoRemovido(id, produto.empresaId);

    return produto;
  }

  // ... outros métodos existentes
}
```

## 4. Atualizar o Módulo de Produto

### src/produto/produto.module.ts

```typescript
import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { ProdutoGateway } from './produto.gateway';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoGateway],
  exports: [ProdutoService, ProdutoGateway],
})
export class ProdutoModule {}
```

## 5. Configurar CORS no main.ts

### src/main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
```

## 6. Variáveis de Ambiente

### .env

```env
FRONTEND_URL=http://localhost:3000
```

## 7. Exemplo de Uso no Frontend

O frontend já está configurado para usar o WebSocket. Basta atualizar a URL no hook:

### src/hooks/useProdutoWebSocket.ts

```typescript
// Atualizar a linha da URL
const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'}/produtos`;
```

### .env.local (Frontend)

```env
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

## 8. Testando a Implementação

1. Inicie o backend: `npm run start:dev`
2. Inicie o frontend: `npm run dev`
3. Abra duas abas do navegador
4. Crie/edite/exclua um produto em uma aba
5. Veja a atualização automática na outra aba

## 9. Logs e Debug

Para debugar o WebSocket, adicione logs:

```typescript
// No gateway
this.logger.debug(`Emitting to empresa-${empresaId}:`, data);

// No frontend
console.log('WebSocket message received:', data);
```

## 10. Considerações de Produção

- Implementar autenticação no WebSocket
- Adicionar rate limiting
- Configurar heartbeat/reconnection
- Monitorar conexões ativas
- Implementar rooms por empresa adequadamente

## 11. Autenticação WebSocket (Opcional)

```typescript
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class ProdutoGateway {
  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      this.logger.log(`Authenticated user ${payload.sub} connected`);
    } catch (error) {
      this.logger.error('WebSocket authentication failed');
      client.disconnect();
    }
  }
}
```

Agora o sistema está completo e pronto para sincronização em tempo real!
