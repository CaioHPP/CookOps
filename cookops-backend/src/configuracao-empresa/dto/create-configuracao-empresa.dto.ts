import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateConfiguracaoEmpresaDto {
  @IsString()
  empresaId: string;

  @IsOptional()
  @IsString()
  horarioAbertura?: string = '08:00';

  @IsOptional()
  @IsString()
  horarioFechamento?: string = '18:00';

  @IsOptional()
  @IsString()
  diasFuncionamento?: string = 'segunda,terca,quarta,quinta,sexta';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(180)
  tempoPreparoMedio?: number = 30;

  @IsOptional()
  @IsBoolean()
  notificacaoNovoPedido?: boolean = true;

  @IsOptional()
  @IsBoolean()
  notificacaoPedidoPronto?: boolean = true;

  @IsOptional()
  @IsBoolean()
  notificacaoSms?: boolean = false;

  @IsOptional()
  @IsBoolean()
  emailMarketing?: boolean = false;
}
