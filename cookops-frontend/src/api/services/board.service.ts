import {
  BoardRequestAddDto,
  BoardRequestUpdateDto,
} from "@/types/dto/board/request/board-request.dto";
import { BoardResponseDto } from "@/types/dto/board/response/board-response.dto";
import { API_ROUTES } from "../api.routes";
import api from "../axios";

export class BoardService {
  static async addBoard(data: BoardRequestAddDto): Promise<BoardResponseDto> {
    const response = await api.post<BoardResponseDto>(
      API_ROUTES.BOARD.ADD_BOARD,
      data
    );
    return response.data;
  }

  static async getBoards(): Promise<BoardResponseDto[]> {
    const response = await api.get<BoardResponseDto[]>(
      API_ROUTES.BOARD.GET_BOARDS
    );
    return response.data;
  }

  static async getBoardsByEmpresa(): Promise<BoardResponseDto[]> {
    const response = await api.get<BoardResponseDto[]>(
      API_ROUTES.BOARD.GET_BOARDS_BY_EMPRESA
    );
    return response.data;
  }

  static async getBoardById(id: string): Promise<BoardResponseDto> {
    const url = `${API_ROUTES.BOARD.GET_BOARD_BY_ID}/${id}`;
    const response = await api.get<BoardResponseDto>(url);
    return response.data;
  }

  static async updateBoard(
    id: string,
    data: BoardRequestUpdateDto
  ): Promise<BoardResponseDto> {
    const url = `${API_ROUTES.BOARD.UPDATE_BOARD}/${id}`;
    const response = await api.put<BoardResponseDto>(url, data);
    return response.data;
  }

  static async deleteBoard(id: string): Promise<void> {
    const url = `${API_ROUTES.BOARD.DELETE_BOARD}/${id}`;
    await api.delete(url);
  }

  static async setDefaultBoard(id: string): Promise<BoardResponseDto> {
    const url = API_ROUTES.BOARD.SET_DEFAULT_BOARD.replace(":id", id);
    const response = await api.put<BoardResponseDto>(url);
    return response.data;
  }
}
