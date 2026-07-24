"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { AdminComment } from "@/features/comments/types/comment.types";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";
import Product from "@/lib/db/models/Product";

interface GetDoctorCommentsParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}

export async function getDoctorComments({
  page = 1,
  limit = 10,
  sort = "newest",
}: GetDoctorCommentsParams = {}): Promise<{
  comments: AdminComment[];
  total: number;
  totalPages: number;
}> {
  const { user } = await getMeAction();

  if (!user || user.role !== "plant-doctor") {
    throw new Error("Unauthorized: Only plant doctors can access this endpoint");
  }

  await connectToDB();

  const articles = await Article.find({ author: user._id })
    .select("_id")
    .lean();
  const articleIds = articles.map((a) => a._id.toString());

  const filter: any = {
    reply: { $exists: false }, 
    isApproved: true,
    $or: [
      { targetType: "products" },
      { targetType: "blog", targetId: { $in: articleIds } },
    ],
  };

  const sortOption = sort === "oldest" ? { date: 1 as const } : { date: -1 as const };
  const skip = (page - 1) * limit;

  const [comments, total] = await Promise.all([
    CommentModel.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    CommentModel.countDocuments(filter),
  ]);

  const productIds: string[] = [];
  const articleIdsForLookup: string[] = [];

  for (const c of comments) {
    if (c.targetType === "products" && c.targetId) {
      productIds.push(c.targetId);
    } else if (c.targetType === "blog" && c.targetId) {
      articleIdsForLookup.push(c.targetId);
    }
  }

  const validProductIds = productIds.filter((id): id is string => typeof id === 'string' && id.length > 0);
  const validArticleIds = articleIdsForLookup.filter((id): id is string => typeof id === 'string' && id.length > 0);

  const [products, articlesForLookup] = await Promise.all([
    validProductIds.length > 0
      ? Product.find({ _id: { $in: validProductIds } })
          .select("name slug category")
          .lean()
      : [],
    validArticleIds.length > 0
      ? Article.find({ _id: { $in: validArticleIds } })
          .select("title slug category")
          .lean()
      : [],
  ]);

  const productMap: Record<string, { name: string; slug: string; category: string }> = {};
  for (const p of products) {
    productMap[p._id.toString()] = { name: p.name, slug: p.slug, category: p.category };
  }

  const articleMap: Record<string, { title: string; slug: string; category: string }> = {};
  for (const a of articlesForLookup) {
    articleMap[a._id.toString()] = { title: a.title, slug: a.slug, category: a.category };
  }

  const result: AdminComment[] = [];

  for (const comment of comments) {
    let targetInfo = undefined;

    if (comment.targetType === "products" && comment.targetId) {
      const info = productMap[comment.targetId];
      if (info) {
        targetInfo = {
          name: info.name,
          slug: info.slug,
          category: info.category,
          url: `/products/${info.category}/${info.slug}`,
        };
      }
    } else if (comment.targetType === "blog" && comment.targetId) {
      const info = articleMap[comment.targetId];
      if (info) {
        targetInfo = {
          name: info.title,
          slug: info.slug,
          category: info.category,
          url: `/blog/${info.category}/${info.slug}`,
        };
      }
    }

    result.push({
      ...comment,
      _id: comment._id.toString(),
      targetInfo,
    });
  }

  return {
    comments: result,
    total,
    totalPages: Math.ceil(total / limit),
  };
}