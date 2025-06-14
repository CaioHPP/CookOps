"use client";

import { PedidoService } from "@/api/services/pedido.service";
import { MoverPedidoRequestSchema } from "@/types/dto/pedido/request/mover-pedido-request.dto";
import { PedidoResponseDto } from "@/types/dto/pedido/response/pedido-response.dto";
import { PedidoStatusResponseWithPedidosAndItensDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { toast } from "sonner";
import { StatusColumn } from "./StatusColumn";

interface KanbanBoardProps {
  statusColumns: PedidoStatusResponseWithPedidosAndItensDto[];
  loading: boolean;
  lastStatusId?: number;
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
  onCompleteOrder?: (orderId: string) => void;
}

export function KanbanBoard({
  statusColumns,
  loading,
  lastStatusId,
  onMoveOrder,
  onMoveError,
  onCompleteOrder,
}: KanbanBoardProps) {
  // Estado do overlay desabilitado
  // const [activeOrder, setActiveOrder] = useState<PedidoResponseDto | null>(
  //   null
  // );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleDragStart = () => {
    // Overlay desabilitado - função mantida para compatibilidade
    // const { active } = event;
    // const orderId = active.id as string;
    // Encontrar o pedido que está sendo arrastado
    // for (const column of statusColumns) {
    //   const order = column.pedidos.find((pedido) => pedido.id === orderId);
    //   if (order) {
    //     setActiveOrder(order);
    //     break;
    //   }
    // }
  };
  const handleDragOver = () => {
    // Função mantida para compatibilidade
    // Overlay desabilitado - feedback visual vem dos próprios cards
  };
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      // setActiveOrder(null); // Overlay desabilitado
      return;
    }

    const orderId = active.id as string;
    const newStatusId = over.id as string;

    // Verificar se é realmente um status válido
    const targetStatus = statusColumns.find(
      (status) => status.id.toString() === newStatusId
    );

    if (!targetStatus) {
      // setActiveOrder(null); // Overlay desabilitado
      return;
    }

    // Encontrar o pedido e status atual
    let currentOrder: PedidoResponseDto | undefined;
    let currentStatusId: number | undefined;

    for (const column of statusColumns) {
      const order = column.pedidos.find((pedido) => pedido.id === orderId);
      if (order) {
        currentOrder = order;
        currentStatusId = column.id;
        break;
      }
    }

    if (!currentOrder || !currentStatusId) {
      // setActiveOrder(null); // Overlay desabilitado
      return;
    }

    // Se não mudou de status, não fazer nada
    if (currentStatusId === targetStatus.id) {
      // setActiveOrder(null); // Overlay desabilitado
      return;
    }
    try {
      // Atualizar estado local primeiro (movimentação otimista)
      if (onMoveOrder) {
        onMoveOrder(orderId, currentStatusId, targetStatus.id);
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
        onMoveError(orderId, currentStatusId, targetStatus.id);
      }

      toast.error("Erro ao mover pedido. Tente novamente.");
    }

    // setActiveOrder(null); // Overlay desabilitado
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
      <div className="h-[calc(100vh-8rem)] w-full overflow-x-auto">
        <div className="flex gap-5 min-w-max h-full p-6">
          {statusColumns.map((column) => (
            <StatusColumn
              key={column.id}
              status={column}
              orders={column.pedidos}
              isLastStatus={column.id === lastStatusId}
              onCompleteOrder={onCompleteOrder}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
