import { TicketDepartment } from "@/lib/constants/ticket";
import { Types } from "mongoose";

export interface ITicket {
  _id: string;
  user: Types.ObjectId | string;
  subject: string;
  department: TicketDepartment;
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
export interface AdminTicket {
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

export interface PaginatedTickets {
  tickets: AdminTicket[];
  total: number;
  page: number;
  totalPages: number;
}

export interface TicketFilters {
  role?: string;      // "plant-doctor" | "user"
  sort?: string;      // "newest" | "oldest"
  status?: string;    // "pending" | "answered"
}