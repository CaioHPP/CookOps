import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export interface Produto {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  precoBase: number;
  imagem: string | null;
  ativo: boolean;
  empresaId: string;
}

export interface CreateProdutoDTO {
  nome: string;
  descricao?: string;
  precoBase: number;
  codigo?: string;
  imagem?: string | null;
  ativo?: boolean;
}

// Adding a dummy property to satisfy TypeScript
export interface UpdateProdutoDTO extends Partial<CreateProdutoDTO> {
  _tag?: "UpdateProdutoDTO";
}

export async function getProdutos() {
  const response = await api.get<Produto[]>("/produtos/empresa");
  return response.data;
}

export async function createProduto(data: CreateProdutoDTO) {
  try {
    // Parse and validate the price
    const precoStr = data.precoBase.toString();
    const precoBase =
      typeof data.precoBase === "string"
        ? parseFloat(precoStr.replace(",", "."))
        : Number(data.precoBase);

    // Validate the price before sending to API
    if (isNaN(precoBase)) {
      throw new Error("Preço inválido");
    }
    if (precoBase <= 0) {
      throw new Error("O preço deve ser maior que zero");
    }
    if (precoBase > 99999.99) {
      throw new Error("O preço não pode ser maior que R$ 99.999,99");
    }

    // Round to 2 decimal places and prepare the data
    const formattedData = {
      ...data,
      precoBase: Math.round(precoBase * 100) / 100,
    };

    const response = await api.post<Produto>("/produtos", formattedData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      const messages = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(". ")
        : error.response.data.message;
      throw new Error(messages);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Não foi possível criar o produto. Verifique os dados e tente novamente."
    );
  }
}

export async function updateProduto(id: string, data: UpdateProdutoDTO) {
  try {
    const formattedData = { ...data };

    // If precoBase is being updated, apply the same validation
    if (typeof data.precoBase !== "undefined") {
      const precoStr = data.precoBase.toString();
      const precoBase =
        typeof data.precoBase === "string"
          ? parseFloat(precoStr.replace(",", "."))
          : Number(data.precoBase);

      if (isNaN(precoBase)) {
        throw new Error("Preço inválido");
      }
      if (precoBase <= 0) {
        throw new Error("O preço deve ser maior que zero");
      }
      if (precoBase > 99999.99) {
        throw new Error("O preço não pode ser maior que R$ 99.999,99");
      }

      formattedData.precoBase = Math.round(precoBase * 100) / 100;
    }

    const response = await api.put<Produto>(`/produtos/${id}`, formattedData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      const messages = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(". ")
        : error.response.data.message;
      throw new Error(messages);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Não foi possível atualizar o produto. Verifique os dados e tente novamente."
    );
  }
}

export async function deleteProduto(id: string) {
  try {
    await api.delete(`/produtos/${id}`);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      const messages = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(". ")
        : error.response.data.message;
      throw new Error(messages);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Não foi possível excluir o produto. O produto pode estar em uso em pedidos existentes."
    );
  }
}
