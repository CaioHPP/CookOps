import { cn } from "@/lib/utils";

interface ConfirmationBadgeProps {
  timeRemaining: string;
  isExpired: boolean;
  tempoRestanteMinutos?: number;
  className?: string;
}

export function ConfirmationBadge({
  timeRemaining,
  isExpired,
  tempoRestanteMinutos = 0,
  className,
}: ConfirmationBadgeProps) {
  // Determinar a cor baseada no tempo restante
  const getVariant = () => {
    if (isExpired || tempoRestanteMinutos < 3) return "destructive";
    return "warning"; // Amarelo para "Confirmação pendente"
  };

  const variant = getVariant();

  const variantClasses = {
    destructive: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  const getDisplayText = () => {
    if (isExpired) return "Expirado";
    if (tempoRestanteMinutos < 3) return timeRemaining;
    return "Confirmação pendente";
  };

  const getIcon = () => {
    if (isExpired || tempoRestanteMinutos < 3) return "🔴";
    return "🕐"; // Ícone de relógio
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
    >
      {getIcon()} {getDisplayText()}
    </span>
  );
}
