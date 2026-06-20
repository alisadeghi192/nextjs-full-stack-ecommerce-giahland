"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import {
  LastMessageInfo
} from "@/features/consultations/types/consultation.types";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";

export async function getUserConsultations() {
  const { user } = await getMeAction();
  if (!user) return [];

  await connectToDB();

  const filter =
    user.role === "plant-doctor" ? { doctor: user._id } : { user: user._id };

  const consultations = await Consultation.find(filter)
    .populate("user", "firstName lastName avatar")
    .populate("doctor", "firstName lastName avatar")
    .sort({ updatedAt: -1 })
    .lean();

  const isDoctor = user.role === "plant-doctor";

  const consultationIds = consultations.map((c) => c._id);
  const unreadCounts = await ConsultationMessage.aggregate([
    {
      $match: {
        consultationId: { $in: consultationIds },
        status: "sent",
        sender: { $ne: isDoctor ? "doctor" : "user" },
      },
    },
    {
      $group: {
        _id: "$consultationId",
        count: { $sum: 1 },
      },
    },
  ]);
  const unreadMap = new Map();
  unreadCounts.forEach((item) => {
    unreadMap.set(item._id.toString(), item.count);
  });

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
      code: c.code,
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
      unreadCount: unreadMap.get(c._id.toString()) || 0, 
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  });
}
