import { API_ROUTES } from "@/api/api.routes";
import api from "@/api/axios";
import {
  CreateConfiguracaoEmpresaDto,
  UpdateConfiguracaoEmpresaDto,
} from "@/types/dto/configuracao-empresa/request/configuracao-empresa-request.dto";
import { ConfiguracaoEmpresaResponseDto } from "@/types/dto/configuracao-empresa/response/configuracao-empresa-response.dto";

export class ConfiguracaoEmpresaService {
  static async getConfiguracaoByEmpresa(
    empresaId?: string,
  ): Promise<ConfiguracaoEmpresaResponseDto | null> {
    try {
      const url = empresaId
        ? `${API_ROUTES.CONFIGURACAO_EMPRESA.GET_CONFIGURACAO}/${empresaId}`
        : API_ROUTES.CONFIGURACAO_EMPRESA.GET_CONFIGURACAO;

      const response = await api.get<ConfiguracaoEmpresaResponseDto>(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar configurações da empresa:", error);
      return null;
    }
  }

  static async createConfiguracao(
    data: CreateConfiguracaoEmpresaDto,
  ): Promise<ConfiguracaoEmpresaResponseDto | null> {
    try {
      const response = await api.post<ConfiguracaoEmpresaResponseDto>(
        API_ROUTES.CONFIGURACAO_EMPRESA.CREATE_CONFIGURACAO,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar configurações da empresa:", error);
      throw error;
    }
  }

  static async updateConfiguracao(
    empresaId: string,
    data: UpdateConfiguracaoEmpresaDto,
  ): Promise<ConfiguracaoEmpresaResponseDto | null> {
    try {
      const response = await api.patch<ConfiguracaoEmpresaResponseDto>(
        `${API_ROUTES.CONFIGURACAO_EMPRESA.UPDATE_CONFIGURACAO}/${empresaId}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar configurações da empresa:", error);
      throw error;
    }
  }

  static async deleteConfiguracao(empresaId: string): Promise<boolean> {
    try {
      await api.delete(
        `${API_ROUTES.CONFIGURACAO_EMPRESA.DELETE_CONFIGURACAO}/${empresaId}`,
      );
      return true;
    } catch (error) {
      console.error("Erro ao deletar configurações da empresa:", error);
      return false;
    }
  }
}
