import { useState, useMemo } from "react";
import { Tabs } from "./Tabs";
import type { TabItem } from "./Tabs";
import type { Order, CardListProps } from "./types";

export function CardList({
  orders = [],
  onOrderSelect,
  selectedOrderId,
}: CardListProps) {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { id: "all", label: "All" },
    { id: "balcao", label: "Balcão" },
    { id: "app", label: "App" },
  ];

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    return activeTab === "all"
      ? orders
      : orders.filter((order) => order.source === activeTab);
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
    <aside className="h-full w-80 flex flex-col overflow-hidden bg-white">
      {/* Tab Header */}
      <div className="pb-3 px-4 pt-4">
        <Tabs
          tabs={tabs}
          defaultActiveTab="all"
          onTabChange={handleTabChange}
        />
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto">
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

      {/* Tab Info Display */}
      <TabInfo
        activeTab={activeTab}
        tabs={tabs}
        orderCount={filteredOrders.length}
      />
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
          : "bg-white border-l-transparent hover:bg-gray-50 hover:border-l-gray-300"
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

function TabInfo({
  activeTab,
  tabs,
  orderCount,
}: {
  activeTab: string;
  tabs: TabItem[];
  orderCount: number;
}) {
  const activeTabLabel =
    tabs.find((t) => t.id === activeTab)?.label || activeTab;

  return (
    <div className="p-4 border-t border-input bg-muted">
      <div className="text-sm text-muted-foreground">
        <strong>Aba ativa:</strong> {activeTabLabel}
      </div>
      <div className="text-sm text-muted-foreground">
        <strong>Pedidos:</strong> {orderCount}
      </div>
    </div>
  );
}
