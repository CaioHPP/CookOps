export interface PedidoStatusRequestAddDto {
  boardId: string;
  titulo: string;
  ordem: number;
}

export interface PedidoStatusRequestUpdateDto {
  boardId?: string;
  titulo?: string;
  ordem?: number;
}
