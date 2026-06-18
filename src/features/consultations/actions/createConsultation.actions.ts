"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import { revalidatePath } from "next/cache";

export async function createConsultation(doctorId: string) {
  const { user } = await getMeAction();
  if (!user) {
    return { success: false, message: "لطفاً وارد شوید." };
  }

  if (user.role !== "user") {
    return {
      success: false,
      message: "فقط کاربران عادی می‌توانند مشاوره ثبت کنند.",
    };
  }

  await connectToDB();

  const consultation = await Consultation.create({
    user: user._id,
    doctor: doctorId,
    title: "مشاوره جدید",
    status: "active",
    lastMessage: "",
    lastMessageSender: "user",
    lastMessageStatus: "sent",
    lastMessageAt: undefined,
  });

  revalidatePath("/user/consultations/list");

  return {
    success: true,
    message: "مشاوره با موفقیت ثبت شد.",
    consultationId: consultation._id.toString(),
  };
}