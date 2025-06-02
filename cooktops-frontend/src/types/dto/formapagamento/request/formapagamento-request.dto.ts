export interface FormaPagamentoRequestAddDto {
  nome: string;
  empresaId: string;
}

export interface FormaPagamentoRequestUpdateDto {
  nome?: string;
  empresaId?: string;
}
