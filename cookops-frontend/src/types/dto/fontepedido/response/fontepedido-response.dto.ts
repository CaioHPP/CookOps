export interface FontePedidoResponseDto {
  id: number;
  nome: string;
  tipoIntegracao?: string;
  confirmaAutomatico: boolean;
  exigeConfirmacao: boolean;
  tempoLimiteConfirma?: number;
}
