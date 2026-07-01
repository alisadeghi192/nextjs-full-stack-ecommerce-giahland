"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import ContactMessage from "@/lib/db/models/ContactMessage";
import Ticket from "@/lib/db/models/Ticket";

export async function getAdminUnreadCounts() {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return { tickets: 0, contact: 0, total: 0 };
  }

  await connectToDB();

  const [tickets, contact] = await Promise.all([
    Ticket.countDocuments({ status: "pending" }),
    ContactMessage.countDocuments({ isRead: false }),
  ]);
console.log(tickets + contact)
  return {
    tickets,
    contact,
    total: tickets + contact,
  };
  
}