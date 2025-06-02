import { LoginRequestDto } from "@/types/dto/auth/request/auth-request.dto";
import {
  DecodedTokenDto,
  LoginResponseDto,
} from "@/types/dto/auth/response/auth-response.dto";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class AuthService {
  static async login(data: LoginRequestDto): Promise<DecodedTokenDto> {
    const response = await api.post<LoginResponseDto>(
      API_ROUTES.AUTH.LOGIN,
      data
    );

    const { accessToken } = response.data;

    const decoded: DecodedTokenDto = jwtDecode(accessToken);

    // Salva o token no sessionStorage (ou outro mecanismo, se preferir)
    sessionStorage.setItem("token", accessToken);

    return decoded;
  }

  static logout() {
    sessionStorage.removeItem("token");
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
