"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function sendMessage(formData: FormData) {
  const { user } = await getMeAction();
  if (!user) return { success: false, message: "لطفاً وارد شوید." };

  const consultationId = formData.get("consultationId") as string;
  const text = formData.get("text") as string;
  const imageFile = formData.get("image") as File | null;

  if (!text?.trim() && !imageFile) {
    return { success: false, message: "متن یا عکس الزامی است." };
  }

  await connectToDB();

  const consultation = await Consultation.findById(consultationId);
  if (!consultation) return { success: false, message: "مشاوره یافت نشد." };

  if (consultation.status === "closed") {
    return { success: false, message: "این مشاوره به اتمام رسیده است." };
  }

  if (
    consultation.user.toString() !== user._id &&
    consultation.doctor.toString() !== user._id
  ) {
    return { success: false, message: "شما به این مشاوره دسترسی ندارید." };
  }

  let imageUrl: string | undefined = undefined;
  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: "حجم عکس نباید بیشتر از ۵ مگابایت باشد.",
      };
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const ext = imageFile.name.split(".").pop() || "jpg";
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const uploadDir = path.join("public/uploads/consultations", consultationId);
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    imageUrl = `/uploads/consultations/${consultationId}/${fileName}`;
  }

  const sender = user.role === "plant-doctor" ? "doctor" : "user";

  const message = await ConsultationMessage.create({
    consultationId,
    sender,
    text: text?.trim() || "",
    image: imageUrl,
    status: "sent",
    sentAt: new Date(),
  });

  const lastMessageText =  `💬 ${text?.trim()}` || (imageUrl ? "📷 تصویر" : "");
  const lastMessageSender = sender;
  const lastMessageStatus = "sent";

  await Consultation.findByIdAndUpdate(consultationId, {
    lastMessage: lastMessageText,
    lastMessageSender: lastMessageSender,
    lastMessageStatus: lastMessageStatus,
    lastMessageAt: new Date(),
    status: "active",
  });

  revalidatePath("/user/consultations/list");

  return { success: true, messageId: message._id.toString() };
}
