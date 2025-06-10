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
}

const mockOrders: Order[] = [
  {
    id: "12346",
    codigo: "#001",
    itemCount: 3,
    totalValue: 3.25,
    time: "10:00",
    source: "balcao",
    customerName: "Lal de lal de lal",
    customerPhone: "44 98888-7777",
    items: [
      { id: "1", name: "Item 1", quantity: 1, price: 1.0 },
      { id: "2", name: "Item 2", quantity: 1, price: 1.0 },
      { id: "3", name: "Item 3", quantity: 1, price: 1.0 },
    ],
    subtotal: 3.0,
    fees: 0.25,
    orderTime: "10:00 AM",
  },
  {
    id: "12347",
    codigo: "#002",
    itemCount: 2,
    totalValue: 25.5,
    time: "10:10",
    source: "app",
    customerName: undefined,
    customerPhone: undefined,
    items: [
      { id: "4", name: "Item 4", quantity: 1, price: 10.0 },
      { id: "5", name: "Item 5", quantity: 1, price: 15.5 },
    ],
    subtotal: 25.5,
    fees: 0,
    orderTime: "10:10 AM",
  },
];

export default function OrderPanel({
  orders = mockOrders,
  activeTab = "todos",
  onTabChange,
  selectedOrder: providedSelectedOrder,
  onOrderSelect: providedOnOrderSelect,
  onConfirmOrder = (id) => console.log("Confirm order", id),
  onCancelOrder = (id) => console.log("Cancel order", id),
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
    <div className="bg-background h-[calc(100vh-4rem)] flex">
      <div className="flex-1 flex overflow-hidden">
        <CardList
          orders={orders}
          selectedOrderId={selectedOrder?.id || ""}
          onOrderSelect={handleOrderSelect}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        <OrderDetails
          order={selectedOrder}
          onConfirmOrder={onConfirmOrder}
          onCancelOrder={onCancelOrder}
        />
      </div>
    </div>
  );
}
