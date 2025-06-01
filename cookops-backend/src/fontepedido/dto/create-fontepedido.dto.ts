import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFontePedidoDto {
  @ApiProperty({ description: 'Nome da fonte do pedido', example: 'iFood' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Tipo de integração',
    required: false,
    example: 'API',
  })
  @IsOptional()
  @IsString()
  tipoIntegracao?: string;
}
