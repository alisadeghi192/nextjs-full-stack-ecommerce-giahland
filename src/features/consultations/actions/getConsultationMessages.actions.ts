"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ConsultationMessageWithDetails } from "@/features/consultations/types/consultation.types";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";

export async function getConsultationMessages(
  consultationId: string,
): Promise<ConsultationMessageWithDetails[]> {
  const { user } = await getMeAction();
  if (!user) return [];

  await connectToDB();

  const consultation = await Consultation.findById(consultationId).lean();
  if (!consultation) return [];

  if (
    consultation.user.toString() !== user._id &&
    consultation.doctor.toString() !== user._id &&
    user.role !== "admin"
  ) {
    return [];
  }

  const messages = await ConsultationMessage.find({ consultationId })
    .sort({ createdAt: 1 })
    .lean();

  return messages.map((msg) => ({
    _id: msg._id.toString(),
    consultationId: msg.consultationId.toString(),
    sender: msg.sender,
    text: msg.text,
    image: msg.image,
    status: msg.status,
    sentAt: msg.sentAt,
    seenAt: msg.seenAt,
    createdAt: msg.createdAt,
    updatedAt: msg.updatedAt,
  }));
}