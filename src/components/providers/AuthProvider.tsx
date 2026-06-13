"use client";

import { AuthUser } from "@/features/user/types/user.types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: Omit<AuthUser , "password"> | null;
}

export default function AuthProvider({ children, initialUser }: AuthProviderProps) {
  useEffect(() => {
    useAuthStore.getState().setUser(initialUser);
  }, [initialUser]);

  return <>{children}</>;
}