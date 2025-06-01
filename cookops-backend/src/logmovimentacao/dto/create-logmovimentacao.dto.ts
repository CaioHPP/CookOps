import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLogMovimentacaoDto {
  @IsNotEmpty()
  @IsString()
  pedidoId: string;

  @IsOptional()
  @IsInt()
  deStatusId?: number;

  @IsNotEmpty()
  @IsInt()
  paraStatusId: number;

  @IsOptional()
  @IsDateString()
  dataMovimentacao?: string; // Pode ser preenchido automaticamente também
}
