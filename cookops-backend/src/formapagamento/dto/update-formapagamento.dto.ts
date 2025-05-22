import { PartialType } from '@nestjs/mapped-types';
import { CreateFormaPagamentoDto } from './create-formapagamento.dto';

export class UpdateFormaPagamentoDto extends PartialType(
  CreateFormaPagamentoDto,
) {}
