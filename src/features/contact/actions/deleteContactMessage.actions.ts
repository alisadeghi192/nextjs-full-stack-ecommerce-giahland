"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import ContactMessage from "@/lib/db/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function deleteContactMessage(messageId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به حذف این پیام نیستید.",
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

  await ContactMessage.findByIdAndDelete(messageId);

  revalidatePath("/admin/contact-messages");

  return {
    success: true,
    message: "پیام با موفقیت حذف شد.",
  };
}