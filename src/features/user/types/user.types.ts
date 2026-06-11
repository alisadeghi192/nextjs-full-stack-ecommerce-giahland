import { UserRole } from "@/lib/constants/roles";

export interface IUser {
  _id: string;
  mobile: string;
  email: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  postalCode?: string;
  address?: string;
  wishlist?: string[];
  createdAt: Date;
  updatedAt: Date;
}
