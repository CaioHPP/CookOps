import { useState } from "react";
import svgPaths from "./svg-43dy7vs5ti";
import clsx from "clsx";
import imgProfilePic from "figma:asset/49150d00b5befb03e8a2dc445c9da2c9e727565f.png";
import { Tabs } from "../components/common/Tabs";

// ... (keep all the existing semantic components)

function OrderList() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState("12346");

  const tabs = [
    { id: "all", label: "All" },
    { id: "balcao", label: "Balcão" },
    { id: "app", label: "App" },
  ];

  // Filter orders based on active tab
  const allOrders = [
    {
      id: "12346",
      itemCount: 3,
      totalValue: 30.0,
      time: "10:05",
      source: "balcao",
    },
    {
      id: "12347",
      itemCount: 2,
      totalValue: 25.5,
      time: "10:10",
      source: "app",
    },
    {
      id: "12348",
      itemCount: 1,
      totalValue: 15.0,
      time: "10:15",
      source: "balcao",
    },
    {
      id: "12349",
      itemCount: 4,
      totalValue: 45.0,
      time: "10:20",
      source: "app",
    },
  ];

  const filteredOrders =
    activeTab === "all"
      ? allOrders
      : allOrders.filter((order) => order.source === activeTab);

  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
    setActiveTab(tabId);
    // Reset selected order when changing tabs
    if (filteredOrders.length > 0) {
      setSelectedOrder(filteredOrders[0].id);
    }
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
              orderNumber={order.id}
              itemCount={order.itemCount}
              totalValue={order.totalValue}
              time={order.time}
              isSelected={selectedOrder === order.id}
              onClick={() => {
                console.log(`Order selected: ${order.id}`);
                setSelectedOrder(order.id);
              }}
            />
          ))
        ) : (
          <div className="p-4 text-center">
            <SecondaryText>
              Nenhum pedido encontrado para "
              {tabs.find((t) => t.id === activeTab)?.label}"
            </SecondaryText>
          </div>
        )}
      </div>

      {/* Tab Info Display */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600">
          <strong>Aba ativa:</strong>{" "}
          {tabs.find((t) => t.id === activeTab)?.label}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Pedidos:</strong> {filteredOrders.length}
        </div>
      </div>
    </aside>
  );
}

// Enhanced OrderCard with better visual feedback
function OrderCard({
  orderNumber,
  itemCount,
  totalValue,
  time,
  isSelected = false,
  onClick,
}: OrderCardProps) {
  return (
    <div
      className={clsx(
        "h-[72px] w-full p-4 flex items-center justify-between cursor-pointer transition-all duration-200 border-l-4",
        isSelected
          ? "bg-[#dbf2fd] border-l-[#6750a4] shadow-sm"
          : "bg-white border-l-transparent hover:bg-gray-50 hover:border-l-gray-300"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <MediumText
          className={clsx(
            "text-[16px] leading-[24px] transition-colors",
            isSelected ? "text-[#6750a4]" : "text-[#141414]"
          )}
        >
          {itemCount} itens - R$ {totalValue.toFixed(2)}
        </MediumText>
        <SecondaryText>Pedido #{orderNumber}</SecondaryText>
      </div>
      <SecondaryText className="text-nowrap">{time}</SecondaryText>
    </div>
  );
}

// Add a debug component to show current state
function DebugInfo({
  activeTab,
  selectedOrder,
}: {
  activeTab: string;
  selectedOrder: string;
}) {
  return (
    <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
      <div>Active Tab: {activeTab}</div>
      <div>Selected Order: {selectedOrder}</div>
    </div>
  );
}

export default function OrderPanelFilled() {
  const [debugMode, setDebugMode] = useState(false);

  return (
    <div className="bg-white h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex p-6 gap-2 overflow-hidden">
        <OrderList />
        <OrderDetails />
      </div>

      {/* Debug Toggle */}
      <button
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded text-xs"
        onClick={() => setDebugMode(!debugMode)}
      >
        {debugMode ? "Hide" : "Show"} Debug
      </button>
    </div>
  );
}
