export class CreateProdutoDto {
  nome: string;
  descricao?: string;
  precoBase: number;
  ativo?: boolean;
  empresaId: string;
}
