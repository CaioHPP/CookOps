export interface FontePagamentoRequestAddDto {
  nome: string;
  tipoIntegracao?: string;
}

export interface FontePagamentoRequestUpdateDto {
  nome?: string;
  tipoIntegracao?: string;
}
