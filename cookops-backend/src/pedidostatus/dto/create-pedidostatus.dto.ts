import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePedidoStatusDto {
  @ApiProperty({
    description: 'ID do board ao qual o status pertence',
    example: 'board-1',
  })
  @IsNotEmpty()
  @IsString()
  boardId: string;

  @ApiProperty({
    description: 'Título do status do pedido',
    example: 'Em preparo',
  })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Ordem do status no board', example: 1 })
  @IsInt()
  ordem: number;
}
