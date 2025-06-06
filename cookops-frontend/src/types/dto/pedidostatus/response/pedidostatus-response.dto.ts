import { PedidoResponseDto } from "../../pedido/response/pedido-response.dto";

export interface PedidoStatusResponseDto {
  id: number;
  boardId: string;
  titulo: string;
  ordem: number;
}

export interface PedidoStatusResponseWithPedidosDto {
  id: number;
  boardId: string;
  titulo: string;
  ordem: number;
  pedidos: PedidoResponseDto[];
}

export interface PedidoStatusResponseWithPedidosAndItensDto {
  statusId: number;
  boardId: string;
  titulo: string;
  ordem: number;
  pedidos: PedidoResponseDto[];
}
