"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { usePedidos } from "@/hooks/usePedidos";
import {
  calcularTempoDecorridoComTempo,
  calcularTempoRestanteComTempo,
  formatarDataAmigavel,
} from "@/lib/tempo-utils";
import { cn } from "@/lib/utils";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { useDraggable } from "@dnd-kit/core";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface OrderCardEnhancedProps {
  order: PedidoResponseDto;
  isDragging?: boolean;
  showCompleteButton?: boolean;
  onComplete?: () => void;
}

export function OrderCard({
  order,
  isDragging = false,
  showCompleteButton = true,
  onComplete,
}: OrderCardEnhancedProps) {
  const { tempoPreparoMedio } = useAuth();
  const { concluirPedido, isPedidoConcluido } = usePedidos();
  const [isCompletingOrder, setIsCompletingOrder] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualizar tempo a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Atualizar a cada 1 minuto

    return () => clearInterval(interval);
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: dndIsDragging,
  } = useDraggable({
    id: order.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  const totalItens =
    order.itens?.reduce((acc, item) => acc + item.quantidade, 0) || 0;

  // Usar currentTime para cálculos dinâmicos dos tempos
  const tempoDecorrido = calcularTempoDecorridoComTempo(
    order.criadoEm,
    currentTime,
  );
  const isCompleto = isPedidoConcluido(order);

  // Calcular tempo restante se o pedido não estiver concluído
  const tempoRestante =
    !isCompleto && tempoPreparoMedio
      ? calcularTempoRestanteComTempo(
          order.criadoEm,
          tempoPreparoMedio,
          currentTime,
        )
      : null;

  const isAtrasado = tempoRestante?.status === "atrasado";
  const isAtencao = tempoRestante?.status === "atencao";

  const handleCompleteOrder = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isCompleto || isCompletingOrder) return;

    try {
      setIsCompletingOrder(true);
      await concluirPedido(order.id);
      onComplete?.();
    } catch (error) {
      console.error("Erro ao concluir pedido:", error);
    } finally {
      setIsCompletingOrder(false);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab active:cursor-grabbing transition-all duration-200",
        (isDragging || dndIsDragging) && "opacity-50 rotate-2 shadow-lg",
        isAtrasado && "border-l-4 border-l-red-500",
        isAtencao && "border-l-4 border-l-yellow-500",
        isCompleto && "border-l-4 border-l-green-500 opacity-75",
        "hover:shadow-md",
      )}
      {...listeners}
      {...attributes}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header do pedido */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {order.codigo}
            </Badge>

            {isCompleto && (
              <Badge variant="default" className="text-xs bg-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Concluído
              </Badge>
            )}

            {isAtrasado && !isCompleto && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Atrasado
              </Badge>
            )}

            {isAtencao && !isCompleto && (
              <Badge
                variant="outline"
                className="text-xs text-yellow-600 border-yellow-600"
              >
                <Clock className="w-3 h-3 mr-1" />
                Atenção
              </Badge>
            )}
          </div>

          <div className="text-xs text-muted-foreground">
            R$ {formatCurrency(order.valorTotal)}
          </div>
        </div>
        {/* Informações do cliente */}
        {order.endereco && (
          <div className="flex items-start gap-2 text-sm">
            <User className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">Cliente</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">
                  {order.endereco.rua}, {order.endereco.numero} -{" "}
                  {order.endereco.bairro}
                </span>
              </div>
            </div>
          </div>
        )}
        {/* Informações dos itens */}
        <div className="flex items-center gap-2 text-sm">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">
            {totalItens} {totalItens === 1 ? "item" : "itens"}
          </span>
        </div>{" "}
        {/* Lista de itens resumida */}
        {order.itens && order.itens.length > 0 && (
          <div className="space-y-1">
            {order.itens.slice(0, 3).map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="truncate">
                    {item.quantidade}x {item.produto?.nome || `Item ${item.id}`}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    R$ {formatCurrency(item.precoUnitario * item.quantidade)}
                  </span>
                </div>{" "}
                {item.observacao && (
                  <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded italic">
                    &ldquo;{item.observacao}&rdquo;
                  </div>
                )}
              </div>
            ))}
            {order.itens.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{order.itens.length - 3} itens...
              </div>
            )}
          </div>
        )}
        {/* Observações */}
        {order.observacao && (
          <div className="text-xs p-2 bg-muted rounded">
            <strong>Obs:</strong> {order.observacao}
          </div>
        )}
        {/* Footer com tempo e controles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{tempoDecorrido}</span>
            {tempoRestante && !isCompleto && (
              <span
                className={cn(
                  "ml-2 font-medium",
                  isAtrasado && "text-red-600",
                  isAtencao && "text-yellow-600",
                )}
              >
                (
                {tempoRestante.restante > 0
                  ? `${tempoRestante.restante}min restantes`
                  : `${Math.abs(tempoRestante.restante)}min atrasado`}
                )
              </span>
            )}
          </div>

          {/* Botão de concluir */}
          {showCompleteButton && !isCompleto && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleCompleteOrder}
              disabled={isCompletingOrder}
              className="h-6 px-2 text-xs"
            >
              {isCompletingOrder ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-current mr-1" />
                  Concluindo...
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Concluir
                </>
              )}
            </Button>
          )}
        </div>
        {/* Informações de fonte e pagamento */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {order.fonte && (
              <Badge variant="secondary" className="text-xs">
                {order.fonte.nome}
              </Badge>
            )}
            {order.pagamento && (
              <Badge variant="outline" className="text-xs">
                {order.pagamento.nome}
              </Badge>
            )}
          </div>

          {isCompleto && order.concluidoEm && (
            <div className="text-xs text-muted-foreground">
              Concluído: {formatarDataAmigavel(order.concluidoEm)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Função auxiliar para formatar moeda
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
