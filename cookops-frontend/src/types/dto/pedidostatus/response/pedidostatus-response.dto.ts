import { PedidoResponseDto } from "../../pedido/response/pedido-response.dto";

export interface PedidoStatusResponseDto {
  id: number;
  boardId: string;
  titulo: string;
  ordem: number;
  cor?: string;
  icone?: string;
}

export interface PedidoStatusResponseWithPedidosDto {
  id: number;
  boardId: string;
  titulo: string;
  ordem: number;
  pedidos: PedidoResponseDto[];
}

export interface PedidoStatusResponseWithPedidosAndItensDto {
  id: number;
  boardId: string;
  titulo: string;
  ordem: number;
  pedidos: PedidoResponseDto[];
}
