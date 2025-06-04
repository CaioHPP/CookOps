import React from "react";
import type { Order } from "./types";

interface OrderDetailsProps {
  order: Order | null;
  onConfirmOrder?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
}

export function OrderDetails({
  order,
  onConfirmOrder,
  onCancelOrder,
}: OrderDetailsProps) {
  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Selecione um pedido para ver os detalhes
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-white">
      {/* Header */}
      <div className="space-y-1 mb-8">
        <h1 className="text-[32px] font-bold text-foreground">
          {order.itemCount} {order.itemCount === 1 ? "item" : "itens"} - R${" "}
          {order.totalValue.toFixed(2)}
        </h1>
        <p className="text-[14px] text-muted-foreground">Pedido #{order.id}</p>
      </div>

      {/* Detalhes do pedido */}
      <div className="mb-8">
        <h2 className="text-[20px] font-bold mb-4">Detalhes do pedido</h2>
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tipo de pedido</p>
            <p>{order.source === "balcao" ? "Balcão" : "App"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Hora do pedido</p>
            <p>{order.orderTime || order.time}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Nome do cliente
            </p>
            <p>{order.customerName || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Telefone de contato
            </p>
            <p>{order.customerPhone || "-"}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <h2 className="text-[20px] font-bold mb-4">Itens</h2>
        <div className="border rounded-md">
          <div className="grid grid-cols-[1fr_100px_100px] px-4 py-3 border-b bg-muted/50">
            <div className="text-sm font-medium">Item</div>
            <div className="text-sm font-medium text-center">Quantity</div>
            <div className="text-sm font-medium text-right">Price</div>
          </div>
          <div className="divide-y">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_100px_100px] px-4 py-3"
              >
                <div>{item.name}</div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-right">R$ {item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>R$ {order.subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Taxas</span>
          <span>R$ {order.fees?.toFixed(2) || "0.00"}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>R$ {order.totalValue.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => onCancelOrder?.(order.id)}
          className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors"
        >
          Cancelar pedido
        </button>
        <button
          onClick={() => onConfirmOrder?.(order.id)}
          className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
}