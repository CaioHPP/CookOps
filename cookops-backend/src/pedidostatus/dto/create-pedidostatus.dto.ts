import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePedidoStatusDto {
  @IsNotEmpty()
  @IsString()
  boardId: string;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsInt()
  ordem: number;
}
