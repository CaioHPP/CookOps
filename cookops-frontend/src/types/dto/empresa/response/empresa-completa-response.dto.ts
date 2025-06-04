import { AssinaturaResponseDto } from "../../assinatura/response/assinatura-response.dto";
import { ConfiguracaoEmpresaResponseDto } from "../../configuracao-empresa/response/configuracao-empresa-response.dto";
import { EnderecoResponseDto } from "../../endereco/response/endereco-response.dto";
import { PlanoResponseDto } from "../../plano/response/plano-response.dto";

export interface EmpresaCompletaResponseDto {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  enderecoId?: string;
  planoAtualId: number;
  criadaEm: string;
  plano: PlanoResponseDto;
  endereco?: EnderecoResponseDto;
  assinatura?: AssinaturaResponseDto;
  configuracao?: ConfiguracaoEmpresaResponseDto;
}
