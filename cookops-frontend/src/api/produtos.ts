import { api } from "@/lib/axios";

export interface Produto {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string | null;
  ativo: boolean;
  dataCadastro: string;
  empresaId: number;
}

export interface CreateProdutoDTO {
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  ativo?: boolean;
}

export interface UpdateProdutoDTO extends Partial<CreateProdutoDTO> {}

export async function getProdutos() {
  const response = await api.get<Produto[]>("/produtos");
  return response.data;
}

export async function createProduto(data: CreateProdutoDTO) {
  const response = await api.post<Produto>("/produtos", data);
  return response.data;
}

export async function updateProduto(id: number, data: UpdateProdutoDTO) {
  const response = await api.patch<Produto>(`/produtos/${id}`, data);
  return response.data;
}

export async function deleteProduto(id: number) {
  await api.delete(`/produtos/${id}`);
}
