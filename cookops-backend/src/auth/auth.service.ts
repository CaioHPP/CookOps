// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioResponseDto } from 'src/usuario/dto/login-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usuarioService.findByEmail(email);
    if (user && (await bcrypt.compare(senha, user.senhaHash))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  login(user: LoginUsuarioResponseDto) {
    const payload = {
      user: user.user,
      empresaId: user.empresaId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
