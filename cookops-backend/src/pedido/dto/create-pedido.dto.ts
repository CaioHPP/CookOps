import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

class CreatePedidoItemDto {
  @ApiProperty({
    description: 'ID do produto',
    example: 'cmbd1mdkw0002h3xc6znz9jsm',
  })
  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @ApiProperty({ description: 'Quantidade do produto', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  quantidade: number;

  @ApiProperty({ description: 'Preço unitário do produto', example: 24.9 })
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
    example: 'cmbczhmv80002h39kjr21p4ur',
  })
  @IsNotEmpty()
  @IsString()
  boardId: string;

  @ApiProperty({ description: 'ID da fonte do pedido', example: 1 })
  @IsNotEmpty()
  @IsInt()
  fonteId: number;

  @ApiProperty({ description: 'ID do pagamento', example: 1 })
  @IsNotEmpty()
  @IsInt()
  pagamentoId: number;

  @ApiProperty({
    description: 'Desconto aplicado',
    required: false,
    example: 0,
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

  @ApiProperty({ description: 'Valor total do pedido', example: 53.3 })
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
    type: [CreatePedidoItemDto],
    description: 'Itens do pedido',
    example: [
      {
        produtoId: 'cmbd1mdkw0002h3xc6znz9jsm',
        quantidade: 2,
        precoUnitario: 24.9,
        observacao: 'Sem cebola',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  itens: CreatePedidoItemDto[];
}
