import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLogMovimentacaoDto {
  @IsNotEmpty()
  @IsString()
  pedidoId: string;

  @IsOptional()
  @IsString()
  deStatusId?: string;

  @IsNotEmpty()
  @IsString()
  paraStatusId: string;

  @IsOptional()
  @IsDateString()
  dataMovimentacao?: string; // Pode ser preenchido automaticamente também
}
