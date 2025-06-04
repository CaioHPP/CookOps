import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Restaurante Saboroso',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    required: false,
    example: '12.345.678/0001-99',
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({
    description: 'E-mail da empresa',
    required: false,
    example: 'contato@empresa.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Telefone da empresa',
    required: false,
    example: '+55 11 91234-5678',
  })
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone?: string;

  @ApiProperty({
    description: 'ID do endereço da empresa',
    required: false,
    example: 'endereco-id-123',
  })
  @IsOptional()
  @IsString()
  enderecoId?: string;

  @ApiProperty({ description: 'ID do plano atual', example: 'plano-1' })
  @IsNotEmpty()
  @IsInt()
  planoAtualId: number;
}
