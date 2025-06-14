"use client";

import OrderPanel from "@/components/OrderPanel/OrderPanel";
import { Order, TabType } from "@/components/OrderPanel/types";
import { NovoPedidoModal } from "@/components/Pedidos/NovoPedidoModal";
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
    isConfirmandoPedido,
    isCancelandoPedido,
  } = usePedidosPage();

  const [activeTab, setActiveTab] = useState<TabType>("todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  const handleOrderSelect = (order: Order | null) => {
    setSelectedOrder(order);
  };

  const handleConfirmOrder = async (id: string) => {
    await confirmarPedido(id);
  };

  const handleCancelOrder = async (id: string) => {
    await cancelarPedido(id);
  };

  const handleNewOrder = () => {
    setIsNewOrderModalOpen(true);
  };

  const handleOrderCreated = () => {
    atualizarDados();
  };

  // Obter pedidos da aba ativa
  const currentOrders = pedidosFiltrados[activeTab];
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Status de WebSocket fixo no topo */}
      <div className="shrink-0">
        {!wsConnected && (
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
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-hidden">
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
            onNewOrder={handleNewOrder}
            isConfirmandoPedido={isConfirmandoPedido}
            isCancelandoPedido={isCancelandoPedido}
          />
        )}
      </div>

      {/* Modal de Novo Pedido */}
      <NovoPedidoModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onPedidoCriado={handleOrderCreated}
      />
    </div>
  );
}
