import Image from "next/image";
import AuthToggle from "@/components/features/auth/AuthToggle";
import MobileNav from "@/components/shared/layout/public/header/MobileNav";

export default function AuthPage() {
  return (
    <main className="relative flex h-dvh items-center max-sm:flex-col-reverse">
      <div className="absolute top-0 right-0 left-0 z-20  sm:hidden ">
        <MobileNav hasSearchInput={false} isScrolled={true} useInLoginPage={true}/>
      </div>
      <AuthToggle />
      <div className="relative h-dvh w-1/2 max-lg:w-1/3 max-sm:h-3/8 max-sm:w-full ">
        <Image
          alt="login page pic"
          src="/static/images/login-cover.png"
          fill
          className="object-cover  max-sm:mt-12"
        />
      </div>
    </main>
  );
}
