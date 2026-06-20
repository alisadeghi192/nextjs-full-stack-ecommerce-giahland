"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import { randomInt } from "crypto";
import { revalidatePath } from "next/cache";

async function generateUniqueCode(): Promise<string> {
  let code: string;
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    const num = randomInt(0, 10000);
    code = String(num).padStart(4, "0");
    const existing = await Consultation.findOne({ code });
    if (!existing) return code;
    attempts++;
  }

  throw new Error("Unable to generate unique consultation code");
}

export async function createConsultation(doctorId: string) {
  const { user } = await getMeAction();
  if (!user) {
    return { success: false, message: "لطفاً وارد شوید." };
  }

  if (user.role !== "user" && user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به ایجاد مشاوره جدید نیستید..",
    };
  }

  await connectToDB();
  const code = await generateUniqueCode();
  const consultation = await Consultation.create({
    user: user._id,
    doctor: doctorId,
    code,
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
    code: consultation.code,
  };
}
