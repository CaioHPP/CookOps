import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class MoverPedidoDto {
  @ApiProperty({
    description: 'ID do novo status para o pedido',
    example: 'status-2',
  })
  @IsInt()
  @IsNotEmpty()
  paraStatusId: number;
}
