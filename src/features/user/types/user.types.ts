import { UserRole } from "@/lib/constants/roles";

export interface IUser {
  _id : string
  mobile: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}