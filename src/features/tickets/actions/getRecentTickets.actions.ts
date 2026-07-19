"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";

export async function getRecentTickets(limit: number = 5) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return [];
  }

  await connectToDB();

  const tickets = await Ticket.find()
    .populate("user", "firstName lastName")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return tickets.map((ticket) => ({
    _id: ticket._id.toString(),
    subject: ticket.subject,
    userName: (ticket.user as any)?.firstName + " " + (ticket.user as any)?.lastName || "کاربر",
    status: ticket.status, // "pending" | "answered"
    message:ticket.message,
    createdAt: ticket.createdAt,
  }));
}