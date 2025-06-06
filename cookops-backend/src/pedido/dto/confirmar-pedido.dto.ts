import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ConfirmarPedidoDto {
  @ApiProperty({
    description: 'ID do usuário que está confirmando o pedido',
    required: false,
    example: 'cmbd1mdkw0002h3xc6znz9jsm',
  })
  @IsOptional()
  @IsString()
  usuarioConfirmou?: string;
}
