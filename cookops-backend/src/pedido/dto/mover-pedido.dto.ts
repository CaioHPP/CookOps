import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class MoverPedidoDto {
  @ApiProperty({
    description:
      'Numero da ordem do status do pedido para onde o pedido será movido',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  paraOrdem: number;
}
