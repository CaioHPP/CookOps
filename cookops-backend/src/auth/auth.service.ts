// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmpresaCompletaDto } from 'src/empresa/dto/empresa-completa.dto';
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
    const empresa: EmpresaCompletaDto =
      (await this.empresaService.findEmpresaCompleta(
        user.empresaId,
      )) as EmpresaCompletaDto;

    if (!empresa) {
      throw new UnauthorizedException('Empresa não encontrada');
    }

    // Pega o tempo médio de preparo da configuração da empresa (padrão 30 se não existir)
    const tempoPreparoMedio = empresa.configuracao?.tempoPreparoMedio || 30;

    const payload = {
      user: user.user,
      nome: user.nome,
      email: user.email,
      empresaId: user.empresaId,
      nomeEmpresa: empresa.nome,
      role: user.role,
      tempoPreparoMedio,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
