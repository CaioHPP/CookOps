import useSWR from "swr";
import { BoardService } from "@/api/services/board.service";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";

export function useGetBoards() {
  const { data, error, isLoading, mutate } = useSWR<BoardResponseDto[]>(
    "boards",
    async () => {
      const boards = await BoardService.getBoardsByEmpresa();
      return boards;
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
