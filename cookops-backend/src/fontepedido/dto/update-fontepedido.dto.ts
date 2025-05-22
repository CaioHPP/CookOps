import { PartialType } from '@nestjs/mapped-types';
import { CreateFontePedidoDto } from './create-fontepedido.dto';

export class UpdateFontePedidoDto extends PartialType(CreateFontePedidoDto) {}
