export interface LoginResponseDto {
  accessToken: string;
}

export interface DecodedTokenDto {
  user: string;
  empresaId: string;
  role: string;
  exp: number;
}
