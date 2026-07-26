"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { IConsultationWithDetails } from "@/features/consultations/types/consultation.types";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import BaseUser, { PlantDoctor } from "@/lib/db/models/User";

export async function getConsultationById(
  consultationId: string,
): Promise<IConsultationWithDetails | null> {
  const { user } = await getMeAction();
  if (!user) {
    return null;
  }

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
    .select("firstName lastName avatar consultationFee")
    .lean();

  let lastMessageData = undefined;
  if (consultation.lastMessage) {
    const displayStatus: "sent" | "seen" =
      consultation.lastMessageStatus === "seen" ? "seen" : "sent";

    lastMessageData = {
      text: consultation.lastMessage,
      sender: consultation.lastMessageSender,
      status: displayStatus,
      createdAt: consultation.lastMessageAt || consultation.updatedAt,
    };
  }

  return {
    _id: consultation._id.toString(),
    code: consultation.code,
    user: {
      _id: consultation.user.toString(),
      firstName: userInfo?.firstName || "کاربر",
      lastName: userInfo?.lastName || "",
      avatar: userInfo?.avatar || DEFAULT_PROFILE_PIC,
    },
    doctor: {
      _id: consultation.doctor.toString(),
      firstName: doctorInfo?.firstName || "",
      lastName: doctorInfo?.lastName || "",
      avatar: doctorInfo?.avatar || DEFAULT_PROFILE_PIC,
      consultationFee: doctorInfo?.consultationFee || 0,
    },
    title: consultation.title,
    status: consultation.status,
    lastMessage: lastMessageData,
    createdAt: consultation.createdAt,
    updatedAt: consultation.updatedAt,
  };
}
