// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmpresaService } from 'src/empresa/empresa.service';
import { LoginUsuarioResponseDto } from 'src/usuario/dto/login-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usuarioService.findByEmail(email);
    if (user && (await bcrypt.compare(senha, user.senhaHash))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: LoginUsuarioResponseDto) {
    const empresa = await this.empresaService.findOne(user.empresaId);

    if (!empresa) {
      throw new UnauthorizedException('Empresa não encontrada');
    }

    const payload = {
      user: user.user,
      nome: user.nome,
      email: user.email,
      empresaId: user.empresaId,
      nomeEmpresa: empresa.nome,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
