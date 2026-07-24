"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { IAdminComment } from "@/features/comments/types/comment.types";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";
import Product from "@/lib/db/models/Product";

interface GetCommentsParams {
  page?: number;
  limit?: number;
  filter?: "all" | "approved" | "pending";
  sort?: "newest" | "oldest";
}

export async function getComments({
  page = 1,
  limit = 10,
  filter = "all",
  sort = "newest",
}: GetCommentsParams = {}): Promise<{
  comments: IAdminComment[];
  total: number;
  totalPages: number;
}> {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const filterQuery: any = {};
  if (filter === "approved") {
    filterQuery.isApproved = true;
  } else if (filter === "pending") {
    filterQuery.isApproved = false;
  }
  const sortOption =
    sort === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };

  const skip = (page - 1) * limit;

  await connectToDB();

  const [comments, total] = await Promise.all([
    CommentModel.find(filterQuery)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    CommentModel.countDocuments(filterQuery),
  ]);

  const productIds: string[] = [];
  const articleIds: string[] = [];

  for (const c of comments) {
    if (c.targetType === "products" && c.targetId) {
      productIds.push(c.targetId);
    } else if (c.targetType === "blog" && c.targetId) {
      articleIds.push(c.targetId);
    }
  }

  const [products, articles] = await Promise.all([
    productIds.length > 0
      ? Product.find({ _id: { $in: productIds } })
          .select("name slug category")
          .lean()
      : [],
    articleIds.length > 0
      ? Article.find({ _id: { $in: articleIds } })
          .select("title slug category")
          .lean()
      : [],
  ]);

  const productMap: Record<
    string,
    { name: string; slug: string; category: string }
  > = {};
  for (const p of products) {
    productMap[p._id.toString()] = {
      name: p.name,
      slug: p.slug,
      category: p.category,
    };
  }

  const articleMap: Record<
    string,
    { title: string; slug: string; category: string }
  > = {};
  for (const a of articles) {
    articleMap[a._id.toString()] = {
      title: a.title,
      slug: a.slug,
      category: a.category,
    };
  }

  const result: IAdminComment[] = [];

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
