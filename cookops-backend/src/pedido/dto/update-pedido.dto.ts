import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

class UpdatePedidoItemDto {
  @ApiProperty({
    description: 'ID do item do pedido',
    required: false,
    example: 'item-1',
  })
  @IsOptional()
  @IsString()
  id?: string; // Para identificar o item ao atualizar

  @ApiProperty({
    description: 'ID do produto',
    required: false,
    example: 'prod-123',
  })
  @IsOptional()
  @IsString()
  produtoId?: string;

  @ApiProperty({
    description: 'Quantidade do produto',
    required: false,
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @ApiProperty({
    description: 'Preço unitário do produto',
    required: false,
    example: 19.99,
  })
  @IsOptional()
  @IsNumber()
  precoUnitario?: number;

  @ApiProperty({
    description: 'Observação do item',
    required: false,
    example: 'Sem cebola',
  })
  @IsOptional()
  @IsString()
  observacao?: string;
}

export class UpdatePedidoDto {
  @ApiProperty({
    description: 'ID do status do pedido',
    required: false,
    example: 'status-1',
  })
  @IsOptional()
  @IsInt()
  statusId?: number;

  @ApiProperty({
    description: 'Código do pedido',
    required: false,
    example: 'PED-2024-001',
  })
  @IsOptional()
  @IsString()
  codigo?: string;

  @ApiProperty({
    description: 'ID da fonte do pedido',
    required: false,
    example: 'fonte-1',
  })
  @IsOptional()
  @IsInt()
  fonteId?: number;

  @ApiProperty({
    description: 'ID do pagamento',
    required: false,
    example: 'pag-1',
  })
  @IsOptional()
  @IsInt()
  pagamentoId?: number;

  @ApiProperty({
    description: 'Desconto aplicado',
    required: false,
    example: 5.0,
  })
  @IsOptional()
  @IsNumber()
  desconto?: number;

  @ApiProperty({
    description: 'Taxa de entrega',
    required: false,
    example: 3.5,
  })
  @IsOptional()
  @IsNumber()
  taxaEntrega?: number;

  @ApiProperty({
    description: 'Valor total do pedido',
    required: false,
    example: 50.0,
  })
  @IsOptional()
  @IsNumber()
  valorTotal?: number;

  @ApiProperty({
    description: 'Observação do pedido',
    required: false,
    example: 'Entregar rápido',
  })
  @IsOptional()
  @IsString()
  observacao?: string;

  @ApiProperty({
    description: 'Endereço de entrega',
    required: false,
    example: [
      {
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Jardim das Rosas',
      },
    ],
  })
  @IsOptional()
  @Type(() => CreateEnderecoDto)
  endereco?: CreateEnderecoDto;

  @ApiProperty({
    type: [UpdatePedidoItemDto],
    description: 'Itens do pedido',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePedidoItemDto)
  itens?: UpdatePedidoItemDto[];
}
