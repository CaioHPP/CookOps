export function Tabs() {
  return (
    <div className="relative shrink-0 w-full" data-name="tabs">
      <div className="relative size-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col items-start justify-start pb-3 pt-0 px-0 relative w-full">
          <div className="h-12 relative shrink-0 w-full" data-name="Tabs">
            <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col h-12 items-start justify-start p-0 relative w-full">
              <TabGroup />
              <Divider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabGroup() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
      data-name="Tab group"
    >
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative size-full">
        <Tab text="All" isActive={true} />
        <Tab text="Balcão" />
        <Tab text="App" />
      </div>
    </div>
  );
}

interface TabProps {
  text: string;
  isActive?: boolean;
}

function Tab({ text, isActive = false }: TabProps) {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex flex-col items-center justify-end overflow-clip p-0 relative size-full">
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="flex flex-col items-center justify-end overflow-clip relative size-full">
            <div className="box-border content-stretch flex flex-col items-center justify-end px-4 py-0 relative size-full">
              <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                  <div className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center px-0 py-3.5 relative">
                    <div
                      style={{ fontVariationSettings: "'wdth' 100" }}
                      className={`flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap tracking-[0.1px] ${
                        isActive
                          ? "css-canpp4 text-primary"
                          : "css-5fteq9 text-muted-foreground"
                      }`}
                    >
                      <p className="adjustLetterSpacing block leading-[20px] whitespace-pre">
                        {text}
                      </p>
                    </div>
                    {isActive && (
                      <div
                        className="absolute bottom-0 h-3.5 left-0 right-0"
                        data-name="Indicator"
                      >
                        <div
                          className="absolute bg-primary bottom-0 h-[3px] left-0.5 right-0.5 rounded-tl-[100px] rounded-tr-[100px]"
                          data-name="Shape"
                        />
                      </div>
                    )}
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
