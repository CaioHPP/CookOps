import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsUUID()
  empresaId: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
