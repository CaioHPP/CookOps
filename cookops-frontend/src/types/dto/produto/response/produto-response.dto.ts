export interface ProdutoResponseDto {
  id: string;
  empresaId: string;
  nome: string;
  descricao?: string;
  codigo?: string;
  codigoBarras?: string;
  precoBase: number;
  ativo: boolean;
}
