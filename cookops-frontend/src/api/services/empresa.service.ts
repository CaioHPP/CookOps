import {
  EmpresaRequestAddDto,
  EmpresaRequestUpdateDto,
} from "@/types/dto/empresa/request/empresa-request.dto";
import { EmpresaCompletaResponseDto } from "@/types/dto/empresa/response/empresa-completa-response.dto";
import { EmpresaResponseDto } from "@/types/dto/empresa/response/empresa-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class EmpresaService {
  static async addEmpresa(
    data: EmpresaRequestAddDto,
  ): Promise<EmpresaResponseDto> {
    const response = await api.post<EmpresaResponseDto>(
      API_ROUTES.EMPRESA.ADD_EMPRESA,
      data,
    );
    return response.data;
  }

  static async getEmpresas(): Promise<EmpresaResponseDto[]> {
    const response = await api.get<EmpresaResponseDto[]>(
      API_ROUTES.EMPRESA.GET_EMPRESAS,
    );
    return response.data;
  }

  static async getEmpresaById(id: string): Promise<EmpresaResponseDto> {
    const url = `${API_ROUTES.EMPRESA.GET_EMPRESA_BY_ID}/${id}`;
    const response = await api.get<EmpresaResponseDto>(url);
    return response.data;
  }

  static async updateEmpresa(
    id: string,
    data: EmpresaRequestUpdateDto,
  ): Promise<EmpresaResponseDto> {
    const url = `${API_ROUTES.EMPRESA.UPDATE_EMPRESA}/${id}`;
    const response = await api.put<EmpresaResponseDto>(url, data);
    return response.data;
  }
  static async deleteEmpresa(id: string): Promise<void> {
    const url = `${API_ROUTES.EMPRESA.DELETE_EMPRESA}/${id}`;
    await api.delete(url);
  }

  static async getEmpresaCompletaByAuth(): Promise<EmpresaCompletaResponseDto> {
    const response = await api.get<EmpresaCompletaResponseDto>(
      API_ROUTES.EMPRESA.GET_EMPRESA_COMPLETA_BY_AUTH,
    );
    return response.data;
  }
}
