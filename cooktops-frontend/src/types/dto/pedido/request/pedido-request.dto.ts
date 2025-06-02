import {
  PedidoItemRequestAddDto,
  PedidoItemRequestUpdateDto,
} from "../../pedidoitem/request/pedidoitem-request.dto";

export interface PedidoRequestAddDto {
  boardId: string;
  fonteId: number;
  pagamentoId: number;
  enderecoId?: string;
  desconto?: number;
  taxaEntrega?: number;
  valorTotal: number;
  observacao?: string;
  itens: PedidoItemRequestAddDto[];
}

export interface PedidoRequestUpdateDto {
  statusId?: number;
  fonteId?: number;
  pagamentoId?: number;
  enderecoId?: string;
  desconto?: number;
  taxaEntrega?: number;
  valorTotal?: number;
  observacao?: string;
  itens?: PedidoItemRequestUpdateDto[];
}
