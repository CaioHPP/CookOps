import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ description: 'Título do board', example: 'Cozinha' })
  @IsNotEmpty()
  @IsString()
  titulo: string;
}
