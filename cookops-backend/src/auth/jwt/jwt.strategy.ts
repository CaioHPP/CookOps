// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  user: string;
  empresaId: string;
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
      userId: payload.user,
      empresaId: payload.empresaId,
      role: payload.role,
    };
  }
}
