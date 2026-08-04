"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const { user } = await getMeAction();
  if (!user) return { success: false, message: "لطفاً وارد شوید." };

  const consultationId = formData.get("consultationId") as string;
  const text = formData.get("text") as string;
  const imageBase64 = formData.get("imageBase64") as string | null;

  if (!text?.trim() && !imageBase64) {
    return { success: false, message: "متن یا عکس الزامی است." };
  }

  await connectToDB();

  const consultation = await Consultation.findById(consultationId);
  if (!consultation) return { success: false, message: "مشاوره یافت نشد." };
  if (consultation.status === "closed") {
    return { success: false, message: "این مشاوره به اتمام رسیده است." };
  }

  const sender = user.role === "plant-doctor" ? "doctor" : "user";

  const message = await ConsultationMessage.create({
    consultationId,
    sender,
    text: text?.trim() || "",
    image: imageBase64 || undefined,
    status: "sent",
    sentAt: new Date(),
  });

  const lastMessageText = text?.trim() || (imageBase64 ? "📷 تصویر" : "");
  const lastMessageSender = sender;

  await Consultation.findByIdAndUpdate(consultationId, {
    lastMessage: lastMessageText,
    lastMessageSender: lastMessageSender,
    lastMessageStatus: "sent",
    lastMessageAt: new Date(),
    status: "active",
  });

  revalidatePath("/user/consultations/list");

  return { success: true, messageId: message._id.toString() };
}