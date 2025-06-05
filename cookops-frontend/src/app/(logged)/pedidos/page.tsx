"use client";

import { PedidoService } from "@/api/services/pedido.service";
import OrderPanel from "@/components/OrderPanel/OrderPanel";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { useEffect, useState } from "react";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<PedidoResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        setLoading(true);
        const pedidosData = await PedidoService.getPedidosByEmpresa();
        setPedidos(pedidosData);
      } catch (err: unknown) {
        console.error("Erro ao carregar pedidos:", err);
        setError("Erro ao carregar pedidos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []); // Transformar dados dos pedidos para o formato esperado pelo OrderPanel
  const ordersFormatted = pedidos.map((pedido, index) => ({
    id: pedido.id,
    orderNumber: pedido.codigo || `${index + 1}`,
    itemCount: pedido.itens?.length || 0,
    total: pedido.valorTotal?.toFixed(2) || "0.00",
    time: new Date(pedido.criadoEm).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    subtotal: pedido.valorTotal - pedido.taxaEntrega - pedido.desconto,
    taxes: pedido.taxaEntrega,
    items:
      pedido.itens?.map((item) => ({
        name: item.produto?.nome || "Item",
        quantity: item.quantidade,
        price: item.precoUnitario,
      })) || [],
  }));
  return (
    <div className="min-h-screen bg-gray-50">
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
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : (
          <OrderPanel />
        )}
      </div>
    </div>
  );
}
