import { PartialType } from '@nestjs/mapped-types';
import { CreateLogMovimentacaoDto } from './create-logmovimentacao.dto';

export class UpdateLogMovimentacaoDto extends PartialType(
  CreateLogMovimentacaoDto,
) {}
