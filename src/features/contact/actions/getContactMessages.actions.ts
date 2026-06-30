"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import ContactMessage from "@/lib/db/models/ContactMessage";

interface GetContactMessagesParams {
  page?: number;
  limit?: number;
  status?: "all" | "read" | "unread";
  sort?: "newest" | "oldest";
}

export async function getContactMessages({
  page = 1,
  limit = 5,
  status = "all",
  sort = "newest",
}: GetContactMessagesParams = {}) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectToDB();

  const filter: any = {};
  if (status === "read") {
    filter.isRead = true;
  } else if (status === "unread") {
    filter.isRead = false;
  }

  const sortOption = sort === "oldest" ? "createdAt" : "-createdAt";
  const skip = (page - 1) * limit;

  const [messages, total] = await Promise.all([
    ContactMessage.find(filter)
      .sort(sortOption) 
      .skip(skip)
      .limit(limit)
      .lean(),
    ContactMessage.countDocuments(filter),
  ]);

  return {
    messages: messages.map((msg) => ({
      ...msg,
      _id: msg._id.toString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}