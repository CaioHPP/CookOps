"use client";

import { AuthService } from "@/api/services/auth.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  Bell,
  ChefHat,
  LogOut,
  Menu,
  Moon,
  Settings,
  ShoppingCart,
  Sliders,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Switch } from "../ui/switch";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log("Iniciando processo de logout...");

      // Executar logout completo que inclui desconexão do WebSocket
      await AuthService.logoutComplete();

      console.log("Logout concluído, redirecionando...");

      // Redirecionar para a página de login
      router.push("/");
      router.refresh(); // Forçar refresh da página
    } catch (error) {
      console.error("Erro durante o logout:", error);
      // Mesmo com erro, tentar redirecionar
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background"
      data-name="navbar"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* CookOps name at the left */}
        <div className="text-lg font-semibold">CookOps</div>

        {/* Right side content */}
        <div className="flex items-center gap-6">
          {" "}
          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            <Link href="/dashboard" className="text-sm font-medium">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/pedidos" className="text-sm font-medium">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm font-medium"
              >
                <ShoppingCart className="h-4 w-4" />
                Pedidos
              </Button>
            </Link>
            <Link href="/producao" className="text-sm font-medium">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm font-medium"
              >
                <ChefHat className="h-4 w-4" />
                Produção
              </Button>
            </Link>
            <Link href="/cardapio" className="text-sm font-medium">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm font-medium"
              >
                <Menu className="h-4 w-4" />
                Cardápio
              </Button>
            </Link>
            <Link href="/configuracoes" className="text-sm font-medium">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm font-medium"
              >
                <Sliders className="h-4 w-4" />
                Configurações
              </Button>
            </Link>
          </div>
          {/* User actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
            </Button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {sessionStorage.getItem("nome")?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <Link href="/configuracoes">
                  <DropdownMenuItem className="gap-2">
                    <Settings className="h-4 w-4" />
                    Configurações
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                      }
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem
                  className="gap-2 text-red-600"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4" />
                  {isLoggingOut ? "Saindo..." : "Sair"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
