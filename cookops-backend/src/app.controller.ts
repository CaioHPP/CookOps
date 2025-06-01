import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Status da API' })
  getHello(): string {
    return 'API da CookOps rodando com sucesso 🚀';
  }
}
