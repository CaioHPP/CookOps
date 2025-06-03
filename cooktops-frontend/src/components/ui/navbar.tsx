import { AuthService } from "@/api/services/auth.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  userName?: string;
  userEmail?: string;
  companyName?: string;
}

export function Navbar({
  userName = "Usuário",
  userEmail = "usuario@cookops.com",
  companyName = "Empresa",
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    AuthService.logout();
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Logo />
        </div>{" "}
        {/* Navigation Links */}
        <div className="ml-8 flex items-center space-x-4">
          <Link
            href="/pedidos"
            className={`text-sm font-medium transition-colors ${
              isActive("/pedidos")
                ? "text-purple-600 font-bold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Pedidos
          </Link>
          <Link
            href="/producao"
            className={`text-sm font-medium transition-colors ${
              isActive("/producao")
                ? "text-purple-600 font-bold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Produção
          </Link>
          <Link
            href="/cardapio"
            className={`text-sm font-medium transition-colors ${
              isActive("/cardapio")
                ? "text-purple-600 font-bold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Cardápio
          </Link>
          <Link
            href="/configuracoes"
            className={`text-sm font-medium transition-colors ${
              isActive("/configuracoes")
                ? "text-purple-600 font-bold"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Configurações
          </Link>
        </div>
        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Company name */}
          <span className="text-sm text-gray-600">{companyName}</span>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-500">{userEmail}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/perfil" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/configuracoes" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
