import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Configurações adicionais para melhor performance
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 30000,
  maxHttpBufferSize: 1e6,
})
export class CentralWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('CentralWebSocketGateway');
  afterInit(server: Server) {
    this.logger.log('Iniciando módulo de WebSocket...');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);

    // Confirmar conexão imediatamente
    client.emit('connection_confirmed', {
      clientId: client.id,
      timestamp: new Date().toISOString(),
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('entrarNaEmpresa')
  async handleEntrarNaEmpresa(client: Socket, payload: { empresaId: string }) {
    const { empresaId } = payload;
    this.logger.log(`Cliente ${client.id} entrando na empresa ${empresaId}`);

    // Adicionar cliente à sala da empresa
    await client.join(`empresa-${empresaId}`);

    // Enviar confirmação para o cliente
    client.emit('empresaEntrada', { empresaId, success: true });

    this.logger.log(`Cliente ${client.id} entrou na sala empresa-${empresaId}`);

    return { success: true, message: 'Entrada na empresa bem-sucedida' };
  }

  // Métodos para eventos de pedidos
  emitNovoPedido(pedido: any, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('novoPedido', pedido);
  }

  emitStatusPedidoAlterado(pedido: any, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('statusPedidoAlterado', pedido);
  }

  emitPedidoAtualizado(pedido: any, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('pedidoAtualizado', pedido);
  }

  emitPedidoRemovido(pedidoId: string, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('pedidoRemovido', { pedidoId });
  }

  // Métodos para eventos de produtos
  emitProdutoCriado(produto: any, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('produtoCriado', produto);
  }

  emitProdutoAtualizado(produto: any, empresaId: string) {
    this.server.to(`empresa-${empresaId}`).emit('produtoAtualizado', produto);
  }

  emitProdutoRemovido(produtoId: string, empresaId: string) {
    this.server
      .to(`empresa-${empresaId}`)
      .emit('produtoRemovido', { produtoId });
  }

  emitStatusProdutoAlterado(produto: any, empresaId: string) {
    this.server
      .to(`empresa-${empresaId}`)
      .emit('statusProdutoAlterado', produto);
  }
  // Método para adicionar cliente a uma sala da empresa
  addClientToEmpresaRoom(clientId: string, empresaId: string) {
    const socket = this.server.sockets.sockets.get(clientId);
    if (socket) {
      void socket.join(`empresa-${empresaId}`);
      this.logger.log(
        `Cliente ${clientId} adicionado à sala empresa-${empresaId}`,
      );
    }
  }

  // Método para remover cliente de uma sala da empresa
  removeClientFromEmpresaRoom(clientId: string, empresaId: string) {
    const socket = this.server.sockets.sockets.get(clientId);
    if (socket) {
      void socket.leave(`empresa-${empresaId}`);
      this.logger.log(
        `Cliente ${clientId} removido da sala empresa-${empresaId}`,
      );
    }
  }
}
