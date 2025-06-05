"use client";

import { PedidoService } from "@/api/services/pedido.service";
import { MoverPedidoRequestSchema } from "@/types/dto/pedido/request/mover-pedido-request.dto";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { toast } from "sonner";
import { OrderCard } from "./OrderCard";
import { StatusColumn } from "./StatusColumn";

interface KanbanBoardProps {
  statusColumns: PedidoStatusResponseWithPedidosAndItensDto[];
  loading: boolean;
  onMoveOrder?: (
    orderId: string,
    fromStatusId: number,
    toStatusId: number
  ) => void;
  onMoveError?: (
    orderId: string,
    fromStatusId: number,
    toStatusId: number
  ) => void;
}

export function KanbanBoard({
  statusColumns,
  loading,
  onMoveOrder,
  onMoveError,
}: KanbanBoardProps) {
  const [activeOrder, setActiveOrder] = useState<PedidoResponseDto | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const orderId = active.id as string;

    // Encontrar o pedido que está sendo arrastado
    for (const column of statusColumns) {
      const order = column.pedidos.find((pedido) => pedido.id === orderId);
      if (order) {
        setActiveOrder(order);
        break;
      }
    }
  };
  const handleDragOver = () => {
    // Aqui podemos implementar lógica de preview se necessário
    // Por enquanto, deixamos vazio pois o visual feedback já é fornecido pelo DragOverlay
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveOrder(null);
      return;
    }

    const orderId = active.id as string;
    const newStatusId = over.id as string;

    // Verificar se é realmente um status válido
    const targetStatus = statusColumns.find(
      (status) => status.statusId.toString() === newStatusId
    );

    if (!targetStatus) {
      setActiveOrder(null);
      return;
    }

    // Encontrar o pedido e status atual
    let currentOrder: PedidoResponseDto | undefined;
    let currentStatusId: number | undefined;

    for (const column of statusColumns) {
      const order = column.pedidos.find((pedido) => pedido.id === orderId);
      if (order) {
        currentOrder = order;
        currentStatusId = column.statusId;
        break;
      }
    }

    if (!currentOrder || !currentStatusId) {
      setActiveOrder(null);
      return;
    }

    // Se não mudou de status, não fazer nada
    if (currentStatusId === targetStatus.statusId) {
      setActiveOrder(null);
      return;
    }
    try {
      // Atualizar estado local primeiro (movimentação otimista)
      if (onMoveOrder) {
        onMoveOrder(orderId, currentStatusId, targetStatus.statusId);
      }

      // Preparar dados para a API usando ZOD
      const moveData = MoverPedidoRequestSchema.parse({
        paraOrdem: targetStatus.ordem,
      });

      // Fazer a chamada para mover o pedido
      await PedidoService.moverPedido(orderId, moveData);

      // Sucesso - mostrar toast de sucesso sem recarregar
      toast.success(`Pedido movido para ${targetStatus.titulo}`);
    } catch (error) {
      console.error("Erro ao mover pedido:", error);

      // Em caso de erro, reverter a movimentação local
      if (onMoveError) {
        onMoveError(orderId, currentStatusId, targetStatus.statusId);
      }

      toast.error("Erro ao mover pedido. Tente novamente.");
    }

    setActiveOrder(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  if (statusColumns.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">
            Nenhum status de pedido encontrado. Configure os status no board
            selecionado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 p-6 h-full overflow-x-auto mx-w-full">
        {statusColumns.map((column) => (
          <StatusColumn
            key={column.statusId}
            status={column}
            orders={column.pedidos}
          />
        ))}
      </div>

      {/* Overlay para mostrar o item sendo arrastado */}
      <DragOverlay>
        {activeOrder ? <OrderCard order={activeOrder} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
