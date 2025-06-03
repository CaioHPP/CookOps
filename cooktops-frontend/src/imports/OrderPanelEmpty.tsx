import clsx from "clsx";
import imgProfilePic from "./../assets/profile-pic.png";
import svgPaths from "./svg-oxrsuyqcqv";
type BackgroundImage148Props = {
  additionalClassNames?: string[];
};

function BackgroundImage148({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage148Props>) {
  return (
    <div
      style={{ fontVariationSettings: "'wdth' 100" }}
      className={clsx(additionalClassNames)}
    >
      {children}
    </div>
  );
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        {children}
      </div>
    </div>
  );
}

function ContentBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#6750a4] relative rounded-2xl shrink-0">
      <div className="box-border content-stretch flex flex-row items-center justify-center overflow-clip p-0 relative">
        {children}
      </div>
    </div>
  );
}

function TabBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex flex-col items-center justify-end overflow-clip p-0 relative size-full">
        {children}
      </div>
    </div>
  );
}

function BackgroundImage85({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

function BackgroundImage69({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}
type BackgroundImage53Props = {
  additionalClassNames?: string[];
};

function BackgroundImage53({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage53Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center relative size-full">
        {children}
      </div>
    </div>
  );
}

function StatelayerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage53>
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative">
        {children}
      </div>
    </BackgroundImage53>
  );
}

function StatelayerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
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

function TabcontentsBackgroundImage({ children }: React.PropsWithChildren<{}>) {
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
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string[];
};

function BackgroundImageAndText1({
  text,
  additionalClassNames = [],
}: BackgroundImageAndText1Props) {
  return (
    <BackgroundImage148
      additionalClassNames={[
        "flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[16px] text-left text-nowrap tracking-[0.15px]",
        ...additionalClassNames,
      ]}
    >
      <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
        {text}
      </p>
    </BackgroundImage148>
  );
}
type ContentBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string[];
};

function ContentBackgroundImageAndText({
  text,
  additionalClassNames = [],
}: ContentBackgroundImageAndTextProps) {
  return (
    <div
      style={{ width: "min-content" }}
      className={clsx(
        "css-lbkhcf min-w-full relative shrink-0",
        additionalClassNames
      )}
    >
      <p className="block leading-[normal]">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string[];
};

function BackgroundImageAndText({
  text,
  additionalClassNames = [],
}: BackgroundImageAndTextProps) {
  return (
    <BackgroundImage148
      additionalClassNames={[
        "flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap tracking-[0.1px]",
        ...additionalClassNames,
      ]}
    >
      <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
        {text}
      </p>
    </BackgroundImage148>
  );
}
type NavitemBackgroundImageAndTextProps = {
  text: string;
};

function NavitemBackgroundImageAndText({
  text,
}: NavitemBackgroundImageAndTextProps) {
  return (
    <BackgroundImage69>
      <div className="css-xb5jc6 font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#141414] text-[14px] text-left text-nowrap w-full">
        <p className="block leading-[21px] whitespace-pre">{text}</p>
      </div>
    </BackgroundImage69>
  );
}

function Logo() {
  return (
    <BackgroundImage85>
      <div className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold h-full leading-[0] relative shrink-0 text-[#141414] text-[18px] text-left text-nowrap">
        <p className="block leading-[23px] whitespace-pre">CookOps</p>
      </div>
    </BackgroundImage85>
  );
}

function NavItem() {
  return (
    <BackgroundImage69>
      <div className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#141414] text-[14px] text-left text-nowrap w-full">
        <p className="block leading-[21px] whitespace-pre">Pedidos</p>
      </div>
    </BackgroundImage69>
  );
}

function NavItems() {
  return (
    <div className="h-10 relative shrink-0" data-name="nav-items">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-9 h-10 items-center justify-start p-0 relative">
        <NavItem />
        <NavitemBackgroundImageAndText text="Produção" />
        <NavitemBackgroundImageAndText text="Cardápio" />
        <NavitemBackgroundImageAndText text="Configurações" />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="main"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative w-full">
        <NavItems />
      </div>
    </div>
  );
}

function Depth6Frame0() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="Depth 6, Frame 0"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative size-full">
        <div className="absolute left-0 size-5 top-0" data-name="Vector - 0">
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
                id="Vector - 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Depth5Frame0() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Depth 5, Frame 0"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-center justify-start p-0 relative w-full">
        <Depth6Frame0 />
      </div>
    </div>
  );
}

