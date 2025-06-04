import { useState } from "react";
import { CardList } from "./CardList";
import { OrderDetails } from "./OrderDetails";
import type { Order } from "./types";

const orders: Order[] = [
  {
    id: "12346",
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
    itemCount: 2,
    totalValue: 25.5,
    time: "10:10",
    source: "app",
    items: [
      { id: "4", name: "Item 4", quantity: 1, price: 10.0 },
      { id: "5", name: "Item 5", quantity: 1, price: 15.5 },
    ],
    subtotal: 25.5,
    fees: 0,
  },
];

export default function OrderPanel() {
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) || null;

  const handleOrderSelect = (order: Order | null) => {
    setSelectedOrderId(order?.id || "");
  };

  return (
    <div className="bg-background h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <CardList
          orders={orders}
          selectedOrderId={selectedOrderId}
          onOrderSelect={handleOrderSelect}
        />
        <OrderDetails
          order={selectedOrder}
          onConfirmOrder={(id) => console.log("Confirm order", id)}
          onCancelOrder={(id) => console.log("Cancel order", id)}
        />
      </div>
    </div>
  );
}