import { Module } from '@nestjs/common';
import { CentralWebSocketGateway } from './central-websocket.gateway';

@Module({
  providers: [CentralWebSocketGateway],
  exports: [CentralWebSocketGateway],
})
export class CentralWebSocketModule {}
