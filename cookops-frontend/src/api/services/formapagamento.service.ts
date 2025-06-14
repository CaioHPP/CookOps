import {
  FormaPagamentoRequestAddDto,
  FormaPagamentoRequestUpdateDto,
  ToggleStatusFormaPagamentoRequestDto,
} from "@/types/dto/formapagamento/request/formapagamento-request.dto";
import { FormaPagamentoResponseDto } from "@/types/dto/formapagamento/response/formapagamento-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class FormaPagamentoService {
  static async addFormaPagamento(
    data: FormaPagamentoRequestAddDto,
  ): Promise<FormaPagamentoResponseDto> {
    const response = await api.post<FormaPagamentoResponseDto>(
      API_ROUTES.FORMA_PAGAMENTO.ADD_FORMA_PAGAMENTO,
      data,
    );
    return response.data;
  }

  static async getFormasPagamento(): Promise<FormaPagamentoResponseDto[]> {
    const response = await api.get<FormaPagamentoResponseDto[]>(
      API_ROUTES.FORMA_PAGAMENTO.GET_FORMAS_PAGAMENTO,
    );
    return response.data;
  }

  static async getFormasPagamentoByEmpresa(): Promise<
    FormaPagamentoResponseDto[]
  > {
    const response = await api.get<FormaPagamentoResponseDto[]>(
      API_ROUTES.FORMA_PAGAMENTO.GET_FORMAS_PAGAMENTO_BY_EMPRESA,
    );
    return response.data;
  }

  static async getFormaPagamentoById(
    id: number,
  ): Promise<FormaPagamentoResponseDto> {
    const url = `${API_ROUTES.FORMA_PAGAMENTO.GET_FORMA_PAGAMENTO_BY_ID}/${id}`;
    const response = await api.get<FormaPagamentoResponseDto>(url);
    return response.data;
  }

  static async updateFormaPagamento(
    id: number,
    data: FormaPagamentoRequestUpdateDto,
  ): Promise<FormaPagamentoResponseDto> {
    const url = `${API_ROUTES.FORMA_PAGAMENTO.UPDATE_FORMA_PAGAMENTO}/${id}`;
    const response = await api.put<FormaPagamentoResponseDto>(url, data);
    return response.data;
  }

  static async deleteFormaPagamento(id: number): Promise<void> {
    const url = `${API_ROUTES.FORMA_PAGAMENTO.DELETE_FORMA_PAGAMENTO}/${id}`;
    await api.delete(url);
  }

  static async toggleStatusFormaPagamento(
    id: number,
    data: ToggleStatusFormaPagamentoRequestDto,
  ): Promise<FormaPagamentoResponseDto> {
    const url = `${API_ROUTES.FORMA_PAGAMENTO.TOGGLE_STATUS_FORMA_PAGAMENTO}/${id}/toggle-status`;
    const response = await api.patch<FormaPagamentoResponseDto>(url, data);
    return response.data;
  }
}
