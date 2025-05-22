import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePedidoItemDto {
  @IsNotEmpty()
  @IsString()
  pedidoId: string;

  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  precoUnitario: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}
