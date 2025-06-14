import {
  FontePedidoRequestAddDto,
  FontePedidoRequestUpdateDto,
} from "@/types/dto/fontepedido/request/fontepedido-request.dto";
import { FontePedidoResponseDto } from "@/types/dto/fontepedido/response/fontepedido-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class FontePedidoService {
  static async addFontePedido(
    data: FontePedidoRequestAddDto,
  ): Promise<FontePedidoResponseDto> {
    const response = await api.post<FontePedidoResponseDto>(
      API_ROUTES.FONTE_PEDIDO.ADD_FONTE_PEDIDO,
      data,
    );
    return response.data;
  }

  static async getFontesPagamento(): Promise<FontePedidoResponseDto[]> {
    const response = await api.get<FontePedidoResponseDto[]>(
      API_ROUTES.FONTE_PEDIDO.GET_FONTES_PEDIDO,
    );
    return response.data;
  }

  static async getFontePedidoById(id: number): Promise<FontePedidoResponseDto> {
    const url = `${API_ROUTES.FONTE_PEDIDO.GET_FONTE_PEDIDO_BY_ID}/${id}`;
    const response = await api.get<FontePedidoResponseDto>(url);
    return response.data;
  }

  static async updateFontePedido(
    id: number,
    data: FontePedidoRequestUpdateDto,
  ): Promise<FontePedidoResponseDto> {
    const url = `${API_ROUTES.FONTE_PEDIDO.UPDATE_FONTE_PEDIDO}/${id}`;
    const response = await api.put<FontePedidoResponseDto>(url, data);
    return response.data;
  }

  static async deleteFontePedido(id: number): Promise<void> {
    const url = `${API_ROUTES.FONTE_PEDIDO.DELETE_FONTE_PEDIDO}/${id}`;
    await api.delete(url);
  }
}
