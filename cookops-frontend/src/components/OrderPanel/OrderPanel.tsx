import { useState } from "react";
import { CardList } from "./CardList";
import { OrderDetails } from "./OrderDetails";
import type { Order, TabType } from "./types";

interface OrderPanelProps {
  orders?: Order[];
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  selectedOrder?: Order | null;
  onOrderSelect?: (order: Order | null) => void;
  onConfirmOrder?: (id: string) => void;
  onCancelOrder?: (id: string) => void;
  onNewOrder?: () => void;
  isConfirmandoPedido?: (id: string) => boolean;
  isCancelandoPedido?: (id: string) => boolean;
}

export default function OrderPanel({
  orders = [],
  activeTab = "todos",
  onTabChange,
  selectedOrder: providedSelectedOrder,
  onOrderSelect: providedOnOrderSelect,
  onConfirmOrder = (id) => console.log("Confirm order", id),
  onCancelOrder = (id) => console.log("Cancel order", id),
  onNewOrder,
  isConfirmandoPedido = () => false,
  isCancelandoPedido = () => false,
}: OrderPanelProps) {
  const [localSelectedOrderId, setLocalSelectedOrderId] = useState<string>("");

  // Use provided selectedOrder or fallback to local state
  const selectedOrder =
    providedSelectedOrder !== undefined
      ? providedSelectedOrder
      : orders.find((order) => order.id === localSelectedOrderId) || null;

  const handleOrderSelect = (order: Order | null) => {
    if (providedOnOrderSelect) {
      providedOnOrderSelect(order);
    } else {
      setLocalSelectedOrderId(order?.id || "");
    }
  };
  return (
    <div className="h-full flex overflow-hidden bg-background">
      <CardList
        orders={orders}
        selectedOrderId={selectedOrder?.id || ""}
        onOrderSelect={handleOrderSelect}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onNewOrder={onNewOrder}
      />{" "}
      <OrderDetails
        order={selectedOrder}
        onConfirmOrder={onConfirmOrder}
        onCancelOrder={onCancelOrder}
        isConfirmandoPedido={isConfirmandoPedido}
        isCancelandoPedido={isCancelandoPedido}
      />
    </div>
  );
}
