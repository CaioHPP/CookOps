import { ProdutoResponseDto } from "../../produto/response/produto-response.dto";

export interface PedidoItemResponseDto {
  id: string;
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
  produto?: ProdutoResponseDto; // Pode ser detalhado conforme ProdutoResponseDto
}
