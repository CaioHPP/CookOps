import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PedidoService } from './pedido/pedido.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly pedidoService: PedidoService, // Inject the PedidoService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pedidos')
  async getPedidos() {
    const pedidos = await this.pedidoService.findAll();
    return pedidos;
  }

}
