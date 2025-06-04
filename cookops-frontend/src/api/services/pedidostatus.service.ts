import {
  PedidoStatusRequestAddDto,
  PedidoStatusRequestUpdateDto,
} from "@/types/dto/pedidostatus/request/pedidostatus-request.dto";
import {
  PedidoStatusResponseDto,
  PedidoStatusResponseWithPedidosAndItensDto,
  PedidoStatusResponseWithPedidosDto,
} from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class PedidoStatusService {
  static async addPedidoStatus(
    data: PedidoStatusRequestAddDto
  ): Promise<PedidoStatusResponseDto> {
    const response = await api.post<PedidoStatusResponseDto>(
      API_ROUTES.PEDIDO_STATUS.ADD_PEDIDO_STATUS,
      data
    );
    return response.data;
  }

  static async getPedidoStatus(): Promise<PedidoStatusResponseDto[]> {
    const response = await api.get<PedidoStatusResponseDto[]>(
      API_ROUTES.PEDIDO_STATUS.GET_PEDIDO_STATUS
    );
    return response.data;
  }

  static async getPedidoStatusById(
    id: number
  ): Promise<PedidoStatusResponseDto> {
    const url = `${API_ROUTES.PEDIDO_STATUS.GET_PEDIDO_STATUS_BY_ID}/${id}`;
    const response = await api.get<PedidoStatusResponseDto>(url);
    return response.data;
  }

  static async updatePedidoStatus(
    id: number,
    data: PedidoStatusRequestUpdateDto
  ): Promise<PedidoStatusResponseDto> {
    const url = `${API_ROUTES.PEDIDO_STATUS.UPDATE_PEDIDO_STATUS}/${id}`;
    const response = await api.put<PedidoStatusResponseDto>(url, data);
    return response.data;
  }

  static async deletePedidoStatus(id: number): Promise<void> {
    const url = `${API_ROUTES.PEDIDO_STATUS.DELETE_PEDIDO_STATUS}/${id}`;
    await api.delete(url);
  }

  static async getPedidoStatusByBoard(
    boardId: string
  ): Promise<PedidoStatusResponseDto[]> {
    const url = `${API_ROUTES.PEDIDO_STATUS.GET_PEDIDO_STATUS_BY_BOARD}/${boardId}`;
    const response = await api.get<PedidoStatusResponseDto[]>(url);
    return response.data;
  }

  static async getPedidoStatusWithPedidos(
    boardId: string
  ): Promise<PedidoStatusResponseWithPedidosDto[]> {
    const url = API_ROUTES.PEDIDO_STATUS.GET_PEDIDO_STATUS_WITH_PEDIDOS.replace(
      ":boardId",
      boardId
    );
    const response = await api.get<PedidoStatusResponseWithPedidosDto[]>(url);
    return response.data;
  }

  static async getPedidoStatusWithPedidosAndItens(
    boardId: string
  ): Promise<PedidoStatusResponseWithPedidosAndItensDto[]> {
    const url =
      API_ROUTES.PEDIDO_STATUS.GET_PEDIDO_STATUS_WITH_PEDIDOS_AND_ITENS.replace(
        ":boardId",
        boardId
      );
    const response = await api.get<
      PedidoStatusResponseWithPedidosAndItensDto[]
    >(url);
    return response.data;
  }
}
