"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ILastMessageInfo } from "@/features/consultations/types/consultation.types";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import ConsultationMessage from "@/lib/db/models/ConsultationMessage";

interface GetUserConsultationsParams {
  sort?: "newest" | "oldest";
  search?: string;
  page?: number;
  limit?: number;
}

export async function getUserConsultations({
  sort = "newest",
  search = "",
  page = 1,
  limit = 6,
}: GetUserConsultationsParams = {}) {
  const { user } = await getMeAction();
  if (!user) {
    return { consultations: [], total: 0, totalPages: 0, page: 1 };
  }

  await connectToDB();

  const isDoctor = user.role === "plant-doctor";
  const filter: any = isDoctor ? { doctor: user._id } : { user: user._id };

  if (search) {
    filter.code = { $regex: search, $options: "i" };
  }

  const sortOption =
    sort === "newest" ? { createdAt: -1 as any } : { createdAt: 1 as any };

  const skip = (page - 1) * limit;

  const [consultations, total] = await Promise.all([
    Consultation.find(filter)
      .populate("user", "firstName lastName avatar")
      .populate("doctor", "firstName lastName avatar")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    Consultation.countDocuments(filter),
  ]);

  const consultationIds = consultations.map((c) => c._id);
  const IUnreadCounts = await ConsultationMessage.aggregate([
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

  const unreadMap = Object.fromEntries(
    IUnreadCounts.map((item) => [item._id.toString(), item.count]),
  );

  const formatted = consultations.map((c: any) => {
    let lastMessageData: ILastMessageInfo | undefined = undefined;

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
        avatar: c.user.avatar || DEFAULT_PROFILE_PIC,
      },
      doctor: {
        _id: c.doctor._id.toString(),
        firstName: c.doctor.firstName || "",
        lastName: c.doctor.lastName || "",
        avatar: c.doctor.avatar || DEFAULT_PROFILE_PIC,
      },
      title: c.title,
      status: c.status,
      lastMessage: lastMessageData,
      unreadCount: unreadMap[c._id.toString()] || 0,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  });

  return {
    consultations: formatted,
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}
