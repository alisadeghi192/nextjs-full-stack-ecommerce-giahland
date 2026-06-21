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
