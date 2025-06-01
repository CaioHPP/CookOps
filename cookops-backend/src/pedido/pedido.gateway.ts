import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'ws/pedidos',

  cors: {
    origin: '*',
  },
})
export class PedidoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  emitirPedidoCriado(empresaId: string, pedido: any) {
    this.server.to(empresaId).emit('pedidoCriado', pedido);
  }
  emitirPedidoAtualizado(empresaId: string, pedido: any) {
    this.server.to(empresaId).emit('pedidoAtualizado', pedido);
  }

  @SubscribeMessage('entrarNaEmpresa')
  handleEntrarNaEmpresa(client: Socket, payload: { empresaId: string }) {
    const { empresaId } = payload;
    client.join(empresaId);
    console.log(`Cliente ${client.id} entrou na empresa ${empresaId}`);
  }
}
