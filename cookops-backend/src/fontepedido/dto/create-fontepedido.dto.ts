import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFontePedidoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  tipoIntegracao?: string;
}
