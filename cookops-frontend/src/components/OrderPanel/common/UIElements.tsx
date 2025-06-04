import React from "react";
import clsx from "clsx";
import svgPaths from "../../../imports/svg-43dy7vs5ti";
import imgProfilePic from "figma:asset/49150d00b5befb03e8a2dc445c9da2c9e727565f.png";
import {
  ButtonContainer,
  CenteredContainer,
  FixedContainer,
  RowContainer,
  BorderedInfoContainer,
  HeaderContainer,
  TabContentsContainer,
  StateLayerContainer,
  TabContainer,
  FullWidthColumnContainer,
} from "./Container";
import {
  ButtonText,
  TabText,
  TimeText,
  LabelText,
  ValueText,
  BoldValueText,
  TitleText,
  LogoText,
  NavItemText,
} from "./Text";

type OrderCardProps = {
  orderNumber: string;
  itemCount: string;
  totalPrice: string;
  time: string;
  additionalClassNames?: string[];
};

/**
 * Order card component displaying order summary
 */
export function OrderCard({
  orderNumber,
  itemCount,
  totalPrice,
  time,
  additionalClassNames = [],
}: OrderCardProps) {
  const combinedText = `${itemCount} - ${totalPrice}`;

  return (
    <div
      className={clsx(
        "h-[72px] min-h-[72px] relative shrink-0 w-80",
        additionalClassNames
      )}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-[72px] items-center justify-between px-4 py-2 relative w-80">
          <OrderInfo text={combinedText} text1={orderNumber} />
          <TimeText text={time} />
        </div>
      </div>
    </div>
  );
}

type OrderInfoProps = {
  text: string;
  text1: string;
};

/**
 * Order information component
 */
export function OrderInfo({ text, text1 }: OrderInfoProps) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-1 items-start justify-center leading-[0] p-0 relative text-left w-full">
        <div
          className="css-xb5jc6 font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium min-w-full relative shrink-0 text-[#141414] text-[16px]"
          style={{ width: "min-content" }}
        >
          <p className="block leading-[24px]">{text}</p>
        </div>
        <div
          className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal min-w-full relative shrink-0 text-[14px] text-neutral-500"
          style={{ width: "min-content" }}
        >
          <p className="block leading-[21px]">{text1}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Button component with outline style
 */
export function OutlineButton({ text }: { text: string }) {
  return (
    <ButtonContainer>
      <div className="relative rounded-2xl shrink-0">
        <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip p-0 relative">
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
            <ButtonText
              text={text}
              additionalClassNames={["css-7m7p53", "text-[#49454f]"]}
            />
          </div>
        </div>
        <div className="absolute border border-[#cac4d0] border-solid inset-0 pointer-events-none rounded-2xl" />
      </div>
    </ButtonContainer>
  );
}

/**
 * Button component with filled style
 */
export function FilledButton({ text }: { text: string }) {
  return (
    <ButtonContainer>
      <div className="bg-[#6750a4] relative rounded-2xl shrink-0">
        <div className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative">
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
            <ButtonText
              text={text}
              additionalClassNames={["css-jvcgrh", "text-[#ffffff]"]}
            />
          </div>
        </div>
      </div>
    </ButtonContainer>
  );
}

/**
 * Tab component with indicator
 */
export function ActiveTab({ text }: { text: string }) {
  return (
    <TabContainer>
      <StateLayerContainer>
        <TabContentsContainer>
          <TabText
            text={text}
            additionalClassNames={["css-canpp4", "text-[#6750a4]"]}
          />
          <div className="absolute bottom-0 h-3.5 left-0 right-0">
            <div className="absolute bg-[#6750a4] bottom-0 h-[3px] left-0.5 right-0.5 rounded-tl-[100px] rounded-tr-[100px]" />
          </div>
        </TabContentsContainer>
      </StateLayerContainer>
    </TabContainer>
  );
}

/**
 * Inactive tab component
 */
export function InactiveTab({ text }: { text: string }) {
  return (
    <TabContainer>
      <StateLayerContainer>
        <TabContentsContainer>
          <TabText
            text={text}
            additionalClassNames={["css-5fteq9", "text-[#49454f]"]}
          />
        </TabContentsContainer>
      </StateLayerContainer>
    </TabContainer>
  );
}

/**
 * Tab group component
 */
export function TabGroup() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative size-full">
        <ActiveTab text="All" />
        <InactiveTab text="Balcão" />
        <InactiveTab text="App" />
      </div>
    </div>
  );
}

/**
 * Divider component
 */
export function Divider() {
  return (
    <div className="h-px relative shrink-0 w-full">
      <div className="absolute bottom-[-0.003%] left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 320 1"
        >
          <line
            stroke="var(--stroke-0, #CAC4D0)"
            x2="320"
            y1="0.500028"
            y2="0.5"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Tabs container component
 */
export function Tabs() {
  return (
    <div className="h-12 relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-12 items-start justify-start p-0 relative w-full">
        <TabGroup />
        <Divider />
      </div>
    </div>
  );
}

/**
 * Section header component
 */
export function SectionHeader({ title }: { title: string }) {
  return (
    <HeaderContainer>
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
        <TitleText text={title} />
      </div>
    </HeaderContainer>
  );
}

/**
 * Information field component
 */
export function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <BorderedInfoContainer>
      <LabelText text={label} />
      <ValueText text={value} />
    </BorderedInfoContainer>
  );
}

/**
 * Total field component with bold styling
 */
