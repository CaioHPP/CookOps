import {
  ProdutoRequestAddDto,
  ProdutoRequestUpdateDto,
} from "@/types/dto/produto/request/produto-request.dto";
import { ProdutoResponseDto } from "@/types/dto/produto/response/produto-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class ProdutoService {
  static async addProduto(
    data: ProdutoRequestAddDto,
  ): Promise<ProdutoResponseDto> {
    const response = await api.post<ProdutoResponseDto>(
      API_ROUTES.PRODUTO.ADD_PRODUTO,
      data,
    );
    return response.data;
  }

  static async getProdutos(): Promise<ProdutoResponseDto[]> {
    const response = await api.get<ProdutoResponseDto[]>(
      API_ROUTES.PRODUTO.GET_PRODUTOS_BY_EMPRESA_AUTH,
    );
    return response.data;
  }

  static async getProdutosByEmpresaAuth(): Promise<ProdutoResponseDto[]> {
    const response = await api.get<ProdutoResponseDto[]>(
      API_ROUTES.PRODUTO.GET_PRODUTOS_BY_EMPRESA_AUTH,
    );
    return response.data;
  }

  static async getProdutosByEmpresa(
    empresaId: string,
  ): Promise<ProdutoResponseDto[]> {
    const url = API_ROUTES.PRODUTO.GET_PRODUTOS_BY_EMPRESA.replace(
      ":empresaId",
      empresaId,
    );
    const response = await api.get<ProdutoResponseDto[]>(url);
    return response.data;
  }

  static async getProdutoById(id: string): Promise<ProdutoResponseDto> {
    const url = `${API_ROUTES.PRODUTO.GET_PRODUTO_BY_ID}/${id}`;
    const response = await api.get<ProdutoResponseDto>(url);
    return response.data;
  }

  static async updateProduto(
    id: string,
    data: ProdutoRequestUpdateDto,
  ): Promise<ProdutoResponseDto> {
    const url = `${API_ROUTES.PRODUTO.UPDATE_PRODUTO}/${id}`;
    const response = await api.put<ProdutoResponseDto>(url, data);
    return response.data;
  }

  static async deleteProduto(id: string): Promise<void> {
    const url = `${API_ROUTES.PRODUTO.DELETE_PRODUTO}/${id}`;
    await api.delete(url);
  }
}
