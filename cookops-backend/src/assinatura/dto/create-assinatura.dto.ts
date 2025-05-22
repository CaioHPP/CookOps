import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAssinaturaDto {
  @IsNotEmpty()
  @IsString()
  empresaId: string;

  @IsOptional()
  @IsString()
  stripeCustomerId?: string;

  @IsOptional()
  @IsString()
  stripeSubscriptionId?: string;

  @IsOptional()
  @IsDateString()
  periodoFim?: string;

  @IsNotEmpty()
  @IsString()
  planoId: string;
}
