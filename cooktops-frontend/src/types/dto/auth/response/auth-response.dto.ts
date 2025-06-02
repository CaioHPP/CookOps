export interface AuthResponseDto {
  accessToken: string;
}

export interface AuthResponseInterpretDto {
  user: string;
  empresaId: string;
  role: string;
}
