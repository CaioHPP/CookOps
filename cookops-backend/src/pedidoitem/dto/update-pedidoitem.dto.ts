import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoItemDto } from './create-pedidoitem.dto';

export class UpdatePedidoItemDto extends PartialType(CreatePedidoItemDto) {}
