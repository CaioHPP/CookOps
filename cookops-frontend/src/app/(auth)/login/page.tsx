"use client";

import { Logo } from "@/components/ui/logo";
import { LoginCard } from "@/components/loginCard/LoginCard";

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo className="h-10" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;O CookOps simplificou completamente nossa operação. Agora
              temos controle total dos pedidos e uma cozinha mais
              organizada.&rdquo;
            </p>
            <footer className="text-sm">Chef João Silva</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <LoginCard className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]" />
      </div>
    </div>
  );
}
