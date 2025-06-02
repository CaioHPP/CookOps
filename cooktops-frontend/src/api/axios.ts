import axios from "axios";
import { API_BASE_URL } from "./api.config";
import { AuthService } from "./services/auth.service";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
      // Optionally, you can redirect the user to the login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
