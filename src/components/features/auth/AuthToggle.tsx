"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterFormWrapper from "./RegisterFormWrapper";

export default function AuthToggle() {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  return (
    <>
      {authType === "register" ? (
        <RegisterFormWrapper onToggle={() => setAuthType("login")} />
      ) : (
        <LoginForm onToggle={() => setAuthType("register")} />
      )}
    </>
  );
}