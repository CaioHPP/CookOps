export interface AssinaturaResponseDto {
  id: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  periodoFim?: string;
  planoId: number;
}
