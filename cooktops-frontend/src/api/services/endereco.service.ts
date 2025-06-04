import { API_ROUTES } from "@/api/api.routes";
import api from "@/api/axios";
import {
  EnderecoRequestAddDto,
  EnderecoRequestUpdateDto,
} from "@/types/dto/endereco/request/endereco-request.dto";
import { EnderecoResponseDto } from "@/types/dto/endereco/response/endereco-response.dto";

export class EnderecoService {
  static async createEndereco(
    data: EnderecoRequestAddDto
  ): Promise<EnderecoResponseDto> {
    const response = await api.post<EnderecoResponseDto>(
      API_ROUTES.ENDERECO.ADD_ENDERECO,
      data
    );
    return response.data;
  }

  static async getEnderecos(): Promise<EnderecoResponseDto[]> {
    const response = await api.get<EnderecoResponseDto[]>(
      API_ROUTES.ENDERECO.GET_ENDERECOS
    );
    return response.data;
  }

  static async getEnderecoById(id: string): Promise<EnderecoResponseDto> {
    const url = `${API_ROUTES.ENDERECO.GET_ENDERECO_BY_ID}/${id}`;
    const response = await api.get<EnderecoResponseDto>(url);
    return response.data;
  }

  static async updateEndereco(
    id: string,
    data: EnderecoRequestUpdateDto
  ): Promise<EnderecoResponseDto> {
    const url = `${API_ROUTES.ENDERECO.UPDATE_ENDERECO}/${id}`;
    const response = await api.put<EnderecoResponseDto>(url, data);
    return response.data;
  }

  static async deleteEndereco(id: string): Promise<void> {
    const url = `${API_ROUTES.ENDERECO.DELETE_ENDERECO}/${id}`;
    await api.delete(url);
  }
}
