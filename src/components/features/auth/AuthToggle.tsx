"use client";
import { useState } from "react";
import RegisterFormWrapper from "./RegisterFormWrapper";
import LoginFormWrapper from "./LoginFormWrapper";

export default function AuthToggle() {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  return (
    <>
      {authType === "register" ? (
        <RegisterFormWrapper onToggle={() => setAuthType("login")} />
      ) : (
        <LoginFormWrapper onToggle={() => setAuthType("register")} />
      )}
    </>
  );
}