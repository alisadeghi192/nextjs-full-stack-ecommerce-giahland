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

  if (user.role !== "user" && user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به ایجاد مشاوره جدید نیستید..",
    };
  }

  await connectToDB();

  const existingConsultation = await Consultation.findOne({
    user: user._id,
    doctor: doctorId,
    status: "active",
  });

  if (existingConsultation) {
    revalidatePath("/user/consultations/list");
    return {
      success: true,
      message: "شما قبلاً برای این پزشک مشاوره فعال دارید.",
      consultationId: existingConsultation._id.toString(),
      code: existingConsultation.code,
      redirect: `/user/consultations/${existingConsultation._id}`,
    };
  }

  const code = String(Date.now()).slice(-6);
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
