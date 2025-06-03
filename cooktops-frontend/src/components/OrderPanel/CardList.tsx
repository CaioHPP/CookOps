import { Tabs } from "./Tabs";

// Interface to match OrderPanel
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  itemCount: number;
  total: string;
  time: string;
  subtotal: number;
  taxes: number;
  items: OrderItem[];
}

interface CardListProps {
  orders?: Order[];
}

export function CardList({ orders = [] }: CardListProps) {
  return (
    <div className="h-full relative shrink-0 w-80" data-name="card list">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start justify-start overflow-clip p-0 relative w-80">
        <Tabs />
        <Cards orders={orders} />
      </div>
    </div>
  );
}

function Cards({ orders = [] }: { orders?: Order[] }) {
  return (
    <div className="relative shrink-0 w-full" data-name="cards">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          orders.map((order, index) => (
            <Card
              key={order.id}
              orderNumber={order.orderNumber}
              itemCount={order.itemCount}
              total={order.total}
              time={order.time}
              isSelected={index === 0}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface CardProps {
  orderNumber: string;
  itemCount: number;
  total: string;
  time: string;
  isSelected?: boolean;
}

function Card({
  orderNumber,
  itemCount,
  total,
  time,
  isSelected = false,
}: CardProps) {
  return (
    <div
      className={`h-[72px] min-h-[72px] relative shrink-0 w-80 ${
        isSelected ? "bg-accent" : "bg-card"
      }`}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-[72px] items-center justify-between px-4 py-2 relative w-80">
          <OrderInfo
            itemCount={itemCount}
            total={total}
            orderNumber={orderNumber}
          />
          <Time time={time} />
        </div>
      </div>
    </div>
  );
}

interface OrderInfoProps {
  itemCount: number;
  total: string;
  orderNumber: string;
}

function OrderInfo({ itemCount, total, orderNumber }: OrderInfoProps) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-1 items-start justify-center leading-[0] p-0 relative text-left w-full">
        <div
          className="css-xb5jc6 font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium min-w-full relative shrink-0 text-foreground text-[16px]"
          style={{ width: "min-content" }}
        >
          <p className="block leading-[24px]">
            {itemCount} itens - R$ {total}
          </p>
        </div>
        <div
          className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal min-w-full relative shrink-0 text-[14px] text-muted-foreground"
          style={{ width: "min-content" }}
        >
          <p className="block leading-[21px]">Pedido #{orderNumber}</p>
        </div>
      </div>
    </div>
  );
}

interface TimeProps {
  time: string;
}

function Time({ time }: TimeProps) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <div className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-left text-muted-foreground text-nowrap w-full">
          <p className="block leading-[21px] whitespace-pre">{time}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-0 py-10 relative w-full">
          <div className="basis-0 css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[14px] text-center text-muted-foreground">
            <p className="block leading-[21px]">
              Não há ordens no painel ainda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
