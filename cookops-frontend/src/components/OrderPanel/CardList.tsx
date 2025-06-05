import { useMemo, useState } from "react";
import type { TabItem } from "./Tabs";
import { Tabs } from "./Tabs";
import type { CardListProps, Order } from "./types";

export function CardList({
  orders = [],
  onOrderSelect,
  selectedOrderId,
}: CardListProps) {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { id: "all", label: "Todos" },
    { id: "balcao", label: "Balcão" },
    { id: "app", label: "App" },
  ];
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // Filter out orders without valid ids to prevent key warnings
    const validOrders = orders.filter((order) => order && order.id);

    return activeTab === "all"
      ? validOrders
      : validOrders.filter((order) => order.source === activeTab);
  }, [orders, activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Auto-select first order when changing tabs
    if (filteredOrders.length > 0 && onOrderSelect) {
      onOrderSelect(filteredOrders[0]);
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
          defaultActiveTab="all"
          onTabChange={handleTabChange}
        />
      </div>

      {/* Order List - Scrollable */}
      <div className="mt-[60px] h-[calc(100vh-4rem-60px)] overflow-y-auto border-r-2 border-r-border">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
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
      className={`h-[72px] w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? "bg-accent border-l-primary shadow-sm"
          : "bg-background border-l-transparent hover:bg-accent/50 hover:border-l-accent"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <p
          className={`font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium text-[16px] leading-[24px] transition-colors ${
            isSelected ? "text-primary" : "text-foreground"
          }`}
        >
          {safeItemCount} {safeItemCount === 1 ? "item" : "itens"} - R${" "}
          {safeTotalValue.toFixed(2)}
        </p>
        <p className="font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal text-muted-foreground text-[14px] leading-[21px]">
          Pedido #{order.id}
        </p>
      </div>
      <p className="font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal text-muted-foreground text-[14px] leading-[21px] text-nowrap">
        {safeTime}
      </p>
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
