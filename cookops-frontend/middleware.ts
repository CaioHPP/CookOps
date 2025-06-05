import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

// Defina aqui as rotas protegidas
const protectedRoutes = [
  "/dashboard",
  "/pedidos",
  "/fontepedido",
  "/formapagamento",
  "/empresa",
  "/usuario",
  "/produto",
  "/board",
  "/pedidoitem",
  "/endereco",
  "/pedidostatus",
  "/configuracoes",
];

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const now = dayjs().unix();

      if (decoded.exp <= now) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/pedidos",
    "/fontepedido",
    "/formapagamento",
    "/empresa",
    "/usuario",
    "/produto",
    "/board",
    "/pedidoitem",
    "/endereco",
    "/pedidostatus",
    "/configuracoes",
  ],
};
