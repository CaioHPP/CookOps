import { MoverPedidoRequestDto } from "@/types/dto/pedido/request/mover-pedido-request.dto";
import {
  PedidoRequestAddDto,
  PedidoRequestUpdateDto,
} from "@/types/dto/pedido/request/pedido-request.dto";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class PedidoService {
  static async addPedido(
    data: PedidoRequestAddDto,
  ): Promise<PedidoResponseDto> {
    const response = await api.post<PedidoResponseDto>(
      API_ROUTES.PEDIDO.ADD_PEDIDO,
      data,
    );
    return response.data;
  }

  static async getPedidos(): Promise<PedidoResponseDto[]> {
    const response = await api.get<PedidoResponseDto[]>(
      API_ROUTES.PEDIDO.GET_PEDIDOS,
    );
    return response.data;
  }

  static async getPedidosByEmpresa(): Promise<PedidoResponseDto[]> {
    const response = await api.get<PedidoResponseDto[]>(
      API_ROUTES.PEDIDO.GET_PEDIDOS_BY_EMPRESA,
    );
    return response.data;
  }

  static async getPedidoById(id: string): Promise<PedidoResponseDto> {
    const url = `${API_ROUTES.PEDIDO.GET_PEDIDO_BY_ID}/${id}`;
    const response = await api.get<PedidoResponseDto>(url);
    return response.data;
  }

  static async updatePedido(
    id: string,
    data: PedidoRequestUpdateDto,
  ): Promise<PedidoResponseDto> {
    const url = `${API_ROUTES.PEDIDO.UPDATE_PEDIDO}/${id}`;
    const response = await api.put<PedidoResponseDto>(url, data);
    return response.data;
  }

  static async deletePedido(id: string): Promise<void> {
    const url = `${API_ROUTES.PEDIDO.DELETE_PEDIDO}/${id}`;
    await api.delete(url);
  }
  static async moverPedido(
    id: string,
    data: MoverPedidoRequestDto,
  ): Promise<PedidoResponseDto> {
    const url = `${API_ROUTES.PEDIDO.MOVER_PEDIDO}/${id}`;
    const response = await api.put<PedidoResponseDto>(url, data);
    return response.data;
  }

  static async concluirPedido(id: string): Promise<PedidoResponseDto> {
    const url = `${API_ROUTES.PEDIDO.CONCLUIR_PEDIDO}/${id}`;
    const response = await api.put<PedidoResponseDto>(url);
    return response.data;
  }

  static async getPedidosPendentesConfirmacao(): Promise<PedidoResponseDto[]> {
    const response = await api.get<PedidoResponseDto[]>(
      API_ROUTES.PEDIDO.GET_PEDIDOS_PENDENTES_CONFIRMACAO,
    );
    return response.data;
  }

  static async getPedidosUltimas12Horas(): Promise<PedidoResponseDto[]> {
    const response = await api.get<PedidoResponseDto[]>(
      API_ROUTES.PEDIDO.GET_PEDIDOS_ULTIMAS_12_HORAS,
    );
    return response.data;
  }

  static async getPedidosByEmpresaWithTimeLimit(): Promise<
    PedidoResponseDto[]
  > {
    const response = await api.get<PedidoResponseDto[]>(
      API_ROUTES.PEDIDO.GET_PEDIDOS_BY_EMPRESA_WITH_TIME_LIMIT,
    );
    return response.data;
  }

  static async confirmarPedido(
    id: string,
    data?: { usuarioConfirmou?: string },
  ): Promise<PedidoResponseDto> {
    const url = `${API_ROUTES.PEDIDO.CONFIRMAR_PEDIDO}/${id}`;
    const response = await api.put<PedidoResponseDto>(url, data || {});
    return response.data;
  }
}
