"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import ContactMessage from "@/lib/db/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function markContactMessageAsRead(messageId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به این کار نیستید.",
    };
  }

  await connectToDB();

  const message = await ContactMessage.findById(messageId);
  if (!message) {
    return {
      success: false,
      message: "پیام یافت نشد.",
    };
  }

  message.isRead = !message.isRead;
  await message.save();

  revalidatePath("/admin/contact-messages");

  return {
    success: true,
    message: message.isRead
      ? "پیام به‌عنوان خوانده شده علامت‌گذاری شد."
      : "پیام به حالت خوانده نشده بازگردانده شد.",
  };
}