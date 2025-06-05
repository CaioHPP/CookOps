"use client";

import { DecodedTokenDto } from "@dto/auth/response/auth-response.dto";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<DecodedTokenDto | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token") || "";

      if (token) {
        try {
          const decoded = jwtDecode<DecodedTokenDto>(token);
          setUser(decoded);
        } catch (err) {
          console.error("Erro ao decodificar o token:", err);
          setUser(null);
        }
      }
    }
  }, []);
  return {
    user,
    isAuthenticated: !!user,
    role: user?.role,
    empresaId: user?.empresaId,
    tempoPreparoMedio: user?.tempoPreparoMedio,
  };
}
