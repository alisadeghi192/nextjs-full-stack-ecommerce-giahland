"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import { User } from "@/lib/db/models/User";

interface GetAllConsultationsParams {
  status?: "all" | "active" | "closed";
  search?: string;
  page?: number;
  limit?: number;
}

export async function getAllConsultations({
  status = "all",
  search = "",
  page = 1,
  limit = 10,
}: GetAllConsultationsParams = {}) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
      consultations: [],
      total: 0,
      totalPages: 0,
    };
  }

  await connectToDB();

  const filter: any = {};

  if (status !== "all") {
    filter.status = status;
  }

  if (search.trim()) {
    const users = await User.find({
      $or: [
        { firstName: { $regex: search.trim(), $options: "i" } },
        { lastName: { $regex: search.trim(), $options: "i" } },
      ],
    }).select("_id");

    const userIds = users.map((u) => u._id);

    filter.$or = [
      { code: { $regex: search.trim(), $options: "i" } },
      { user: { $in: userIds } },
      { doctor: { $in: userIds } },
    ];
  }

  const skip = (page - 1) * limit;

  const [consultations, total] = await Promise.all([
    Consultation.find(filter)
      .populate("user", "firstName lastName avatar")
      .populate("doctor", "firstName lastName avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Consultation.countDocuments(filter),
  ]);

  return {
    success: true,
    consultations: consultations.map((c) => ({
      _id: c._id.toString(),
      code: c.code,
      user: {
        _id: (c.user as any)._id.toString(),
        firstName: (c.user as any).firstName || "",
        lastName: (c.user as any).lastName || "",
        avatar: (c.user as any).avatar || "/static/images/default-user.webp",
      },
      doctor: {
        _id: (c.doctor as any)._id.toString(),
        firstName: (c.doctor as any).firstName || "",
        lastName: (c.doctor as any).lastName || "",
        avatar: (c.doctor as any).avatar || "/static/images/default-user.webp",
      },
      status: c.status,
      lastMessage: c.lastMessage,
      lastMessageAt: c.lastMessageAt,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}