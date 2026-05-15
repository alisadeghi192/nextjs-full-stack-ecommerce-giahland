"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { IUser } from "@/features/user/types/user.types";

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: Omit<IUser, "password"> | null;
}

export default function AuthProvider({ children, initialUser }: AuthProviderProps) {
  useEffect(() => {
    useAuthStore.getState().setUser(initialUser);
  }, [initialUser]);

  return <>{children}</>;
}