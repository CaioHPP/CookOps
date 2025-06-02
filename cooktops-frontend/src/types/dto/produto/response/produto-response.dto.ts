export interface ProdutoResponseDto {
  id: string;
  empresaId: string;
  nome: string;
  descricao?: string;
  precoBase: number;
  ativo: boolean;
}
