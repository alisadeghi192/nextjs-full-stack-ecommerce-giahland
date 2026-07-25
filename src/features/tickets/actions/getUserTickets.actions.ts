"use server"
import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { ITicket } from "../types/ticket.types";

export async function getUserTickets(): Promise<ITicket[]> {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  await connectToDB();
  const tickets = await Ticket.find({ user: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return tickets.map((ticket) => ({
    ...ticket,
    _id: ticket._id.toString(),
    user: ticket.user.toString(),
  })) as ITicket[];
}