import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAssinaturaDto {
  @ApiProperty({ description: 'ID da empresa', example: 'empresa-1' })
  @IsNotEmpty()
  @IsString()
  empresaId: string;

  @ApiProperty({
    description: 'ID do cliente no Stripe',
    required: false,
    example: 'cus_123',
  })
  @IsOptional()
  @IsString()
  stripeCustomerId?: string;

  @ApiProperty({
    description: 'ID da assinatura no Stripe',
    required: false,
    example: 'sub_123',
  })
  @IsOptional()
  @IsString()
  stripeSubscriptionId?: string;

  @ApiProperty({
    description: 'Data de término do período da assinatura',
    required: false,
    example: '2024-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  periodoFim?: string;

  @ApiProperty({ description: 'ID do plano', example: 'plano-1' })
  @IsNotEmpty()
  @IsInt()
  planoId: number;
}
