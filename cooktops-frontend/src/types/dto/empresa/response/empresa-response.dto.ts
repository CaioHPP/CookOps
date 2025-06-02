export interface EmpresaResponseDto {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  planoAtualId: number;
  criadaEm: string;
}
