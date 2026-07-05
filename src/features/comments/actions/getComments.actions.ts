"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";

export async function getComments() {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectToDB();

  const comments = await CommentModel.find()
    .sort({ createdAt: -1 })
    .lean();

  return comments.map((comment) => ({
    ...comment,
    _id: comment._id.toString(),
  }));
}