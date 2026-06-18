"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import {
  LastMessageInfo
} from "@/features/consultations/types/consultation.types";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";

export async function getUserConsultations() {
  const { user } = await getMeAction();
  if (!user) return [];

  await connectToDB();

  const filter = user.role === "plant-doctor" 
    ? { doctor: user._id } 
    : { user: user._id };

  const consultations = await Consultation.find(filter)
    .populate("user", "firstName lastName avatar")
    .populate("doctor", "firstName lastName avatar")
    .sort({ updatedAt: -1 })
    .lean();

  const isDoctor = user.role === "plant-doctor";

  return consultations.map((c: any) => {
    let lastMessageData: LastMessageInfo | undefined = undefined;

    if (c.lastMessage) {
      const sender = c.lastMessageSender || "user";
      const isSeen = c.lastMessageStatus === "seen";
      const isSender = sender === (isDoctor ? "doctor" : "user");

      let displayStatus: "sent" | "seen" = "sent";
      if (isSender) {
        displayStatus = isSeen ? "seen" : "sent";
      } else {
        displayStatus = isSeen ? "seen" : "sent";
      }

      lastMessageData = {
        text: c.lastMessage,
        sender: sender,
        status: displayStatus,
        createdAt: c.lastMessageAt || c.updatedAt,
      };
    }

    return {
      _id: c._id.toString(),
      user: {
        _id: c.user._id.toString(),
        firstName: c.user.firstName || "کاربر",
        lastName: c.user.lastName || "",
        avatar: c.user.avatar || "/static/images/default-user.webp",
      },
      doctor: {
        _id: c.doctor._id.toString(),
        firstName: c.doctor.firstName || "",
        lastName: c.doctor.lastName || "",
        avatar: c.doctor.avatar || "/static/images/default-user.webp",
      },
      title: c.title,
      status: c.status,
      lastMessage: lastMessageData,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  });
}