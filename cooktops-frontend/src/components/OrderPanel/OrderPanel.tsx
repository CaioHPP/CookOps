import { useState } from "react";
import { CardList } from "./CardList";
import { EmptyState } from "./EmptyState";
import { OrderDetails } from "./OrderDetails";

// Interfaces
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  itemCount: number;
  total: string;
  time: string;
  subtotal: number;
  taxes: number;
  items: OrderItem[];
}

// Sample order data
const SAMPLE_ORDERS = [
  {
    id: "1",
    orderNumber: "12346",
    itemCount: 3,
    total: "30,00",
    time: "10:05",
    subtotal: 3.0,
    taxes: 0.25,
    items: [
      { name: "Item 1", quantity: 1, price: 1.0 },
      { name: "Item 2", quantity: 1, price: 1.0 },
      { name: "Item 3", quantity: 1, price: 1.0 },
    ],
  },
  {
    id: "2",
    orderNumber: "12347",
    itemCount: 2,
    total: "25,00",
    time: "10:15",
    subtotal: 2.5,
    taxes: 0.2,
    items: [
      { name: "Item 1", quantity: 2, price: 1.25 },
      { name: "Item 2", quantity: 1, price: 1.0 },
    ],
  },
];

interface OrderPanelProps {
  initialOrders?: Order[];
}

export function OrderPanel({ initialOrders = [] }: OrderPanelProps) {
  const [orders, setOrders] = useState<Order[]>(
    initialOrders.length > 0 ? initialOrders : SAMPLE_ORDERS
  );
  const [selectedOrderId, setSelectedOrderId] = useState(
    orders.length > 0 ? orders[0].id : null
  );

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  const handleAddOrder = () => {
    // Calculate a random total (in Brazilian format)
    const subtotalValue = Math.floor(Math.random() * 50 + 10);
    const taxesValue = subtotalValue * 0.08;
    const totalValue = subtotalValue + taxesValue;

    const newOrder: Order = {
      id: `${orders.length + 1}`,
      orderNumber: `${12345 + orders.length + 1}`,
      itemCount: Math.floor(Math.random() * 5) + 1,
      total: totalValue.toFixed(2).replace(".", ","),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      subtotal: subtotalValue,
      taxes: taxesValue,
      items: [],
    };

    // Generate random items
    const itemCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < itemCount; i++) {
      const price = Math.random() * 10 + 5;
      const quantity = Math.floor(Math.random() * 2) + 1;
      newOrder.items.push({
        name: `Item ${i + 1}`,
        quantity,
        price,
      });
    }

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setSelectedOrderId(newOrder.id);
  };

  return (
    <div className="bg-background relative size-full" data-name="order-panel">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full">
        <div
          className="h-[1082px] relative shrink-0 w-full bg-background "
          data-name="main"
        >
          <div className="flex flex-row justify-center relative size-full">
            <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-2 h-[1082px] items-start justify-center px-6 py-5 relative w-full">
              <CardList orders={orders} />
              {orders.length > 0 ? (
                <OrderDetails order={selectedOrder || null} />
              ) : (
                <EmptyStateWithButton onAddOrder={handleAddOrder} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyStateWithButton({ onAddOrder }: { onAddOrder: () => void }) {
  return (
    <div
      className="basis-0 grow h-[1056px] min-h-px min-w-px relative shrink-0"
      data-name="content"
    >
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col h-[1056px] items-start justify-start overflow-clip p-0 relative w-full">
        <EmptyState />
        <ActionButtons onAddOrder={onAddOrder} />
      </div>
    </div>
  );
}

function ActionButtons({ onAddOrder }: { onAddOrder: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="buttons">
      <div className="flex flex-row items-center justify-end relative size-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-4 items-center justify-end px-0 py-4 relative w-full">
          <CancelButton />
          <ConfirmButton onAddOrder={onAddOrder} />
        </div>
      </div>
    </div>
  );
}

function CancelButton() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        <div className="relative rounded-2xl shrink-0" data-name="Content">
          <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip p-0 relative">
            <div className="relative shrink-0">
              <div className="flex flex-row items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
                  <div
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                    className="css-7m7p53 flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-muted-foreground tracking-[0.15px]"
                  >
                    <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                      Cancelar pedido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute border border-border border-solid inset-0 pointer-events-none rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function ConfirmButton({ onAddOrder }: { onAddOrder: () => void }) {
  return (
    <button className="relative shrink-0" onClick={onAddOrder}>
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        <div
          className="bg-primary relative rounded-2xl shrink-0"
          data-name="Content"
        >
          <div className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative">
            <div className="relative shrink-0">
              <div className="flex flex-row items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
                  <div
                    style={{
                      fontVariationSettings: "'wdth' 100",
                    }}
                    className="css-jvcgrh flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-primary-foreground tracking-[0.15px]"
                  >
                    <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                      Confirmar pedido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
