import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoStatusDto } from './create-pedidostatus.dto';

export class UpdatePedidoStatusDto extends PartialType(CreatePedidoStatusDto) {}
