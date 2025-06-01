import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Pizza Margherita' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descrição do produto',
    required: false,
    example: 'Pizza com molho de tomate, mussarela e manjericão',
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ description: 'Preço base do produto', example: 29.9 })
  @IsNumber()
  precoBase: number;

  @ApiProperty({
    description: 'Indica se o produto está ativo',
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
