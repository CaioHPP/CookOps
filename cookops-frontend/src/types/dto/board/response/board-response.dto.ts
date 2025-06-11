export interface BoardResponseDto {
  id: string;
  empresaId: string;
  titulo: string;
  createdAt: string;
  listas: {
    id: number;
    titulo: string;
    ordem: number;
  }[];
}
