import { AuthService } from "@services/auth.service";
import { NextRequest, NextResponse } from "next/server";

// Defina aqui as rotas protegidas
const protectedRoutes = [
  "/pedido",
  "/fontepedido",
  "/formapagamento",
  "/empresa",
  "/usuario",
  "/produto",
  "/board",
  "/pedidoitem",
  "/endereco",
  "/pedidostatus",
];

export function middleware(req: NextRequest) {
  const token = AuthService.getToken();

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && (!token || !AuthService.isAuthenticated())) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pedido",
    "/fontepedido",
    "/formapagamento",
    "/empresa",
    "/usuario",
    "/produto",
    "/board",
    "/pedidoitem",
    "/endereco",
    "/pedidostatus",
  ],
};
