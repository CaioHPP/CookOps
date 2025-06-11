"use client";

import { AuthService } from "@/api/services/auth.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!email || !password) {
        setError("Email e senha são obrigatórios");
        return;
      }
      
      await AuthService.login({ email, senha: password });
      router.push("/pedidos");
    } catch (err: unknown) {
      console.error("Erro ao fazer login:", err);
      if (err && typeof err === "object") {
        const errorObj = err as Record<string, unknown>;
        
        if (errorObj.code === "ERR_NETWORK") {
          setError(
            "Erro de conexão com o servidor. Verifique se o servidor está rodando na porta 3000."
          );
        } else if (errorObj.response && typeof errorObj.response === "object") {
          const response = errorObj.response as { status?: number };
          if (response.status === 401) {
            setError("Email ou senha inválidos");
          } else if (response.status === 404) {
            setError("Serviço de autenticação não encontrado. Verifique a URL da API.");
          } else if (response.status === 500) {
            setError("Erro interno do servidor");
          }
        } else if (errorObj.message && typeof errorObj.message === "string") {
          if (errorObj.message === "Token não fornecido pelo servidor") {
            setError("Erro de autenticação: token não fornecido");
          } else {
            setError(errorObj.message);
          }
        } else {
          setError("Erro ao fazer login. Tente novamente.");
        }
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex justify-center mb-6">
        <Logo />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>
            Digite seu email abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
