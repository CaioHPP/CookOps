"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { useDroppable } from "@dnd-kit/core";
import { OrderCard } from "./OrderCard";

interface StatusColumnProps {
  status: PedidoStatusResponseWithPedidosAndItensDto;
  orders: PedidoResponseDto[];
  isLastStatus?: boolean;
  onCompleteOrder?: (orderId: string) => void;
}

export function StatusColumn({
  status,
  orders,
  isLastStatus = false,
  onCompleteOrder,
}: StatusColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status.id.toString(),
  });

  const getStatusColor = (ordem: number) => {
    const colors = [
      "bg-red-100 text-red-800 border-red-200", // Pendente
      "bg-yellow-100 text-yellow-800 border-yellow-200", // Em preparo
      "bg-blue-100 text-blue-800 border-blue-200", // Pronto
      "bg-green-100 text-green-800 border-green-200", // Entregue
    ];
    return colors[ordem - 1] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-w-[320px] max-w-[320px]">
      {/* Header da coluna - sempre visível */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground">{status.titulo}</h3>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", getStatusColor(status.ordem))}
          >
            {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
          </Badge>
        </div>
        <div className="h-1 bg-muted rounded-full">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              status.ordem === 1 && "bg-red-500",
              status.ordem === 2 && "bg-yellow-500",
              status.ordem === 3 && "bg-blue-500",
              status.ordem === 4 && "bg-green-500",
              status.ordem > 4 && "bg-purple-500"
            )}
          />
        </div>
      </div>

      {/* Área de drop - scrollável */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 overflow-y-auto min-h-[480px] p-2 rounded-lg border-2 border-dashed transition-colors",
          isOver ? "border-primary bg-primary/10" : "border-muted bg-muted/20",
          "space-y-3"
        )}
      >
        {orders.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground text-sm">
              Nenhum pedido neste status
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              showCompleteButton={isLastStatus}
              onComplete={() => onCompleteOrder?.(order.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
