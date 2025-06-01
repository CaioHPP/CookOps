import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MoverPedidoDto {
  @ApiProperty({
    description: 'ID do novo status para o pedido',
    example: 'status-2',
  })
  @IsString()
  @IsNotEmpty()
  paraStatusId: string;
}
