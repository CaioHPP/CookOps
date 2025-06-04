export interface LoginResponseDto {
  accessToken: string;
}

export interface DecodedTokenDto {
  user: string;
  nome: string;
  email: string;
  empresaId: string;
  nomeEmpresa: string;
  role: string;
  exp: number;
}
