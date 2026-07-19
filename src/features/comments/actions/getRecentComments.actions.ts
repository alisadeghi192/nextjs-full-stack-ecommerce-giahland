"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";

export async function getRecentComments(limit: number = 5) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return [];
  }

  await connectToDB();

  const comments = await CommentModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return comments.map((comment) => ({
    _id: comment._id.toString(),
    text: comment.text,
    userName: comment.user?.name || "کاربر",
    isReadByAdmin:comment.isReadByAdmin,
    isApproved: comment.isApproved,
    createdAt: comment.createdAt,
  }));
}