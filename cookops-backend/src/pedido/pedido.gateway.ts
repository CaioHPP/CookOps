import { OnModuleInit } from '@nestjs/common';
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
  pingInterval: 25000, // Ping a cada 25 segundos (menos agressivo)
  pingTimeout: 20000, // Timeout de 20 segundos (mais tolerante)
  transports: ['websocket'], // Força usar apenas websocket
})
export class PedidoGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer()
  server: Server;

  private clientsByEmpresa = new Map<string, Set<string>>();

  // Método para monitorar a saúde das conexões
  private setupHeartbeat() {
    setInterval(() => {
      let totalClients = 0;
      let empresasAtivas = 0;

      // Percorrer todas as empresas e contar clientes
      for (const [empresaId, clients] of this.clientsByEmpresa.entries()) {
        if (clients.size > 0) {
          empresasAtivas++;
          totalClients += clients.size;

          console.log(`Empresa ${empresaId}: ${clients.size} clientes ativos`);
        }
      }

      console.log(
        `Estado do WebSocket: ${empresasAtivas} empresas, ${totalClients} clientes ativos`,
      );
    }, 60000); // Log a cada 60 segundos
  }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);

    // Definir um timeout para verificar se o cliente entrou em alguma empresa
    setTimeout(() => {
      let encontrado = false;

      // Verificar se o cliente está em alguma empresa
      for (const clients of this.clientsByEmpresa.values()) {
        if (clients.has(client.id)) {
          encontrado = true;
          break;
        }
      }

      // Se o cliente não entrou em nenhuma empresa, desconectar
      if (!encontrado && client.connected) {
        console.log(
          `Cliente ${client.id} não entrou em nenhuma empresa, desconectando...`,
        );
        client.disconnect(true);
      }
    }, 10000); // 10 segundos para entrar em uma empresa
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);

    // Remover cliente de todas as salas de empresa
    for (const [empresaId, clients] of this.clientsByEmpresa.entries()) {
      if (clients.has(client.id)) {
        clients.delete(client.id);
        console.log(`Cliente ${client.id} removido da empresa ${empresaId}`);

        // Se não houver mais clientes, remover entrada da empresa
        if (clients.size === 0) {
          this.clientsByEmpresa.delete(empresaId);
        }
      }
    }
  }
  emitirPedidoCriado(empresaId: string, pedido: any) {
    this.server.to(empresaId).emit('pedidoCriado', pedido);
  }
  emitirPedidoAtualizado(empresaId: string, pedido: any) {
    this.server.to(empresaId).emit('pedidoAtualizado', pedido);
  }
  emitirPedidoConcluido(empresaId: string, pedido: any) {
    this.server.to(empresaId).emit('pedidoConcluido', pedido);
  }

  @SubscribeMessage('entrarNaEmpresa')
  async handleEntrarNaEmpresa(client: Socket, payload: { empresaId: string }) {
    const { empresaId } = payload;

    // Registrar cliente para esta empresa
    if (!this.clientsByEmpresa.has(empresaId)) {
      this.clientsByEmpresa.set(empresaId, new Set());
    }

    const clientsSet = this.clientsByEmpresa.get(empresaId);
    if (clientsSet) {
      clientsSet.add(client.id);
    }

    // Entrar na sala (await para garantir que a operação seja concluída)
    await client.join(empresaId);
    console.log(`Cliente ${client.id} entrou na empresa ${empresaId}`);

    // Enviar confirmação para o cliente
    client.emit('empresaEntrada', { empresaId, success: true });

    // Retornar um ACK para o cliente
    return { success: true, message: 'Entrada na empresa bem-sucedida' };
  }

  onModuleInit() {
    console.log('Iniciando módulo de WebSocket...');
    // Iniciar o monitoramento de conexões
    this.setupHeartbeat();
  }
}