function Notifications() {
  return (
    <div
      className="bg-[#ededed] h-10 max-w-[480px] relative rounded-lg shrink-0"
      data-name="notifications"
    >
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-2.5 py-0 relative">
          <Depth5Frame0 />
        </div>
      </div>
    </div>
  );
}

function ProfilePic() {
  return (
    <div
      className="bg-[50%_50%] bg-cover bg-no-repeat rounded-[20px] shrink-0 size-10"
      data-name="profile-pic"
      style={{ backgroundImage: `url('${imgProfilePic}')` }}
    />
  );
}

function Profile() {
  return (
    <BackgroundImage85>
      <Notifications />
      <ProfilePic />
    </BackgroundImage85>
  );
}

function Navbar() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="navbar">
      <div className="absolute border-[0px_0px_1px] border-neutral-50 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-10 items-center justify-start pb-[13px] pt-3 px-10 relative w-full">
          <Logo />
          <Main />
          <Profile />
        </div>
      </div>
    </div>
  );
}

function Indicator() {
  return (
    <div
      className="absolute bottom-0 h-3.5 left-0 right-0"
      data-name="Indicator"
    >
      <div
        className="absolute bg-[#6750a4] bottom-0 h-[3px] left-0.5 right-0.5 rounded-tl-[100px] rounded-tr-[100px]"
        data-name="Shape"
      />
    </div>
  );
}

function TabContents() {
  return (
    <TabcontentsBackgroundImage>
      <BackgroundImageAndText
        text="All"
        additionalClassNames={["css-canpp4", "text-[#6750a4]"]}
      />
      <Indicator />
    </TabcontentsBackgroundImage>
  );
}

function StateLayer() {
  return (
    <StatelayerBackgroundImage>
      <TabContents />
    </StatelayerBackgroundImage>
  );
}

function Tab1() {
  return (
    <TabBackgroundImage>
      <StateLayer />
    </TabBackgroundImage>
  );
}

function TabContents1() {
  return (
    <TabcontentsBackgroundImage>
      <BackgroundImageAndText
        text="Balcão"
        additionalClassNames={["css-5fteq9", "text-[#49454f]"]}
      />
    </TabcontentsBackgroundImage>
  );
}

function StateLayer1() {
  return (
    <StatelayerBackgroundImage>
      <TabContents1 />
    </StatelayerBackgroundImage>
  );
}

function Tab2() {
  return (
    <TabBackgroundImage>
      <StateLayer1 />
    </TabBackgroundImage>
  );
}

function TabContents2() {
  return (
    <TabcontentsBackgroundImage>
      <BackgroundImageAndText
        text="App"
        additionalClassNames={["css-5fteq9", "text-[#49454f]"]}
      />
    </TabcontentsBackgroundImage>
  );
}

function StateLayer2() {
  return (
    <StatelayerBackgroundImage>
      <TabContents2 />
    </StatelayerBackgroundImage>
  );
}

function Tab3() {
  return (
    <TabBackgroundImage>
      <StateLayer2 />
    </TabBackgroundImage>
  );
}

function TabGroup() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="Tab group"
    >
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative size-full">
        <Tab1 />
        <Tab2 />
        <Tab3 />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Divider">
      <div className="absolute bottom-[-0.003%] left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 320 1"
        >
          <g id="Divider">
            <line
              id="Divider_2"
              stroke="var(--stroke-0, #CAC4D0)"
              x2="320"
              y1="0.500028"
              y2="0.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="h-12 relative shrink-0 w-full" data-name="Tabs">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-12 items-start justify-start p-0 relative w-full">
        <TabGroup />
        <Divider />
      </div>
    </div>
  );
}

function Tabs1() {
  return (
    <div className="relative shrink-0 w-full" data-name="tabs">
      <div className="relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start pb-3 pt-0 px-0 relative w-full">
          <Tabs />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <BackgroundImage53 additionalClassNames={["w-full"]}>
      <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-0 py-10 relative w-full">
        <div className="basis-0 css-lbkhcf font-['Plus_Jakarta_Sans:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[14px] text-center text-neutral-500">
          <p className="block leading-[21px]">Não há ordens no painel ainda</p>
        </div>
      </div>
    </BackgroundImage53>
  );
}

function Cards() {
  return (
    <div className="relative shrink-0 w-full" data-name="cards">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        <EmptyState />
      </div>
    </div>
  );
}

