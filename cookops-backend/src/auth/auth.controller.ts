// auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna o token JWT' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@email.com' },
        senha: { type: 'string', example: 'senha123' },
      },
      required: ['email', 'senha'],
    },
    description: 'Credenciais de login',
  })
  async login(@Body() body: { email: string; senha: string }) {
    const user = await this.authService.validateUser(body.email, body.senha);
    const jwtPayload = {
      user: user.id,
      nome: user.nome,
      email: user.email,
      empresaId: user.empresaId,
      role: user.role,
    };
    return this.authService.login(jwtPayload);
  }
}
