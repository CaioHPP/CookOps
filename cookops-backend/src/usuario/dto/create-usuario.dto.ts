import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  @IsNotEmpty()
  empresaId: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