function CardList() {
  return (
    <div className="h-full relative shrink-0 w-80" data-name="card list">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start justify-start overflow-clip p-0 relative w-80">
        <Tabs1 />
        <Cards />
      </div>
    </div>
  );
}

function BackgroundComplete() {
  return (
    <div
      className="[grid-area:1_/_1] h-[223.187px] ml-0 mt-0 relative w-[322.096px]"
      data-name="background-complete"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 323 224"
      >
        <g id="background-complete">
          <path
            d={svgPaths.p4bc5200}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector"
          />
          <path
            d={svgPaths.pa8ce800}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_2"
          />
          <path
            d={svgPaths.pfd7ae80}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p3bd21a00}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p2b8dfc00}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_5"
          />
          <path
            d={svgPaths.p2a8e1880}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p355e70f0}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_7"
          />
          <path
            d={svgPaths.p3b24780}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p1078e180}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_9"
          />
          <path
            d={svgPaths.p3278a350}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_10"
          />
          <path
            d={svgPaths.p13947000}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_11"
          />
          <path
            d={svgPaths.p19923800}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_12"
          />
          <path
            d={svgPaths.p203e6f00}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_13"
          />
          <path
            d={svgPaths.p1a1622f0}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_14"
          />
          <path
            d={svgPaths.p3984300}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_15"
          />
          <path
            d={svgPaths.p397dd7f0}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_16"
          />
          <path
            d={svgPaths.p1bcaa380}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_17"
          />
          <path
            d={svgPaths.pd3c4400}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_18"
          />
          <path
            d={svgPaths.p3e40ab00}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_19"
          />
          <path
            d={svgPaths.p26f6a180}
            fill="var(--fill-0, #F5F5F5)"
            id="Vector_20"
          />
          <path
            d={svgPaths.pc1c9e80}
            fill="var(--fill-0, white)"
            id="Vector_21"
          />
          <path
            d={svgPaths.p1738ce00}
            fill="var(--fill-0, white)"
            id="Vector_22"
          />
          <path
            d={svgPaths.p29af8000}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_23"
          />
          <path
            d={svgPaths.p1efe180}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_24"
          />
          <path
            d={svgPaths.p3ebb8600}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_25"
          />
          <path
            d={svgPaths.p1c398100}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_26"
          />
          <path
            d={svgPaths.p141e0c80}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_27"
          />
          <path
            d={svgPaths.p72eea00}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_28"
          />
          <path
            d={svgPaths.p13f2d340}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_29"
          />
          <path
            d={svgPaths.p220d80c0}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_30"
          />
          <path
            d={svgPaths.p5e89c80}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_31"
          />
          <path
            d={svgPaths.p19493080}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_32"
          />
          <path
            d={svgPaths.p15a8ea00}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_33"
          />
          <path
            d={svgPaths.p1b82f300}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_34"
          />
          <path
            d={svgPaths.p13609d80}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_35"
          />
          <path
            d={svgPaths.p1d21f100}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_36"
          />
          <path
            d={svgPaths.p15cdb700}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_37"
          />
          <path
            d={svgPaths.p251fedf0}
            fill="var(--fill-0, #F0F0F0)"
            id="Vector_38"
          />
          <path
            d={svgPaths.p1b09ab00}
            fill="var(--fill-0, #F0F0F0)"
            id="Vector_39"
          />
          <path
            d={svgPaths.p17513cc0}
            fill="var(--fill-0, #E6E6E6)"
            id="Vector_40"
          />
          <path
            d={svgPaths.p33502570}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_41"
          />
          <path
            d={svgPaths.p1da02500}
            fill="var(--fill-0, #F5F5F5)"
            id="Vector_42"
          />
          <path
            d={svgPaths.p3ff1a600}
            fill="var(--fill-0, #F0F0F0)"
            id="Vector_43"
          />
          <path
            d={svgPaths.p28b9980}
            fill="var(--fill-0, #E6E6E6)"
            id="Vector_44"
          />
          <path
            d={svgPaths.p1d461240}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_45"
          />
          <path
            d={svgPaths.p2965cd80}
            fill="var(--fill-0, #F5F5F5)"
            id="Vector_46"
          />
          <path
            d={svgPaths.p17d7e500}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_47"
          />
          <path
            d={svgPaths.p2cb30200}
            fill="var(--fill-0, #F5F5F5)"
            id="Vector_48"
          />
          <path
            d={svgPaths.p3e12600}
            fill="var(--fill-0, #F0F0F0)"
            id="Vector_49"
          />
          <path
            d={svgPaths.p3148b500}
            fill="var(--fill-0, #FAFAFA)"
            id="Vector_50"
          />
          <path
            d={svgPaths.p151f4f80}
            fill="var(--fill-0, #E6E6E6)"
            id="Vector_51"
          />
          <path
            d={svgPaths.p3577e930}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_52"
          />
          <path
            d={svgPaths.p25111c80}
            fill="var(--fill-0, #FAFAFA)"
            id="Vector_53"
          />
          <path
            d={svgPaths.p29728700}
            fill="var(--fill-0, #FAFAFA)"
            id="Vector_54"
          />
          <path
            d={svgPaths.p3d296980}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_55"
          />
          <path
            d={svgPaths.p21810c00}
            fill="var(--fill-0, #F0F0F0)"
            id="Vector_56"
          />
          <path
            d={svgPaths.p34e03b00}
            fill="var(--fill-0, #FAFAFA)"
            id="Vector_57"
          />
          <path
            d={svgPaths.p2a8a8580}
            fill="var(--fill-0, #E6E6E6)"
            id="Vector_58"
          />
          <path
            d={svgPaths.p2ab33880}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_59"
          />
          <path
            d={svgPaths.pa8da530}
            fill="var(--fill-0, #FAFAFA)"
            id="Vector_60"
          />
          <path
            d={svgPaths.p7a2bb80}
            fill="var(--fill-0, #FAFAFA)"
            id="Vector_61"
          />
          <path
            d={svgPaths.p2ffb8af0}
            fill="var(--fill-0, #E0E0E0)"
            id="Vector_62"
          />
          <path
            d={svgPaths.p30d78580}
            fill="var(--fill-0, #F5F5F5)"
            id="Vector_63"
          />
          <path
            d={svgPaths.p1369d500}
            fill="var(--fill-0, #EBEBEB)"
            id="Vector_64"
          />
        </g>
      </svg>
    </div>
  );
}

