import { LoginCard } from "@/components/loginCard/LoginCard";
import ModeToggle from "@/components/themeToogle/toogle";

export default function Home() {
  return (
    <>
      <ModeToggle />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginCard />
        </div>
      </div>
    </>
  );
}
