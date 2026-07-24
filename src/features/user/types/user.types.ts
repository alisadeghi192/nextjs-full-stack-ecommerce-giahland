import { USER_ROLE } from "@/lib/constants";

export interface BaseUser {
  _id: string;
  mobile: string;
  email: string;
  password: string;
  role: USER_ROLE;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isSuperAdmin?: boolean;
}

export interface IAdminUser extends BaseUser {
  role: "admin";
}

export interface IRegularUser extends BaseUser {
  role: "user";
  postalCode?: string;
  address?: string;
  wishlist?: string[];
  isBlocked?: boolean;
}

export interface IPlantDoctorUser extends BaseUser {
  role: "plant-doctor";
  specialties: string;
  yearsOfExperience: number;
  consultationFee: number;
  successfulConsultations: number;
  articles: string[];
  consultations: string[];
}

export type AuthUser = IAdminUser | IRegularUser | IPlantDoctorUser;



export interface IDashboardUser {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  role: "admin" | "user" | "plant-doctor";
  avatar: string;
  isBlocked: boolean;
  createdAt: Date;
}


