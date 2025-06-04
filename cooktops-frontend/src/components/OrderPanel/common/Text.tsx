import React from "react";
import clsx from "clsx";
import {
  Container,
  FullWidthColumnContainer,
  CenteredContainer,
} from "./Container";

type TextProps = {
  text: string;
  additionalClassNames?: string[];
};

/**
 * Primary text component with medium weight
 */
export function PrimaryText({ text, additionalClassNames = [] }: TextProps) {
  return (
    <Container
      additionalClassNames={[
        "flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap tracking-[0.15px]",
        ...additionalClassNames,
      ]}
    >
      <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
        {text}
      </p>
    </Container>
  );
}

/**
 * Table cell text component
 */
export function TableCellText({ text, additionalClassNames = [] }: TextProps) {
  return (
    <div
      className={clsx("bg-neutral-50 relative shrink-0", additionalClassNames)}
    >
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
 * Value text component for displaying data values
 */
export function ValueText({ text }: TextProps) {
  return (
    <CenteredContainer additionalClassNames={["w-full"]}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1 py-0 relative w-full">
        <div className="basis-0 css-xb5jc6 font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#141414] text-[14px] text-left">
          <p className="block leading-[21px]">{text}</p>
        </div>
      </div>
    </CenteredContainer>
  );
}

/**
 * Title text component for section headings
 */
export function TitleText({ text }: TextProps) {
  return (
    <FullWidthColumnContainer>
      <div
        className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[#141414] text-[20px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[23px]">{text}</p>
      </div>
    </FullWidthColumnContainer>
  );
}

/**
 * Time text component for displaying timestamps
 */
export function TimeText({ text }: TextProps) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <div className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-left text-neutral-500 text-nowrap w-full">
          <p className="block leading-[21px] whitespace-pre">{text}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Label text component for form labels and descriptions
 */
export function LabelText({ text }: TextProps) {
  return (
    <div
      className="css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[14px] text-left text-neutral-500"
      style={{ width: "min-content" }}
    >
      <p className="block leading-[21px]">{text}</p>
    </div>
  );
}

/**
 * Bold label text component for emphasized labels
 */
export function BoldLabelText({ text }: TextProps) {
  return (
    <div
      className="css-lbkhcf font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[14px] text-left text-neutral-500"
      style={{ width: "min-content" }}
    >
      <p className="block leading-[21px]">{text}</p>
    </div>
  );
}

/**
 * Bold value text component for emphasized values
 */
export function BoldValueText({ text }: TextProps) {
  return (
    <CenteredContainer additionalClassNames={["w-full"]}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1 py-0 relative w-full">
        <div className="basis-0 css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#141414] text-[14px] text-left">
          <p className="block leading-[21px]">{text}</p>
        </div>
      </div>
    </CenteredContainer>
  );
}

/**
 * Navigation item text component
 */
export function NavItemText({ text }: TextProps) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <div className="css-xb5jc6 font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#141414] text-[14px] text-left text-nowrap w-full">
          <p className="block leading-[21px] whitespace-pre">{text}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Logo text component
 */
export function LogoText() {
  return (
    <div className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold h-full leading-[0] relative shrink-0 text-[#141414] text-[18px] text-left text-nowrap">
      <p className="block leading-[23px] whitespace-pre">CookOps</p>
    </div>
  );
}

/**
 * Button text component
 */
export function ButtonText({ text, additionalClassNames = [] }: TextProps) {
  return (
    <Container
      additionalClassNames={[
        "flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap tracking-[0.15px]",
        ...additionalClassNames,
      ]}
    >
      <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
        {text}
      </p>
    </Container>
  );
}

/**
 * Tab text component
 */
export function TabText({ text, additionalClassNames = [] }: TextProps) {
  return (
    <Container
      additionalClassNames={[
        "flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap tracking-[0.1px]",
        ...additionalClassNames,
      ]}
    >
      <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
        {text}
      </p>
    </Container>
  );
}
