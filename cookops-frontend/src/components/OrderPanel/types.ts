export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
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
}

export interface CardListProps {
  orders?: Order[];
  onOrderSelect?: (order: Order | null) => void;
  selectedOrderId?: string;
}
