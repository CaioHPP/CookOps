export interface PedidoItemRequestAddDto {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
}

export interface PedidoItemRequestUpdateDto {
  pedidoId?: string;
  produtoId?: string;
  quantidade?: number;
  precoUnitario?: number;
  observacao?: string;
}
