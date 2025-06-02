export interface ProdutoRequestAddDto {
  nome: string;
  descricao?: string;
  precoBase: number;
  ativo?: boolean;
  empresaId: string;
}

export interface ProdutoRequestUpdateDto {
  nome?: string;
  descricao?: string;
  precoBase?: number;
  ativo?: boolean;
  empresaId?: string;
}
