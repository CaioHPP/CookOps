import { useMemo } from "react";
import { ConfirmationBadge } from "./ConfirmationBadge";
import type { TabItem } from "./Tabs";
import { Tabs } from "./Tabs";
import type { CardListProps, Order } from "./types";

export function CardList({
  orders = [],
  onOrderSelect,
  selectedOrderId,
  activeTab = "todos",
  onTabChange,
}: CardListProps) {
  const tabs = [
    { id: "todos", label: "Todos" },
    { id: "balcao", label: "Balcão" },
    { id: "app", label: "App" },
  ];

  // Como os pedidos já vêm filtrados do hook usePedidosPage,
  // não precisamos filtrar novamente aqui
  const displayOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    // Filter out orders without valid ids to prevent key warnings
    return orders.filter((order) => order && order.id);
  }, [orders]);
  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId as "todos" | "balcao" | "app");
    }
    // Auto-select first order when changing tabs
    if (displayOrders.length > 0 && onOrderSelect) {
      onOrderSelect(displayOrders[0]);
    }
  };

  const handleOrderClick = (order: Order) => {
    onOrderSelect?.(order);
  };

  return (
    <aside className="w-80 flex flex-col bg-background">
      {/* Tab Header - Fixed */}
      <div className="fixed w-80 bg-background pt-3 px-4 border-b-2 border-b-border border-r-2 border-r-border">
        <Tabs
          tabs={tabs}
          defaultActiveTab="todos"
          onTabChange={handleTabChange}
        />
      </div>{" "}
      {/* Order List - Scrollable */}
      <div className="mt-[60px] h-[calc(100vh-4rem-60px)] overflow-y-auto border-r-2 border-r-border">
        {displayOrders.length > 0 ? (
          displayOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrderId === order.id}
              onClick={() => handleOrderClick(order)}
            />
          ))
        ) : (
          <EmptyState activeTab={activeTab} tabs={tabs} />
        )}
      </div>
    </aside>
  );
}

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
  onClick?: () => void;
}

function OrderCard({ order, isSelected = false, onClick }: OrderCardProps) {
  const safeItemCount =
    typeof order.itemCount === "number" && !isNaN(order.itemCount)
      ? order.itemCount
      : 0;
  const safeTotalValue =
    typeof order.totalValue === "number" && !isNaN(order.totalValue)
      ? order.totalValue
      : 0;
  const safeTime = order.time || "--:--";

  return (
    <div
      className={`min-h-[72px] w-full p-4 flex flex-col gap-2 cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? "bg-accent border-l-primary shadow-sm"
          : "bg-background border-l-transparent hover:bg-accent/50 hover:border-l-accent"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p
            className={`font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[16px] leading-[24px] transition-colors ${
              isSelected ? "text-primary" : "text-foreground"
            }`}
          >
            {safeItemCount} {safeItemCount === 1 ? "item" : "itens"} - R${" "}
            {safeTotalValue.toFixed(2)}
          </p>{" "}
          <p className="font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal text-muted-foreground text-[14px] leading-[21px]">
            Pedido {order.codigo}
          </p>
        </div>
        <p className="font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal text-muted-foreground text-[14px] leading-[21px] text-nowrap">
          {safeTime}
        </p>
      </div>

      {/* Badge de confirmação */}
      {order.needsConfirmation && order.timeRemaining && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{order.source}</span>
          <ConfirmationBadge
            timeRemaining={order.timeRemaining}
            isExpired={order.isExpired || false}
            tempoRestanteMinutos={order.tempoRestanteMinutos}
            className="ml-2"
          />
        </div>
      )}
    </div>
  );
}

function EmptyState({
  activeTab,
  tabs,
}: {
  activeTab: string;
  tabs: TabItem[];
}) {
  const activeTabLabel =
    tabs.find((t) => t.id === activeTab)?.label || activeTab;

  return (
    <div className="p-4 text-center">
      <p className="font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal text-muted-foreground text-[14px] leading-[21px]">
        Nenhum pedido encontrado para &ldquo;{activeTabLabel}&rdquo;
      </p>
    </div>
  );
}
