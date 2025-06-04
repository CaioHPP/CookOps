import { LoginRequestDto } from "@/types/dto/auth/request/auth-request.dto";
import { DecodedTokenDto } from "@/types/dto/auth/response/auth-response.dto";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class AuthService {
  static async login(data: LoginRequestDto): Promise<DecodedTokenDto> {
    const response = await api.post<{ access_token: string }>(
      API_ROUTES.AUTH.LOGIN,
      data
    );

    const accessToken = response.data.access_token;

    const decoded: DecodedTokenDto = jwtDecode(accessToken); // Salva o token no sessionStorage e como cookie
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("nome", decoded.nome);
    sessionStorage.setItem("email", decoded.email);
    sessionStorage.setItem("nomeEmpresa", decoded.nomeEmpresa);
    //sessionStorage.setItem("empresaId", decoded.empresaId);
    // sessionStorage.setItem("role", decoded.role);

    // Também salva como cookie para o middleware
    document.cookie = `token=${accessToken}; path=/; max-age=${
      7 * 24 * 60 * 60
    }; secure; samesite=strict`;

    return decoded;
  }
  static logout() {
    sessionStorage.removeItem("token");
    // Remove o cookie também
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    sessionStorage.clear(); // Limpa todos os dados do sessionStorage
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
      const now = dayjs().unix(); // tempo atual em segundos
      return decoded.exp > now;
    } catch {
      return false;
    }
  }
}
