import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  precoBase: number;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  @IsNotEmpty()
  @IsString()
  empresaId: string;
}
