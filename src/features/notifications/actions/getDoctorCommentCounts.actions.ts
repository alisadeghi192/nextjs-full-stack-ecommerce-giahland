"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";

export async function getDoctorCommentCounts() {
  const { user } = await getMeAction();

  if (!user || user.role !== "plant-doctor") {
    return { doctorComments: 0 };
  }

  await connectToDB();

  const myArticles = await Article.find({ author: user._id })
    .select("_id")
    .lean();
  const articleIds = myArticles.map((a) => a._id.toString());

  const count = await CommentModel.countDocuments({
    reply: { $exists: false },
    $or: [
      { targetType: "products" },
      { targetType: "blog", targetId: { $in: articleIds } },
    ],
  });

  return { doctorComments: count };
}