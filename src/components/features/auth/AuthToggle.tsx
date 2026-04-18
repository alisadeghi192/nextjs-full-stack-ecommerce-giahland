"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthToggle() {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  return (
    <>
      {authType === "register" ? (
        <RegisterForm onToggle={() => setAuthType("login")} />
      ) : (
        <LoginForm onToggle={() => setAuthType("register")} />
      )}
    </>
  );
}