export function TotalField({ label, value }: { label: string; value: string }) {
  return (
    <BorderedInfoContainer>
      <BoldLabelText text={label} />
      <BoldValueText text={value} />
    </BorderedInfoContainer>
  );
}

/**
 * Table component
 */
export function Table() {
  return (
    <div className="h-40 relative rounded-2xl shrink-0 w-[874px]">
      <div className="box-border grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] h-40 overflow-clip p-px relative w-[874px]">
        <TableCellHeader text="Item" gridArea="1 / 1" />
        <TableCellHeader text="Quantity" gridArea="1 / 2" />
        <TableCellHeader text="Price" gridArea="1 / 3" />

        <TableCell text="Item 1" gridArea="2 / 1" />
        <TableCell text="1" gridArea="2 / 2" />
        <TableCell text="R$ 1,00" gridArea="2 / 3" />

        <TableCell text="Item 2" gridArea="3 / 1" />
        <TableCell text="1" gridArea="3 / 2" />
        <TableCell text="R$ 1,00" gridArea="3 / 3" />

        <TableCell text="Item 3" gridArea="4 / 1" />
        <TableCell text="1" gridArea="4 / 2" />
        <TableCell text="R$ 1,00" gridArea="4 / 3" />
      </div>
      <div className="absolute border border-[#dbdbdb] border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

type TableCellProps = {
  text: string;
  gridArea: string;
};

/**
 * Table cell component
 */
export function TableCell({ text, gridArea }: TableCellProps) {
  return (
    <div className={`bg-neutral-50 relative shrink-0 [grid-area:${gridArea}]`}>
      <div className="absolute border-[1px_0px] border-[rgba(218,218,218,0.67)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-px relative size-full">
          <div className="basis-0 css-ys09ak font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#141414] text-[14px] text-left text-nowrap">
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Table cell header component
 */
export function TableCellHeader({ text, gridArea }: TableCellProps) {
  return <TableCell text={text} gridArea={gridArea} />;
}

/**
 * Logo component
 */
export function Logo() {
  return (
    <RowContainer>
      <LogoText />
    </RowContainer>
  );
}

/**
 * Navigation item component
 */
export function NavItem({
  text,
  isActive = false,
}: {
  text: string;
  isActive?: boolean;
}) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <div
          className={`css-xb5jc6 font-['Plus_Jakarta_Sans:${
            isActive ? "Bold" : "Medium"
          }',_sans-serif] font-${
            isActive ? "bold" : "medium"
          } leading-[0] relative shrink-0 text-[#141414] text-[14px] text-left text-nowrap w-full`}
        >
          <p className="block leading-[21px] whitespace-pre">{text}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Navigation items container
 */
export function NavItems() {
  return (
    <div className="h-10 relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-9 h-10 items-center justify-start p-0 relative">
        <NavItem text="Pedidos" isActive={true} />
        <NavItem text="Produção" />
        <NavItem text="Cardápio" />
        <NavItem text="Configurações" />
      </div>
    </div>
  );
}

/**
 * Notification icon component
 */
export function NotificationIcon() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-center justify-start p-0 relative w-full">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative size-full">
            <div className="absolute left-0 size-5 top-0">
              <div className="absolute bottom-[9.379%] left-[12.505%] right-[12.508%] top-[9.375%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 16 18"
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p2b76e080}
                    fill="var(--fill-0, #141414)"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Notifications component
 */
export function Notifications() {
  return (
    <div className="bg-[#ededed] h-10 max-w-[480px] relative rounded-lg shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-2.5 py-0 relative">
          <NotificationIcon />
        </div>
      </div>
    </div>
  );
}

/**
 * Profile picture component
 */
export function ProfilePic() {
  return (
    <div
      className="bg-[50%_50%] bg-cover bg-no-repeat rounded-[20px] shrink-0 size-10"
      style={{ backgroundImage: `url('${imgProfilePic}')` }}
    />
  );
}

/**
 * Profile section component
 */
export function Profile() {
  return (
    <RowContainer>
      <Notifications />
      <ProfilePic />
    </RowContainer>
  );
}

/**
 * Navbar component
 */
export function Navbar() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full">
      <div className="absolute border-[0px_0px_1px] border-neutral-50 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-10 items-center justify-start pb-[13px] pt-3 px-10 relative w-full">
          <Logo />
          <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative w-full">
              <NavItems />
            </div>
          </div>
          <Profile />
        </div>
      </div>
    </div>
  );
}

/**
 * Order header component
 */
export function OrderHeader({
  itemCount,
  totalPrice,
  orderNumber,
}: {
  itemCount: string;
  totalPrice: string;
  orderNumber: string;
}) {
  return (
    <FixedContainer additionalClassNames={["w-full"]}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row items-start justify-between p-[16px] relative w-full">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
          <FullWidthColumnContainer>
            <div
              className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#141414] text-[32px] text-left"
              style={{ width: "min-content" }}
            >
              <p className="block leading-[40px]">{`${itemCount} - ${totalPrice}`}</p>
            </div>
          </FullWidthColumnContainer>
          <FullWidthColumnContainer>
            <div
              className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[14px] text-left text-neutral-500"
              style={{ width: "min-content" }}
            >
              <p className="block leading-[21px]">{orderNumber}</p>
            </div>
          </FullWidthColumnContainer>
        </div>
      </div>
    </FixedContainer>
  );
}

/**
 * Action buttons component
 */
export function ActionButtons() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-end relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-end px-0 py-4 relative w-full">
          <OutlineButton text="Cancelar pedido" />
          <FilledButton text="Confirmar pedido" />
        </div>
      </div>
    </div>
  );
}
