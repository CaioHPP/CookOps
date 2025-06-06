import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @ApiProperty({
    description: 'Se pedidos dessa fonte são confirmados automaticamente',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  confirmaAutomatico?: boolean;

  @ApiProperty({
    description: 'Se exige confirmação manual obrigatória',
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  exigeConfirmacao?: boolean;

  @ApiProperty({
    description: 'Tempo limite para confirmação em minutos',
    required: false,
    example: 30,
  })
  @IsOptional()
  @IsInt()
  tempoLimiteConfirma?: number;
}