function BackgroundSimple() {
  return (
    <div
      className="[grid-area:1_/_1] h-[119.575px] ml-[42.642px] mt-[67.957px] relative w-[200.893px]"
      data-name="background-simple"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="background-simple" opacity="0">
          <path
            d={svgPaths.p995c0f0}
            fill="var(--fill-0, #9F88DC)"
            id="Vector"
          />
          <path
            d={svgPaths.p995c0f0}
            fill="var(--fill-0, white)"
            id="Vector_2"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
}

function Shadow() {
  return (
    <div
      className="[grid-area:1_/_1] h-[14.585px] ml-[36.146px] mt-[225.415px] relative w-[249.805px]"
      data-name="Shadow"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 250 15"
      >
        <g id="Shadow">
          <path d={svgPaths.pf868e80} fill="var(--fill-0, #F5F5F5)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Box() {
  return (
    <div
      className="[grid-area:1_/_1] h-[57.932px] ml-[73.707px] mt-[171.703px] relative w-[97.806px]"
      data-name="Box"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 98 58"
      >
        <g id="Box">
          <path
            d={svgPaths.p261dfd00}
            fill="var(--fill-0, #9F88DC)"
            id="Vector"
          />
          <path
            d={svgPaths.p34128e80}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p34128e80}
            fill="var(--fill-0, black)"
            id="Vector_3"
            opacity="0.2"
          />
          <path
            d={svgPaths.p12189280}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_4"
          />
          <path
            d={svgPaths.p337cda00}
            fill="var(--fill-0, white)"
            id="Vector_5"
            opacity="0.2"
          />
          <path
            d={svgPaths.p31371240}
            fill="var(--fill-0, white)"
            id="Vector_6"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

function Character() {
  return (
    <div
      className="[grid-area:1_/_1] h-[213.343px] ml-[83.739px] mt-[19.364px] relative w-[155.299px]"
      data-name="Character"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 156 214"
      >
        <g id="Character">
          <path
            d={svgPaths.pbdb4e80}
            id="Vector"
            stroke="var(--stroke-0, #9F88DC)"
            strokeMiterlimit="10"
            strokeWidth="0.232918"
          />
          <path
            d={svgPaths.p1b5225d0}
            id="Vector_2"
            stroke="var(--stroke-0, #9F88DC)"
            strokeMiterlimit="10"
            strokeWidth="0.232918"
          />
          <path
            d={svgPaths.p2f467500}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p3998c170}
            fill="var(--fill-0, white)"
            id="Vector_4"
            opacity="0.5"
          />
          <path
            d={svgPaths.p1e670f00}
            fill="var(--fill-0, black)"
            id="Vector_5"
            opacity="0.1"
          />
          <path
            d={svgPaths.p23bd9880}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p23bd9880}
            fill="var(--fill-0, black)"
            id="Vector_7"
            opacity="0.3"
          />
          <path
            d={svgPaths.p18c49300}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_8"
          />
          <path
            d={svgPaths.p18c49300}
            fill="var(--fill-0, black)"
            id="Vector_9"
            opacity="0.4"
          />
          <path
            d={svgPaths.p1afefd00}
            fill="var(--fill-0, black)"
            id="Vector_10"
            opacity="0.1"
          />
          <path
            d={svgPaths.pe7c6280}
            fill="var(--fill-0, black)"
            id="Vector_11"
            opacity="0.2"
          />
          <path
            d={svgPaths.p12de8f0}
            fill="var(--fill-0, #263238)"
            id="Vector_12"
          />
          <path
            d={svgPaths.p398ded00}
            fill="var(--fill-0, #ED847E)"
            id="Vector_13"
          />
          <path
            d={svgPaths.p86ae200}
            fill="var(--fill-0, #263238)"
            id="Vector_14"
          />
          <path
            d={svgPaths.p2b24e00}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_15"
          />
          <path
            d={svgPaths.p5d7fe00}
            fill="var(--fill-0, white)"
            id="Vector_16"
          />
          <path
            d={svgPaths.p10b6c800}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_17"
          />
          <path
            d={svgPaths.p13943700}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_18"
          />
          <path
            d={svgPaths.p3b4e1f00}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_19"
          />
          <path
            d={svgPaths.p13be9600}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_20"
          />
          <path
            d={svgPaths.p36117100}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_21"
          />
          <path
            d={svgPaths.p29414780}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_22"
          />
          <path
            d={svgPaths.p1ff3bfc0}
            fill="var(--fill-0, #263238)"
            id="Vector_23"
          />
          <path
            d={svgPaths.pedb9900}
            fill="var(--fill-0, #263238)"
            id="Vector_24"
          />
          <path
            d={svgPaths.p2a8e3100}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_25"
          />
          <path
            d={svgPaths.p17576e00}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_26"
          />
          <path
            d={svgPaths.p386f4600}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_27"
          />
          <path
            d={svgPaths.pd331c80}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_28"
          />
          <g id="Group" opacity="0.3">
            <path
              d={svgPaths.pd331c80}
              fill="var(--fill-0, white)"
              id="Vector_29"
            />
          </g>
          <path
            d={svgPaths.p21295e00}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_30"
          />
          <g id="Group_2" opacity="0.3">
            <path
              d={svgPaths.p21295e00}
              fill="var(--fill-0, white)"
              id="Vector_31"
            />
          </g>
          <path
            d={svgPaths.p37894100}
            fill="var(--fill-0, black)"
            id="Vector_32"
            opacity="0.2"
          />
          <path
            d={svgPaths.p34febb80}
            fill="var(--fill-0, black)"
            id="Vector_33"
            opacity="0.2"
          />
          <path
            d={svgPaths.p1e774f32}
            fill="var(--fill-0, black)"
            id="Vector_34"
            opacity="0.2"
          />
          <path
            d={svgPaths.p566d900}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_35"
          />
          <path
            d={svgPaths.p2332c00}
            fill="var(--fill-0, #263238)"
            id="Vector_36"
          />
          <path
            d={svgPaths.p16a9f100}
            fill="var(--fill-0, #263238)"
            id="Vector_37"
          />
          <path
            d={svgPaths.p178b9880}
            fill="var(--fill-0, #263238)"
            id="Vector_38"
          />
          <path
            d={svgPaths.p1cec3300}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_39"
          />
          <path
            d={svgPaths.p81c2200}
            fill="var(--fill-0, #263238)"
            id="Vector_40"
          />
          <path
            d={svgPaths.p27b03000}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_41"
          />
          <path
            d={svgPaths.p371b2d00}
            fill="var(--fill-0, black)"
            id="Vector_42"
            opacity="0.3"
          />
          <path
            d={svgPaths.p8431f80}
            fill="var(--fill-0, #263238)"
            id="Vector_43"
          />
          <path
            d={svgPaths.p2188b300}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_44"
          />
          <path
            d={svgPaths.p13ffe200}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_45"
          />
          <path
            d={svgPaths.p265cf200}
            fill="var(--fill-0, #9F88DC)"
            id="Vector_46"
          />
          <g id="Group_3" opacity="0.3">
            <path
              d={svgPaths.p265cf200}
              fill="var(--fill-0, white)"
              id="Vector_47"
            />
          </g>
          <path
            d={svgPaths.p2db3b280}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_48"
          />
          <path
            d={svgPaths.p34cc7c80}
            fill="var(--fill-0, #FFC3BD)"
            id="Vector_49"
          />
        </g>
      </svg>
    </div>
  );
}

function EmptyRafiki() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="empty/rafiki"
    >
      <BackgroundComplete />
      <BackgroundSimple />
      <Shadow />
      <Box />
      <Character />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start leading-[0] p-0 relative text-center text-neutral-500 w-full">
        <ContentBackgroundImageAndText
          text="Não há nenhuma ordem"
          additionalClassNames={[
            "font-['Plus_Jakarta_Sans:Bold',_sans-serif]",
            "font-bold",
            "text-[20px]",
          ]}
        />
        <ContentBackgroundImageAndText
          text="Clique no botão abaixo para gerar uma nova ordem"
          additionalClassNames={[
            "font-['Plus_Jakarta_Sans:Regular',_sans-serif]",
            "font-normal",
            "text-[14px]",
          ]}
        />
      </div>
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-6" data-name="add">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="add">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, white)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer3() {
  return (
    <StatelayerBackgroundImage1>
      <Add />
      <BackgroundImageAndText1
        text="Nova ordem"
        additionalClassNames={["css-jvcgrh", "text-[#ffffff]"]}
      />
    </StatelayerBackgroundImage1>
  );
}

