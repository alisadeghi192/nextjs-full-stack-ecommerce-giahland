"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ConsultationWithDetails } from "@/features/consultations/types/consultation.types";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import BaseUser, { PlantDoctor } from "@/lib/db/models/User";

export async function getConsultationById(
  consultationId: string,
): Promise<ConsultationWithDetails | null> {
  const { user } = await getMeAction();
  if (!user) return null;

  await connectToDB();

  const consultation = await Consultation.findById(consultationId).lean();
  if (!consultation) return null;

  if (
    consultation.user.toString() !== user._id &&
    consultation.doctor.toString() !== user._id &&
    user.role !== "admin"
  ) {
    return null;
  }

  const userInfo = await BaseUser.findById(consultation.user)
    .select("firstName lastName avatar")
    .lean();

  const doctorInfo = await PlantDoctor.findById(consultation.doctor)
    .select("firstName lastName avatar")
    .lean();

  let lastMessageData = undefined;
  if (consultation.lastMessage) {
    const isDoctor = user.role === "plant-doctor";
    const isSender = consultation.lastMessageSender === (isDoctor ? "doctor" : "user");
    const isSeen = consultation.lastMessageStatus === "seen";

    let displayStatus: "sent" | "seen" = "sent";
    if (isSender) {
      displayStatus = isSeen ? "seen" : "sent";
    } else {
      displayStatus = isSeen ? "seen" : "sent";
    }

    lastMessageData = {
      text: consultation.lastMessage,
      sender: consultation.lastMessageSender,
      status: displayStatus,
      createdAt: consultation.lastMessageAt || consultation.updatedAt,
    };
  }

  return {
    _id: consultation._id.toString(),
    user: {
      _id: consultation.user.toString(),
      firstName: userInfo?.firstName || "کاربر",
      lastName: userInfo?.lastName || "",
      avatar: userInfo?.avatar || "/static/images/default-user.webp",
    },
    doctor: {
      _id: consultation.doctor.toString(),
      firstName: doctorInfo?.firstName || "",
      lastName: doctorInfo?.lastName || "",
      avatar: doctorInfo?.avatar || "/static/images/default-user.webp",
    },
    title: consultation.title,
    status: consultation.status,
    lastMessage: lastMessageData,
    createdAt: consultation.createdAt,
    updatedAt: consultation.updatedAt,
  };
}