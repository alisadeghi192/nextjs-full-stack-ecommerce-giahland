import Image from "next/image";
import PublicHeader from "@/components/shared/layout/public/header/PublicHeader";
import AuthToggle from "@/components/features/auth/AuthToggle";

export default function AuthPage() {
  return (
    <main className="relative flex h-dvh items-center max-sm:flex-col-reverse">
      <div className="absolute top-0 right-0 left-0 sm:hidden">
        <PublicHeader hasSearchInput={false} />
      </div>
      <AuthToggle />
      <div className="relative h-screen w-1/2 max-lg:w-1/3 max-sm:h-3/8 max-sm:w-full">
        <Image
          alt="login page pic"
          src="/static/images/login-cover.png"
          fill
          className="object-cover max-sm:mt-10"
        />
      </div>
    </main>
  );
}
