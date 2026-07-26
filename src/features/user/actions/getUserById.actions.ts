"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Comment from "@/lib/db/models/Comment";
import Order from "@/lib/db/models/Order";
import BaseUser from "@/lib/db/models/User";
import { Types } from "mongoose";

export async function getUserById(userId: string) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
      user: null,
      stats: null,
      recentOrders: [],
      recentComments: [],
    };
  }

  if (!userId) {
    return {
      success: false,
      message: "شناسه کاربر معتبر نیست.",
      user: null,
      stats: null,
      recentOrders: [],
      recentComments: [],
    };
  }

  await connectToDB();

  const targetUser = await BaseUser.findById(userId).select("-password").lean();

  if (!targetUser) {
    return {
      success: false,
      message: "کاربر یافت نشد.",
      user: null,
      stats: null,
      recentOrders: [],
      recentComments: [],
    };
  }

  const [ordersCount, totalSpent, commentsCount, recentOrders, recentComments] =
    await Promise.all([
      Order.countDocuments({ user: userId }),
      Order.aggregate([
        {
          $match: {
            user: new Types.ObjectId(userId),
            status: { $in: ["paid", "delivered"] },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$finalAmount" },
          },
        },
      ]),
      Comment.countDocuments({ "user._id": userId }),
      Order.find({ user: userId }).sort({ createdAt: -1 }).limit(5).lean(),
      Comment.find({ "user._id": userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

  const totalSpentAmount = totalSpent.length > 0 ? totalSpent[0].total : 0;

  const lastActivity =
    [...recentOrders, ...recentComments].sort(
      (a, b) =>
        new Date(b.createdAt as Date).getTime() -
        new Date(a.createdAt as Date).getTime(),
    )[0]?.createdAt || targetUser.createdAt;

  return {
    success: true,
    user: {
      _id: targetUser._id.toString(),
      firstName: targetUser.firstName || "",
      lastName: targetUser.lastName || "",
      mobile: targetUser.mobile,
      email: targetUser.email,
      role: targetUser.role,
      avatar: targetUser.avatar || DEFAULT_PROFILE_PIC,
      createdAt: targetUser.createdAt,
      updatedAt: targetUser.updatedAt,
      isSuperAdmin: targetUser.isSuperAdmin || false,
      ...(targetUser.role === "user" && {
        isBlocked: targetUser.isBlocked || false,
        postalCode: (targetUser as any).postalCode || "",
        address: (targetUser as any).address || "",
      }),
      ...(targetUser.role === "plant-doctor" && {
        specialties: (targetUser as any).specialties || "",
        yearsOfExperience: (targetUser as any).yearsOfExperience || 0,
        consultationFee: (targetUser as any).consultationFee || 0,
        successfulConsultations:
          (targetUser as any).successfulConsultations || 0,
      }),
    },
    stats: {
      ordersCount,
      totalSpent: totalSpentAmount,
      commentsCount,
      lastActivity,
    },
    recentOrders: recentOrders.map((order) => ({
      _id: order._id.toString(),
      trackingCode: order.trackingCode,
      finalAmount: order.finalAmount,
      status: order.status,
      createdAt: order.createdAt,
    })),
    recentComments: recentComments.map((comment) => ({
      _id: comment._id.toString(),
      text: comment.text,
      isApproved: comment.isApproved || false,
      createdAt: comment.createdAt || new Date(),
    })),
  };
}
