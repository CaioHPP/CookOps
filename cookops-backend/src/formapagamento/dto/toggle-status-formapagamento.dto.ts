import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ToggleStatusFormaPagamentoDto {
  @ApiProperty({
    description: 'Status ativo/inativo da forma de pagamento',
    example: true,
  })
  @IsBoolean()
  ativo: boolean;
}
