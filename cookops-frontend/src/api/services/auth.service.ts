import { LoginRequestDto } from "@/types/dto/auth/request/auth-request.dto";
import { DecodedTokenDto } from "@/types/dto/auth/response/auth-response.dto";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class AuthService {
  static async login(data: LoginRequestDto): Promise<DecodedTokenDto> {
    try {
      const response = await api.post<{ access_token: string }>(
        API_ROUTES.AUTH.LOGIN,
        data
      );

      const accessToken = response.data.access_token;
      const decoded: DecodedTokenDto = jwtDecode(accessToken);

      // Salva o token e informações importantes no sessionStorage
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("empresaId", decoded.empresaId);
      sessionStorage.setItem("role", decoded.role);
      sessionStorage.setItem("nome", decoded.nome);
      sessionStorage.setItem("email", decoded.email);
      sessionStorage.setItem("nomeEmpresa", decoded.nomeEmpresa);
      sessionStorage.setItem(
        "tempoPreparoMedio",
        decoded.tempoPreparoMedio?.toString() || "30"
      );

      // Também salva como cookie para o middleware
      document.cookie = `token=${accessToken}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; secure; samesite=strict`;

      return decoded;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }
  static logout() {
    try {
      // Limpar sessionStorage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("empresaId");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("nome");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("nomeEmpresa");
      sessionStorage.removeItem("tempoPreparoMedio");

      // Limpar localStorage (caso tenha algo armazenado)
      localStorage.removeItem("token");
      localStorage.removeItem("empresaId");
      localStorage.removeItem("role");
      localStorage.removeItem("nome");
      localStorage.removeItem("email");
      localStorage.removeItem("nomeEmpresa");
      localStorage.removeItem("tempoPreparoMedio");

      // Limpar todos os cookies relacionados à autenticação
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";
      document.cookie =
        "empresaId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";
      document.cookie =
        "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict";

      // Limpar sessionStorage completo se necessário
      sessionStorage.clear();

      console.log("Logout realizado com sucesso - dados limpos");
    } catch (error) {
      console.error("Erro durante o logout:", error);
      // Mesmo com erro, forçar a limpeza básica
      sessionStorage.clear();
      localStorage.clear();
    }
  }

  static async logoutComplete(): Promise<void> {
    try {
      // Emitir evento customizado para notificar componentes sobre o logout
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }

      // Aguardar um pouco para que os listeners processem o evento
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Executar logout padrão
      this.logout();

      // Redirecionamento será feito pelo componente que chama esta função
    } catch (error) {
      console.error("Erro no logout completo:", error);
      // Forçar limpeza mesmo com erro
      this.logout();
    }
  }

  static getToken(): string | null {
    return sessionStorage.getItem("token");
  }

  static getDecodedToken(): DecodedTokenDto | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedTokenDto>(token);
      const now = dayjs().unix();
      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  static getEmpresaId(): string | null {
    return sessionStorage.getItem("empresaId");
  }

  static getRole(): string | null {
    return sessionStorage.getItem("role");
  }
}
