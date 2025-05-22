import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePlanoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsInt()
  limitePedidosMes: number;

  @IsNumber()
  precoMensal: number;

  @IsBoolean()
  ativo: boolean;
}
