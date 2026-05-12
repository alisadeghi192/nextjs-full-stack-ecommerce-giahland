// src/features/auth/types/auth.types.ts

import { IUser } from "../../user/types/user.types";

export interface IAuthState {
  user: Omit<IUser, "password"> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

export interface IAuthResponse {
  success: boolean;
  message?: string;
  user?: Omit<IUser, "password">;
}

export interface IGetMeResponse {
  user: Omit<IUser, "password"> | null;
}

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