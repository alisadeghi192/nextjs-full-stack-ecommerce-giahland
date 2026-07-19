"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import ContactMessage from "@/lib/db/models/ContactMessage";

export async function getRecentContactMessages(limit: number = 5) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return [];
  }

  await connectToDB();

  const messages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return messages.map((msg) => ({
    _id: msg._id.toString(),
    name: msg.name,
    mobile:msg.mobile,
    subject: msg.subject,
    message: msg.message,
    isRead: msg.isRead,
    createdAt: msg.createdAt,
    updatedAt:msg.updatedAt
  }));
}