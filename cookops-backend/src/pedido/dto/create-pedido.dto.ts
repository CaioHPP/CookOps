import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreatePedidoItemDto {
  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @IsNotEmpty()
  @IsNumber()
  quantidade: number;

  @IsNotEmpty()
  @IsNumber()
  precoUnitario: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  statusId: string;

  @IsNotEmpty()
  @IsString()
  empresaId: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  fonteId: string;

  @IsNotEmpty()
  @IsString()
  pagamentoId: string;

  @IsOptional()
  @IsString()
  enderecoId?: string;

  @IsOptional()
  @IsNumber()
  desconto?: number;

  @IsOptional()
  @IsNumber()
  taxaEntrega?: number;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  itens: CreatePedidoItemDto[];
}
