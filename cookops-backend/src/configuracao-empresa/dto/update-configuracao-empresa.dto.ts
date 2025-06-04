import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateConfiguracaoEmpresaDto } from './create-configuracao-empresa.dto';

export class UpdateConfiguracaoEmpresaDto extends PartialType(
  CreateConfiguracaoEmpresaDto,
) {
  @IsOptional()
  @IsString()
  horarioAbertura?: string;

  @IsOptional()
  @IsString()
  horarioFechamento?: string;

  @IsOptional()
  @IsString()
  diasFuncionamento?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(180)
  tempoPreparoMedio?: number;

  @IsOptional()
  @IsBoolean()
  notificacaoNovoPedido?: boolean;

  @IsOptional()
  @IsBoolean()
  notificacaoPedidoPronto?: boolean;

  @IsOptional()
  @IsBoolean()
  notificacaoSms?: boolean;

  @IsOptional()
  @IsBoolean()
  emailMarketing?: boolean;
}
