"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";

export async function markMessagesAsSeen(consultationId: string) {
  const { user } = await getMeAction();
  if (!user) return { success: false, message: "لطفاً وارد شوید." };

  await connectToDB();

  const consultation = await Consultation.findById(consultationId);
  if (!consultation) return { success: false, message: "مشاوره یافت نشد." };

  const viewer = user.role === "plant-doctor" ? "doctor" : "user";
  const sender = viewer === "user" ? "doctor" : "user";

  const result = await ConsultationMessage.updateMany(
    {
      consultationId,
      sender: sender,
      status: "sent",
    },
    {
      $set: {
        status: "seen",
        seenAt: new Date(),
      },
    }
  );

  if (result.modifiedCount > 0) {
    await Consultation.findByIdAndUpdate(consultationId, {
      lastMessageStatus: "seen",
    });
  }

  return {
    success: true,
    message: "پیام‌ها به‌عنوان دیده شده علامت‌گذاری شدند.",
    modifiedCount: result.modifiedCount,
  };
}