import { useState, useEffect, useCallback } from "react";
import { BoardService } from "@/api/services/board.service";
import { PedidoStatusService } from "@/api/services/pedidostatus.service";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { PedidoStatusResponseDto } from "@/types/dto/pedidostatus/response/pedidostatus-response.dto";
import { toast } from "sonner";

export interface UseBoardsReturn {
  boards: BoardResponseDto[];
  selectedBoard: string;
  loading: boolean;
  error: string | null;
  setSelectedBoard: (boardId: string) => void;
  createBoard: (title: string) => Promise<void>;
  updateBoard: (id: string, title: string) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  setDefaultBoard: (id: string) => Promise<void>;
  refreshBoards: () => Promise<void>;
}

export function useBoards(): UseBoardsReturn {
  const [boards, setBoards] = useState<BoardResponseDto[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBoards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BoardService.getBoardsByEmpresa();

      if (Array.isArray(data)) {
        setBoards(data);
        // Auto-select first board if none selected
        if (data.length > 0 && !selectedBoard) {
          setSelectedBoard(data[0].id);
        }
      } else {
        setBoards([]);
      }
    } catch (err) {
      console.error("Erro ao carregar boards:", err);
      setError("Erro ao carregar boards");
      setBoards([]);
    } finally {
      setLoading(false);
    }
  }, [selectedBoard]);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  const createBoard = async (title: string) => {
    try {
      const newBoard = await BoardService.addBoard({ titulo: title });
      setBoards((prev) => [...prev, newBoard]);

      // Select the new board automatically
      setSelectedBoard(newBoard.id);

      toast.success("Board criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar board:", error);
      toast.error("Erro ao criar board");
      throw error;
    }
  };

  const updateBoard = async (id: string, title: string) => {
    try {
      const updatedBoard = await BoardService.updateBoard(id, {
        titulo: title,
      });
      setBoards((prev) =>
        prev.map((board) => (board.id === id ? updatedBoard : board)),
      );
      toast.success("Board atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar board:", error);
      toast.error("Erro ao atualizar board");
      throw error;
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      await BoardService.deleteBoard(id);
      setBoards((prev) => prev.filter((board) => board.id !== id));

      // If deleted board was selected, select first available
      if (selectedBoard === id) {
        const remainingBoards = boards.filter((b) => b.id !== id);
        setSelectedBoard(
          remainingBoards.length > 0 ? remainingBoards[0].id : "",
        );
      }

      toast.success("Board removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover board:", error);
      toast.error("Erro ao remover board");
      throw error;
    }
  };

  const refreshBoards = async () => {
    await loadBoards();
  };

  const setDefaultBoard = async (id: string) => {
    try {
      await BoardService.setDefaultBoard(id);
      // Refresh boards to get updated default status
      await loadBoards();
      toast.success("Board padrão definido com sucesso!");
    } catch (error) {
      console.error("Erro ao definir board padrão:", error);
      toast.error("Erro ao definir board padrão");
      throw error;
    }
  };

  return {
    boards,
    selectedBoard,
    loading,
    error,
    setSelectedBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    setDefaultBoard,
    refreshBoards,
  };
}

export interface UseBoardStatusReturn {
  statusList: PedidoStatusResponseDto[];
  loading: boolean;
  error: string | null;
  createStatus: (
    title: string,
    order: number,
    boardId: string,
  ) => Promise<void>;
  updateStatus: (id: number, title: string) => Promise<void>;
  deleteStatus: (id: number) => Promise<void>;
  reorderStatus: (statusList: PedidoStatusResponseDto[]) => Promise<void>;
  refreshStatus: () => Promise<void>;
}

export function useBoardStatus(boardId: string): UseBoardStatusReturn {
  const [statusList, setStatusList] = useState<PedidoStatusResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    if (!boardId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await PedidoStatusService.getPedidoStatusByBoard(boardId);
      setStatusList(data);
    } catch (err) {
      console.error("Erro ao carregar status:", err);
      setError("Erro ao carregar status");
      setStatusList([]);
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) {
      loadStatus();
    }
  }, [boardId, loadStatus]);

  const createStatus = async (
    title: string,
    order: number,
    boardId: string,
  ) => {
    try {
      const newStatus = await PedidoStatusService.addPedidoStatus({
        titulo: title,
        ordem: order,
        boardId: boardId,
      });
      setStatusList((prev) =>
        [...prev, newStatus].sort((a, b) => a.ordem - b.ordem),
      );
      toast.success("Status criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar status:", error);
      toast.error("Erro ao criar status");
      throw error;
    }
  };

  const updateStatus = async (id: number, title: string) => {
    try {
      const updatedStatus = await PedidoStatusService.updatePedidoStatus(id, {
        titulo: title,
      });
      setStatusList((prev) =>
        prev.map((status) => (status.id === id ? updatedStatus : status)),
      );
      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status");
      throw error;
    }
  };

  const deleteStatus = async (id: number) => {
    try {
      await PedidoStatusService.deletePedidoStatus(id);
      setStatusList((prev) => prev.filter((status) => status.id !== id));
      toast.success("Status removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover status:", error);
      toast.error("Erro ao remover status");
      throw error;
    }
  };

  const reorderStatus = async (newStatusList: PedidoStatusResponseDto[]) => {
    try {
      // Update local state immediately for smooth UX
      setStatusList(newStatusList);

      // Prepare updates for API
      const statusUpdates = newStatusList.map((status, index) => ({
        id: status.id,
        ordem: index + 1,
      }));

      // Call reorder API
      await PedidoStatusService.reorderStatus(statusUpdates);
      toast.success("Ordem dos status atualizada!");
    } catch (error) {
      console.error("Erro ao reordenar status:", error);
      toast.error("Erro ao reordenar status");
      // Revert local changes
      await loadStatus();
      throw error;
    }
  };

  const refreshStatus = async () => {
    await loadStatus();
  };

  return {
    statusList,
    loading,
    error,
    createStatus,
    updateStatus,
    deleteStatus,
    reorderStatus,
    refreshStatus,
  };
}
