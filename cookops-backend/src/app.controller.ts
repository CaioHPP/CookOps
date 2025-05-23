import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'API da CookOps rodando com sucesso 🚀';
  }
}
