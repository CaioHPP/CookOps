import axios from "axios";
import { API_BASE_URL } from "./api.config";
import { AuthService } from "./services/auth.service";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Debug
    console.log("Config da requisição:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    // Debug
    console.log("Resposta da API:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Debug
    console.error("Erro na requisição:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      config: error.config,
    });

    if (error.response?.status === 401) {
      AuthService.logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
