import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePlanoDto {
  @ApiProperty({ description: 'Nome do plano', example: 'Plano Básico' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Limite de pedidos por mês', example: 100 })
  @IsInt()
  limitePedidosMes: number;

  @ApiProperty({ description: 'Preço mensal do plano', example: 49.9 })
  @IsNumber()
  precoMensal: number;

  @ApiProperty({ description: 'Indica se o plano está ativo', example: true })
  @IsBoolean()
  ativo: boolean;
}
