'use client'

import { useState } from "react";
import LoginForm from "@@/components/features/auth/LoginForm";
import RegisterForm from "@@/components/features/auth/RegisterForm";

type authTypes = "login" | "register";

export default function AuthPage() {
  const [authType, setAuthType] = useState<authTypes>("login");

  return (
    <main className="flex h-dvh items-center">
      {authType === "register" ? (
        <RegisterForm onToggle={() => setAuthType("login")} />
      ) : (
        <LoginForm onToggle={() => setAuthType("register")} />
      )}
      <div className="h-screen w-1/2 bg-red-400"></div>
    </main>
  );
}