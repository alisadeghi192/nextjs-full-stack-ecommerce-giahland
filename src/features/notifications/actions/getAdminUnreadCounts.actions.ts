"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";
import ContactMessage from "@/lib/db/models/ContactMessage";
import Ticket from "@/lib/db/models/Ticket";

export async function getAdminUnreadCounts() {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return { adminTickets: 0, adminContact: 0, adminComments: 0 };
  }

  await connectToDB();

  const [adminTickets, adminContact, adminComments] = await Promise.all([
    Ticket.countDocuments({ status: "pending" }),
    ContactMessage.countDocuments({ isRead: false }),
    CommentModel.countDocuments({ isReadByAdmin: false }),
  ]);

  return {
    adminTickets,
    adminContact,
    adminComments,
  };
}