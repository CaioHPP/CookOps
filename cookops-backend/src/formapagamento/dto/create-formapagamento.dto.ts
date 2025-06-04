import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFormaPagamentoDto {
  @ApiProperty({
    description: 'Nome da forma de pagamento',
    example: 'Dinheiro',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Descrição da forma de pagamento',
    example: 'Pagamento em dinheiro na entrega',
    required: false,
  })
  @IsString()
  empresaId: string;

  @ApiProperty({
    description: 'Método de pagamento ativo?',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
