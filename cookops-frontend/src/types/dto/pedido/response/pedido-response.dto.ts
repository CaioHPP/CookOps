import { EnderecoResponseDto } from "../../endereco/response/endereco-response.dto";
import { FontePedidoResponseDto } from "../../fontepedido/response/fontepedido-response.dto";
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
  confirmado: boolean;
  confirmaAutomatico: boolean;
  dataConfirmacao?: string;
  usuarioConfirmou?: string;
  criadoEm: string;
  concluidoEm?: string;
  status?: PedidoStatusResponseDto;
  pagamento?: FormaPagamentoResponseDto; // Pode ser detalhado conforme o FormaPagamentoResponseDto
  fonte?: FontePedidoResponseDto; // Pode ser detalhado conforme o FontePedidoResponseDto
  endereco?: EnderecoResponseDto; // Pode ser detalhado conforme o EnderecoResponseDto
  itens: PedidoItemResponseDto[];
}
