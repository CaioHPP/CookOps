import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty()
  @IsString()
  rua: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  uf: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  referencia?: string;
}
