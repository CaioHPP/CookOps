import { useState } from "react";
import { CardList } from "./CardList";
import { OrderDetails } from "./OrderDetails";
import type { Order } from "./types";

const orders: Order[] = [];

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
