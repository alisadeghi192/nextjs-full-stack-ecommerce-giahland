import { AuthUser } from "@/features/user/types/user.types";
import { UserRole } from "@/lib/constants/roles";

export type UserWithoutPassword = Omit<AuthUser, "password">;

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
  user: UserWithoutPassword | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: UserWithoutPassword | null) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface IAuthResponse {
  success: boolean;
  message?: string;
  user?: UserWithoutPassword;
}

export interface IGetMeResponse {
  user: {
    _id: string;
    mobile: string;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    address?: string;
    postalCode?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    wishlist?: string[];
    specialties?: string;
    yearsOfExperience?: number;
    consultationFee?: number;
    successfulConsultations?: number;
    articles?: string[];
    consultations?: string[];
    isSuperAdmin?: boolean;
  } | null;
}
