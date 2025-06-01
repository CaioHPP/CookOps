import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'ID do produto', example: 'prod-123' })
  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @ApiProperty({ description: 'Quantidade do produto', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  quantidade: number;

  @ApiProperty({ description: 'Preço unitário do produto', example: 19.99 })
  @IsNotEmpty()
  @IsNumber()
  precoUnitario: number;

  @ApiProperty({
    description: 'Observação do item',
    required: false,
    example: 'Sem cebola',
  })
  @IsOptional()
  @IsString()
  observacao?: string;
}

export class CreatePedidoDto {
  @ApiProperty({
    description: 'ID do Board',
    example: 'cmb1jolgm0001h3to2dyxjtpl',
  })
  @IsNotEmpty()
  @IsString()
  boardId: string;

  @ApiProperty({ description: 'ID da fonte do pedido', example: 'fonte-1' })
  @IsNotEmpty()
  @IsString()
  fonteId: string;

  @ApiProperty({ description: 'ID do pagamento', example: 'pag-1' })
  @IsNotEmpty()
  @IsString()
  pagamentoId: string;

  @ApiProperty({
    description: 'ID do endereço',
    required: false,
    example: 'end-1',
  })
  @IsOptional()
  @IsString()
  enderecoId?: string;

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

  @ApiProperty({ description: 'Valor total do pedido', example: 50.0 })
  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @ApiProperty({
    description: 'Observação do pedido',
    required: false,
    example: 'Entregar rápido',
  })
  @IsOptional()
  @IsString()
  observacao?: string;

  @ApiProperty({ type: [CreatePedidoItemDto], description: 'Itens do pedido' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  itens: CreatePedidoItemDto[];
}
