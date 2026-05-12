import { UserRole } from "@/lib/constants/roles";

export interface IUser {
  mobile: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}