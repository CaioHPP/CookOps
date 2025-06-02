export interface EnderecoRequestAddDto {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  referencia?: string;
}

export interface EnderecoRequestUpdateDto {
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  referencia?: string;
}
