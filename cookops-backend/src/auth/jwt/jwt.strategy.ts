// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  user: string;
  nome?: string;
  email?: string;
  empresaId: string;
  nomeEmpresa?: string;
  role: string;
  [key: string]: any;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'laulau',
    });
  }

  validate(payload: JwtPayload) {
    return {
      user: payload.user,
      nome: payload.nome,
      email: payload.email,
      empresaId: payload.empresaId,
      nomeEmpresa: payload.nomeEmpresa,
      role: payload.role,
    };
  }
}
