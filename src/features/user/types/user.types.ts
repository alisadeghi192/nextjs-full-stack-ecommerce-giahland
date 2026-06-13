import { UserRole } from "@/lib/constants/roles";

export interface BaseUser {
  _id: string;
  mobile: string;
  email: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminUser extends BaseUser {
  role: "admin";
}

export interface IRegularUser extends BaseUser {
  role: "user";
  postalCode?: string;
  address?: string;
  wishlist?: string[];
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