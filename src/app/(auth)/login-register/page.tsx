"use client";

import { useState } from "react";
import LoginForm from "@/components/features/auth/LoginForm";
import RegisterForm from "@/components/features/auth/RegisterForm";
import Image from "next/image";
import PublicHeader from "@/components/layout/public/PublicHeader";

type authTypes = "login" | "register";

export default function AuthPage() {
  const [authType, setAuthType] = useState<authTypes>("login");

  return (
    <main className="relative flex h-dvh items-center max-sm:flex-col-reverse">
      <div className="absolute top-0 right-0 left-0 sm:hidden">
        <PublicHeader />
      </div>
      {authType === "register" ? (
        <RegisterForm onToggle={() => setAuthType("login")} />
      ) : (
        <LoginForm onToggle={() => setAuthType("register")} />
      )}
      <div className="relative h-screen w-1/2 max-lg:w-1/3 max-sm:h-3/8 max-sm:w-full">
        <Image
          alt="login page pic"
          src="/images/login-cover.png"
          fill
          className="object-cover max-sm:mt-10"
        />
      </div>
    </main>
  );
}
