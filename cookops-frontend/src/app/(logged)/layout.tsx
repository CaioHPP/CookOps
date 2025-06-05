"use client";

import { AuthService } from "@/api/services/auth.service";
import { Navbar } from "@/components/NavBar/NavBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  user: string;
  empresaId: string;
  role: string;
  nomeEmpresa?: string;
  emailUsuario?: string;
}

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }

    // Pega os dados do token decodificado
    const decodedToken = AuthService.getDecodedToken();
    if (decodedToken) {
      setUser(decodedToken);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}
