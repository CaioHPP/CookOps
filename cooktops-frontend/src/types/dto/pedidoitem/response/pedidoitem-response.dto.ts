export interface PedidoItemResponseDto {
  id: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
  produto?: any; // Pode ser detalhado conforme ProdutoResponseDto
}
