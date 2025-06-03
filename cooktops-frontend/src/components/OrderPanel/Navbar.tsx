import imgProfilePic from "./../../assets/profile-pic.png";
import svgPaths from "./../../imports/svg-43dy7vs5ti";

export function Navbar() {
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

function Logo() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        <div className="css-xb5jc6 font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold h-full leading-[0] relative shrink-0 text-[#141414] text-[18px] text-left text-nowrap">
          <p className="block leading-[23px] whitespace-pre">CookOps</p>
        </div>
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

function NavItems() {
  return (
    <div className="h-10 relative shrink-0" data-name="nav-items">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-9 h-10 items-center justify-start p-0 relative">
        <NavItem active />
        <NavItem text="Produção" />
        <NavItem text="Cardápio" />
        <NavItem text="Configurações" />
      </div>
    </div>
  );
}

function NavItem({ text = "Pedidos", active = false }) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <div
          className={`css-xb5jc6 font-['Plus_Jakarta_Sans:${
            active ? "Bold" : "Medium"
          }',_sans-serif] ${
            active ? "font-bold" : "font-medium"
          } leading-[0] relative shrink-0 text-[#141414] text-[14px] text-left text-nowrap w-full`}
        >
          <p className="block leading-[21px] whitespace-pre">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        <Notifications />
        <ProfilePic />
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
          <div
            className="basis-0 grow min-h-px min-w-px relative shrink-0"
            data-name="Depth 5, Frame 0"
          >
            <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-center justify-start p-0 relative w-full">
              <div
                className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
                data-name="Depth 6, Frame 0"
              >
                <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative size-full">
                  <div
                    className="absolute left-0 size-5 top-0"
                    data-name="Vector - 0"
                  >
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
            </div>
          </div>
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
