export interface ProdutoResponseDto {
  id: string;
  empresaId: string;
  nome: string;
  descricao?: string;
  codigo?: string;
  precoBase: number;
  ativo: boolean;
}
