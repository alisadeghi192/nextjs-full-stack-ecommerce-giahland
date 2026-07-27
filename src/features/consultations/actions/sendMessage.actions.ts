"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";
import { getWebPFileName, validateAndProcessImage } from "@/lib/utils/image-upload";
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

  let imageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
    try {
      const webpBuffer = await validateAndProcessImage(imageFile);
      const webpFileName = getWebPFileName(imageFile.name);

      const uploadDir = path.join("public/uploads/consultations", consultationId);
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, webpFileName);
      await writeFile(filePath, webpBuffer);

      imageUrl = `/uploads/consultations/${consultationId}/${webpFileName}`;
    } catch (error: any) {
      return { success: false, message: error.message || "خطا در ذخیره تصویر" };
    }
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

  const lastMessageText = text?.trim() || (imageUrl ? "📷 تصویر" : "");
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