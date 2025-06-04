import React from "react";

// Interfaces
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

interface OrderDetailsProps {
  order: Order | null;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  if (!order) return null;

  return (
    <div
      className="basis-0 grow h-[1056px] min-h-px min-w-px relative shrink-0"
      data-name="content"
    >
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col h-[1056px] items-start justify-start overflow-clip p-0 relative w-full">
        <Header order={order} />
        <Sections order={order} />
        <ActionButtons />
      </div>
    </div>
  );
}

interface HeaderProps {
  order: Order;
}

function Header({ order }: HeaderProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row items-start justify-between p-[16px] relative w-full">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative w-full">
            <div className="relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
                <div
                  className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-foreground text-[32px] text-left"
                  style={{ width: "min-content" }}
                >
                  <p className="block leading-[40px]">
                    {order.itemCount} itens - R$ {order.total}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
                <div
                  className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[14px] text-left text-muted-foreground"
                  style={{ width: "min-content" }}
                >
                  <p className="block leading-[21px]">
                    Pedido #{order.orderNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SectionsProps {
  order: Order;
}

function Sections({ order }: SectionsProps) {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="sections"
    >
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative size-full">
        <OrderDetailsSection />
        <ItemsSection items={order.items} />
        <TotalSection
          subtotal={order.subtotal}
          taxes={order.taxes}
          total={order.total}
        />
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row items-start justify-between px-4 py-2 relative w-full">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative w-full">
            <div className="relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
                <div
                  className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-foreground text-[20px] text-left"
                  style={{ width: "min-content" }}
                >
                  <p className="block leading-[23px]">{title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDetailsSection() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        <SectionHeader title="Detalhes do pedido" />

        <div className="relative shrink-0 h-[217px] w-[908px]">
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border gap-6 grid grid-cols-[repeat(2,minmax(0px,1fr))] grid-rows-[repeat(2,minmax(0px,1fr))] h-[217px] p-[16px] relative w-[908px]">
            <InfoField label="Tipo de pedido" value="Balcão" gridArea="1 / 1" />
            <InfoField
              label="Hora do pedido"
              value="10:00 AM"
              gridArea="1 / 2"
            />
            <InfoField
              label="Nome do cliente"
              value="Lal de lal de lal"
              gridArea="2 / 1"
            />
            <InfoField
              label="Telefone de contato"
              value="44 98888-7777"
              gridArea="2 / 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  gridArea: string;
}

function InfoField({ label, value, gridArea }: InfoFieldProps) {
  return (
    <div className={`relative shrink-0 [grid-area:${gridArea}]`}>
      <div className="absolute border-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-2 items-start justify-start pb-[17px] pt-4 px-0 relative size-full">
          <div
            className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[14px] text-left text-muted-foreground"
            style={{ width: "min-content" }}
          >
            <p className="block leading-[21px]">{label}</p>
          </div>
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center relative size-full">
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1 py-0 relative w-full">
                <div className="basis-0 css-xb5jc6 font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-foreground text-[14px] text-left">
                  <p className="block leading-[21px]">{value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ItemsSectionProps {
  items: OrderItem[];
}

function ItemsSection({ items = [] }: ItemsSectionProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        <SectionHeader title="Itens" />

        <div className="relative shrink-0">
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[16px] relative">
            <div
              className="h-40 relative rounded-2xl shrink-0 w-[874px]"
              data-name="table"
            >
              <div className="box-border grid grid-cols-[repeat(3,minmax(0px,1fr))] grid-rows-[repeat(4,minmax(0px,1fr))] h-40 overflow-clip p-px relative w-[874px]">
                <TableCell text="Item" gridArea="1 / 1" />
                <TableCell text="Quantity" gridArea="1 / 2" />
                <TableCell text="Price" gridArea="1 / 3" />

                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableCell text={item.name} gridArea={`${index + 2} / 1`} />
                    <TableCell
                      text={item.quantity.toString()}
                      gridArea={`${index + 2} / 2`}
                    />
                    <TableCell
                      text={`R$ ${item.price.toFixed(2)}`}
                      gridArea={`${index + 2} / 3`}
                    />
                  </React.Fragment>
                ))}
              </div>
              <div className="absolute border border-border border-solid inset-0 pointer-events-none rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TableCellProps {
  text: string;
  gridArea: string;
}

function TableCell({ text, gridArea }: TableCellProps) {
  return (
    <div className={`bg-neutral-50 relative shrink-0 [grid-area:${gridArea}]`}>
      <div className="absolute border-[1px_0px] border-[rgba(218,218,218,0.67)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-px relative size-full">
          <div className="basis-0 css-ys09ak font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium grow leading-[0] min-h-px min-w-px text-ellipsis overflow-hidden relative shrink-0 text-foreground text-[14px] text-left text-nowrap">
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TotalSectionProps {
  subtotal: number;
  taxes: number;
  total: string | number;
}

function TotalSection({ subtotal, taxes, total }: TotalSectionProps) {
  // Format the values according to their types
  const formattedSubtotal =
    typeof subtotal === "number"
      ? `R$ ${subtotal.toFixed(2)}`
      : `R$ ${subtotal}`;
  const formattedTaxes =
    typeof taxes === "number" ? `R$ ${taxes.toFixed(2)}` : `R$ ${taxes}`;
  const formattedTotal =
    typeof total === "number" ? `R$ ${total.toFixed(2)}` : `R$ ${total}`;

  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        <SectionHeader title="Total" />

        <div className="relative shrink-0 w-[908px]">
          <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-6 items-start justify-start p-[16px] relative w-[908px]">
            <TotalField label="Subtotal" value={formattedSubtotal} />
            <TotalField label="Taxas" value={formattedTaxes} />
            <TotalField label="Total" value={formattedTotal} isBold={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TotalFieldProps {
  label: string;
  value: string;
  isBold?: boolean;
}

function TotalField({ label, value, isBold = false }: TotalFieldProps) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="absolute border-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-2 items-start justify-start pb-[17px] pt-4 px-0 relative w-full">
          <div
            className={`css-lbkhcf font-['Plus_Jakarta_Sans:${
              isBold ? "Bold" : "Regular"
            }',_sans-serif] ${
              isBold ? "font-bold" : "font-normal"
            } leading-[0] min-w-full relative shrink-0 text-[14px] text-left text-muted-foreground`}
            style={{ width: "min-content" }}
          >
            <p className="block leading-[21px]">{label}</p>
          </div>
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center relative size-full">
              <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1 py-0 relative w-full">
                <div
                  className={`basis-0 css-xb5jc6 font-['Plus_Jakarta_Sans:${
                    isBold ? "Bold" : "Regular"
                  }',_sans-serif] ${
                    isBold ? "font-bold" : "font-normal"
                  } grow leading-[0] min-h-px min-w-px relative shrink-0 text-foreground text-[14px] text-left`}
                >
                  <p className="block leading-[21px]">{value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="relative shrink-0 w-full" data-name="buttons">
      <div className="flex flex-row items-center justify-end relative size-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row gap-4 items-center justify-end px-0 py-4 relative w-full">
          <CancelButton />
          <ConfirmButton />
        </div>
      </div>
    </div>
  );
}

function CancelButton() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        <div className="relative rounded-2xl shrink-0" data-name="Content">
          <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip p-0 relative">
            <div className="relative shrink-0">
              <div className="flex flex-row items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
                  <div
                    style={{ fontVariationSettings: "'wdth' 100" }}
                    className="css-7m7p53 flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-muted-foreground tracking-[0.15px]"
                  >
                    <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                      Cancelar pedido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute border border-border border-solid inset-0 pointer-events-none rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function ConfirmButton() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        <div
          className="bg-primary relative rounded-2xl shrink-0"
          data-name="Content"
        >
          <div className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative">
            <div className="relative shrink-0">
              <div className="flex flex-row items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
                  <div
                    style={{ fontVariationSettings: "'wdth' 100" }}
                    className="css-jvcgrh flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap text-primary-foreground tracking-[0.15px]"
                  >
                    <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                      Confirmar pedido
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
