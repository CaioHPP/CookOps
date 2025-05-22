import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormaPagamentoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
}
