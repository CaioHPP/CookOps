"use client";

import OrderPanel from "@/components/OrderPanel/OrderPanel";
import { Order, TabType } from "@/components/OrderPanel/types";
import { usePedidosPage } from "@/hooks/usePedidosPage";
import { useState } from "react";

export default function PedidosPage() {
  const {
    pedidosFiltrados,
    loading,
    error,
    confirmarPedido,
    cancelarPedido,
    atualizarDados,
    wsConnected,
    wsError,
  } = usePedidosPage();

  const [activeTab, setActiveTab] = useState<TabType>("todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderSelect = (order: Order | null) => {
    setSelectedOrder(order);
  };

  const handleConfirmOrder = async (id: string) => {
    await confirmarPedido(id);
  };

  const handleCancelOrder = async (id: string) => {
    await cancelarPedido(id);
  };

  // Obter pedidos da aba ativa
  const currentOrders = pedidosFiltrados[activeTab];

  return (
    <div className="min-h-screen bg-background">
      {/* Indicador de status WebSocket */}
      {wsError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>Atualizações em tempo real indisponíveis</span>
          </div>
        </div>
      )}
      {wsConnected && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Atualizações em tempo real ativas</span>
          </div>
        </div>
      )}

      <div className="h-screen">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando pedidos...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={atualizarDados}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : (
          <OrderPanel
            orders={currentOrders}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedOrder={selectedOrder}
            onOrderSelect={handleOrderSelect}
            onConfirmOrder={handleConfirmOrder}
            onCancelOrder={handleCancelOrder}
          />
        )}
      </div>
    </div>
  );
}
