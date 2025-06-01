import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormaPagamentoDto {
  @ApiProperty({
    description: 'Nome da forma de pagamento',
    example: 'Dinheiro',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;
}
