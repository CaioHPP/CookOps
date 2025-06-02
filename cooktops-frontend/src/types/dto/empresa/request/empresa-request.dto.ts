export interface EmpresaRequestAddDto {
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  planoAtualId: number;
}

export interface EmpresaRequestUpdateDto {
  nome?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  planoAtualId?: number;
}