function Content1() {
  return (
    <ContentBackgroundImage>
      <StateLayer3 />
    </ContentBackgroundImage>
  );
}

function Button() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative">
        <Content1 />
      </div>
    </div>
  );
}

function Main1() {
  return (
    <div className="relative shrink-0 w-full" data-name="main">
      <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative w-full">
        <Content />
        <Button />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-[360px]">
      <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative w-[360px]">
        <EmptyRafiki />
        <Main1 />
      </div>
    </div>
  );
}

function Sections() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="sections"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative size-full">
        <Frame1 />
      </div>
    </div>
  );
}

function StateLayer4() {
  return (
    <StatelayerBackgroundImage1>
      <BackgroundImageAndText1
        text="Cancelar pedido"
        additionalClassNames={["css-7m7p53", "text-[#49454f]"]}
      />
    </StatelayerBackgroundImage1>
  );
}

function Content2() {
  return (
    <div className="relative rounded-2xl shrink-0" data-name="Content">
      <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip p-0 relative">
        <StateLayer4 />
      </div>
      <div className="absolute border border-[#cac4d0] border-solid inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}

function Button1() {
  return (
    <ButtonBackgroundImage>
      <Content2 />
    </ButtonBackgroundImage>
  );
}

function StateLayer5() {
  return (
    <StatelayerBackgroundImage1>
      <BackgroundImageAndText1
        text="Confirmar pedido"
        additionalClassNames={["css-jvcgrh", "text-[#ffffff]"]}
      />
    </StatelayerBackgroundImage1>
  );
}

function Content3() {
  return (
    <ContentBackgroundImage>
      <StateLayer5 />
    </ContentBackgroundImage>
  );
}

function Button2() {
  return (
    <ButtonBackgroundImage>
      <Content3 />
    </ButtonBackgroundImage>
  );
}

function Buttons() {
  return (
    <div className="relative shrink-0 w-full" data-name="buttons">
      <div className="flex flex-row items-center justify-end relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-end px-0 py-4 relative w-full">
          <Button1 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div
      className="basis-0 grow h-[1056px] min-h-px min-w-px relative shrink-0"
      data-name="content"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[1056px] items-start justify-start overflow-clip p-0 relative w-full">
        <Sections />
        <Buttons />
      </div>
    </div>
  );
}

function Main2() {
  return (
    <div className="h-[1082px] relative shrink-0 w-full" data-name="main">
      <div className="flex flex-row justify-center relative size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-2 h-[1082px] items-start justify-center px-6 py-5 relative w-full">
          <CardList />
          <Content4 />
        </div>
      </div>
    </div>
  );
}

export default function OrderPanelEmpty() {
  return (
    <div
      className="bg-[#ffffff] relative size-full"
      data-name="order-panel/empty"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full">
        <Navbar />
        <Main2 />
      </div>
    </div>
  );
}
