// src/features/auth/types/auth.types.ts

import { IUser } from "../../user/types/user.types";
import { UserRole } from "@/lib/constants";

export interface ISignupActionResult {
  success: boolean;
  message?: string;
  errors?: {
    mobile?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

export interface ISigninActionResult {
  success: boolean;
  message?: string;
}

export interface IAuthState {
  user: (Omit<IUser, "password"> ) | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: (Omit<IUser, "password"> ) | null) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface IAuthResponse {
  success: boolean;
  message?: string;
  user?: Omit<IUser, "password">;
}

export interface IGetMeResponse {
  user: {
    _id: string;
    mobile: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
