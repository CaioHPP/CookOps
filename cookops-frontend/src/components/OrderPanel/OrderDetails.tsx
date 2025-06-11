import { ConfirmationBadge } from "./ConfirmationBadge";
import type { Order } from "./types";

interface OrderDetailsProps {
  order: Order | null;
  onConfirmOrder?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  isConfirmandoPedido?: (orderId: string) => boolean;
  isCancelandoPedido?: (orderId: string) => boolean;
}

export function OrderDetails({
  order,
  onConfirmOrder,
  onCancelOrder,
  isConfirmandoPedido = () => false,
  isCancelandoPedido = () => false,
}: OrderDetailsProps) {
  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground bg-background">
        Selecione um pedido para ver os detalhes
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background border-l border-border">
      {/* Conteúdo com scroll independente */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-[32px] font-bold text-foreground">
              {order.itemCount} {order.itemCount === 1 ? "item" : "itens"} - R${" "}
              {order.totalValue.toFixed(2)}
            </h1>
            <p className="text-[14px] text-muted-foreground">
              Pedido {order.codigo}
            </p>
            {/* Badge de confirmação no header */}
            {order.needsConfirmation && order.timeRemaining && (
              <div className="mt-2">
                <ConfirmationBadge
                  timeRemaining={order.timeRemaining}
                  isExpired={order.isExpired || false}
                  tempoRestanteMinutos={order.tempoRestanteMinutos}
                />
              </div>
            )}
          </div>{" "}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onCancelOrder?.(order.id)}
              disabled={isCancelandoPedido(order.id)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isCancelandoPedido(order.id) && (
                <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent"></div>
              )}
              Cancelar pedido
            </button>
            {order.needsConfirmation ? (
              <button
                onClick={() => onConfirmOrder?.(order.id)}
                disabled={order.isExpired || isConfirmandoPedido(order.id)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  order.isExpired
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isConfirmandoPedido(order.id) && (
                  <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                )}
                {order.isExpired
                  ? "Tempo expirado"
                  : isConfirmandoPedido(order.id)
                  ? "Confirmando..."
                  : "Confirmar pedido"}
              </button>
            ) : (
              <span className="px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md">
                Pedido confirmado
              </span>
            )}
          </div>
        </div>

        {/* Detalhes do pedido */}
        <div className="mb-8">
          <h2 className="text-[20px] font-bold mb-4 text-foreground">
            Detalhes do pedido
          </h2>
          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Tipo de pedido
              </p>
              <p className="text-foreground">{order.source}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Hora do pedido
              </p>
              <p className="text-foreground">{order.orderTime || order.time}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Nome do cliente
              </p>
              <p className="text-foreground">{order.customerName || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Telefone de contato
              </p>
              <p className="text-foreground">{order.customerPhone || "-"}</p>
            </div>
            {order.needsConfirmation && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Status de confirmação
                  </p>
                  <p className="text-foreground">Aguardando confirmação</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tempo restante
                  </p>
                  <p
                    className={`text-foreground ${
                      order.isExpired ? "text-red-600 font-medium" : ""
                    }`}
                  >
                    {order.timeRemaining}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="mb-8">
          <h2 className="text-[20px] font-bold mb-4 text-foreground">Itens</h2>
          <div className="border border-border rounded-md bg-card">
            <div className="grid grid-cols-[1fr_100px_100px] px-4 py-3 border-b border-b-border bg-muted">
              <div className="text-sm font-medium text-foreground">Item</div>
              <div className="text-sm font-medium text-center text-foreground">
                Quantidade
              </div>
              <div className="text-sm font-medium text-right text-foreground">
                Preço
              </div>
            </div>
            <div className="divide-y divide-border">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_100px_100px] px-4 py-3"
                >
                  <div className="text-foreground">{item.name}</div>
                  <div className="text-center text-foreground">
                    {item.quantity}
                  </div>
                  <div className="text-right text-foreground">
                    R$ {item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">
              R$ {order.subtotal?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxas</span>
            <span className="text-foreground">
              R$ {order.fees?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">
              R$ {order.totalValue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
