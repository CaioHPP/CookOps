export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  codigo: string;
  itemCount: number;
  totalValue: number;
  time: string;
  source: string;
  customerName?: string;
  customerPhone?: string;
  items?: OrderItem[];
  subtotal?: number;
  fees?: number;
  orderTime?: string;
  // Propriedades para confirmação
  needsConfirmation?: boolean;
  timeRemaining?: string;
  isExpired?: boolean;
  tempoRestanteMinutos?: number;
}

export interface CardListProps {
  orders?: Order[];
  onOrderSelect?: (order: Order | null) => void;
  selectedOrderId?: string;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export type TabType = "todos" | "balcao" | "app";
