"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";
import { UnreadCounts } from "../types/notification.types";

export async function getDoctorCommentCounts(): Promise<UnreadCounts> {
  const { user } = await getMeAction();
  if (!user || user.role !== "plant-doctor") {
    return { doctorComments: 0 };
  }

  await connectToDB();

  const articles = await Article.find({ author: user._id })
    .select("_id")
    .lean();
  const articleIds = articles.map((a) => a._id.toString());

  const doctorComments = await CommentModel.countDocuments({
    $or: [
      { targetType: "products" },
      { targetType: "blog", targetId: { $in: articleIds } },
    ],
    reply: { $exists: false },
    isApproved: true,
  });

  return { doctorComments };
}