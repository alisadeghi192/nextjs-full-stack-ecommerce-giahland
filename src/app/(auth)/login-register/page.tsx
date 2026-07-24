import AuthToggle from "@/components/features/auth/AuthToggle";
import MobileNav from "@/components/shared/layout/public/header/mobile/MobileHeader";
import Image from "next/image";

export default function AuthPage() {
  return (
    <section className="relative flex h-dvh items-center max-sm:flex-col-reverse">
      <div className="absolute top-0 right-0 left-0 z-20  sm:hidden ">
        <MobileNav hasSearchInput={false} isScrolled={true} useInLoginPage={true}/>
      </div>
      <AuthToggle />
      <div className="relative h-dvh w-1/2 max-lg:w-1/3 max-sm:h-3/8 max-sm:w-full ">
        <Image
          alt="login page pic"
          src="/static/images/login-cover.webp"
          fill
          className="object-cover  max-sm:mt-12"
        />
      </div>
    </section>
  );
}
