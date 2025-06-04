import React from "react";
import clsx from "clsx";

type ContainerProps = {
  additionalClassNames?: string[];
};

/**
 * Base container component with flexible styling
 */
export function Container({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <div
      style={{ fontVariationSettings: "'wdth' 100" }}
      className={clsx(additionalClassNames)}
    >
      {children}
    </div>
  );
}

/**
 * Container for button elements
 */
export function ButtonContainer({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        {children}
      </div>
    </div>
  );
}

/**
 * Container for information sections with column layout
 */
export function InfoContainer({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative w-full">
        {children}
      </div>
    </div>
  );
}

/**
 * Container for tab elements
 */
export function TabContainer({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex flex-col items-center justify-end overflow-clip p-0 relative size-full">
        {children}
      </div>
    </div>
  );
}

/**
 * Container with row layout for horizontal elements
 */
export function RowContainer({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

/**
 * Container with column layout for vertical elements
 */
export function ColumnContainer({ children }: React.PropsWithChildren<object>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

/**
 * Full-width container with column layout
 */
export function FullWidthColumnContainer({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        {children}
      </div>
    </div>
  );
}

/**
 * Container with fixed size and positioning
 */
export function FixedContainer({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="relative size-full">{children}</div>
    </div>
  );
}

/**
 * Centered container for content alignment
 */
export function CenteredContainer({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center relative size-full">
        {children}
      </div>
    </div>
  );
}

/**
 * Container for bordered information sections
 */
export function BorderedInfoContainer({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="absolute border-[#e5e8eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-2 items-start justify-start pb-[17px] pt-4 px-0 relative size-full">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Container for header sections
 */
export function HeaderContainer({ children }: React.PropsWithChildren<object>) {
  return (
    <FixedContainer additionalClassNames={["w-full"]}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row items-start justify-between px-4 py-2 relative w-full">
        {children}
      </div>
    </FixedContainer>
  );
}

/**
 * Container for tab content with state layer
 */
export function StateLayerContainer({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-end overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-end px-4 py-0 relative size-full">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Container for tab contents with centered alignment
 */
export function TabContentsContainer({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center px-0 py-3.5 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
