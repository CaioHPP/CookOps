import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UpdatePedidoItemDto {
  @IsOptional()
  @IsString()
  id?: string; // Para identificar o item ao atualizar

  @IsOptional()
  @IsString()
  produtoId?: string;

  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @IsOptional()
  @IsNumber()
  precoUnitario?: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}

export class UpdatePedidoDto {
  @IsOptional()
  @IsString()
  statusId?: string;

  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsString()
  fonteId?: string;

  @IsOptional()
  @IsString()
  pagamentoId?: string;

  @IsOptional()
  @IsString()
  enderecoId?: string;

  @IsOptional()
  @IsNumber()
  desconto?: number;

  @IsOptional()
  @IsNumber()
  taxaEntrega?: number;

  @IsOptional()
  @IsNumber()
  valorTotal?: number;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePedidoItemDto)
  itens?: UpdatePedidoItemDto[];
}
