import { EnderecoResponseDto } from "../../endereco/response/endereco-response.dto";
import { FontePagamentoResponseDto } from "../../fontepagamento/response/fontepagamento-response.dto";
import { FormaPagamentoResponseDto } from "../../formapagamento/response/formapagamento-response.dto";
import { PedidoStatusResponseDto } from "../../pedidostatus/response/pedidostatus-response.dto";
import { ProdutoResponseDto } from "../../produto/response/produto-response.dto";

export interface PedidoItemResponseDto {
  id: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
  produto?: ProdutoResponseDto;
}

export interface PedidoResponseDto {
  id: string;
  statusId: number;
  empresaId: string;
  codigo: string;
  fonteId: number;
  pagamentoId: number;
  enderecoId?: string;
  desconto: number;
  taxaEntrega: number;
  valorTotal: number;
  observacao?: string;
  criadoEm: string;
  concluidoEm?: string;
  status?: PedidoStatusResponseDto;
  pagamento?: FormaPagamentoResponseDto; // Pode ser detalhado conforme o FormaPagamentoResponseDto
  fonte?: FontePagamentoResponseDto; // Pode ser detalhado conforme o FontePedidoResponseDto
  endereco?: EnderecoResponseDto; // Pode ser detalhado conforme o EnderecoResponseDto
  itens: PedidoItemResponseDto[];
}
