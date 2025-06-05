import { PedidoResponseDto } from "../../pedido/response/pedido-response.dto";

export interface PedidoStatusResponseDto {
  id: number;
  boardId: string;
  titulo: string;
  ordem: number;
}

export interface PedidoStatusResponseWithPedidosDto {
  id: number;
  titulo: string;
  ordem: number;
  pedidos: {
    id: number;
    titulo: string;
    descricao: string;
    statusId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface PedidoStatusResponseWithPedidosAndItensDto {
  statusId: number;
  boardId: string;
  titulo: string;
  ordem: number;
  pedidos: PedidoResponseDto[];
}
