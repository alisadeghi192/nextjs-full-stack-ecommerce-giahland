import mongoose, { Schema, Model } from "mongoose";
import { ITicket } from "@/features/tickets/types/ticket.types";
import { TICKET_DEPARTMENTS } from "@/lib/constants/ticket";

const TicketSchema = new Schema<ITicket>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    department: {
      type: String,
      enum: TICKET_DEPARTMENTS.map((d) => d.value),
      required: true,
    },
    message: { type: String, required: true },
    attachment: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "answered"],
      default: "pending",
    },
    adminReply: {
      message: { type: String },
      createdAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema);

export default Ticket;