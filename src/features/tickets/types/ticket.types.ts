import { TICKET_DEPARTMENT } from "@/lib/constants";
import { Types } from "mongoose";

export interface ITicket {
  _id: string;
  user: Types.ObjectId | string;
  subject: string;
  department: TICKET_DEPARTMENT;
  message: string;
  attachment?: string;
  status: "pending" | "answered";
  adminReply?: {
    message: string;
    createdAt: Date;
  };
  isReadByUser?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAdminTicket {
  _id: string;
  subject: string;
  department: string;
  message: string;
  attachment?: string;
  status: "pending" | "answered";
  adminReply?: {
    message: string;
    createdAt: Date;
  };
  isReadByUser: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    role: string;
  };
}

export interface IPaginatedTickets {
  tickets: IAdminTicket[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ITicketFilters {
  role?: string; // "plant-doctor" | "user"
  sort?: string; // "newest" | "oldest"
  status?: string; // "pending" | "answered"
  department?: string; // "support" | "sales" | "complaint" | "other"
}
export interface IDashboardTickets {
  _id: string;
  subject: string;
  userName: string;
  message:string;
  status: "pending" | "answered";
  createdAt: Date;
}
