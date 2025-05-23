// auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const user = await this.authService.validateUser(body.email, body.senha);
    const jwtPayload = {
      user: user.id,
      empresaId: user.empresaId,
      role: user.role,
    };
    return this.authService.login(jwtPayload);
  }
}
