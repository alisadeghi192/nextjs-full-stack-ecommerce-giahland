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

  const getUserDisplayName = (user: any): string => {
    const firstName = user?.firstName?.trim() || "";
    const lastName = user?.lastName?.trim() || "";
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (firstName) {
      return firstName;
    }
    if (lastName) {
      return lastName;
    }
    return "کاربر";
  };

  return tickets.map((ticket) => {
    const displayName = getUserDisplayName(ticket.user);
    return {
      _id: ticket._id.toString(),
      subject: ticket.subject,
      userName: displayName,
      status: ticket.status,
      message: ticket.message,
      createdAt: ticket.createdAt,
    };
  });
}
