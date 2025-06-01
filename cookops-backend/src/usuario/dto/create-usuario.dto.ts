import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'João da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'E-mail do usuário', example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  @IsString()
  senha: string;

  @ApiProperty({
    description: 'ID da empresa do usuário',
    example: 'empresa-1',
  })
  @IsString()
  @IsNotEmpty()
  empresaId: string;

  @ApiProperty({
    description: 'Papel do usuário',
    enum: Role,
    required: false,
    example: Role.ADMIN,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
