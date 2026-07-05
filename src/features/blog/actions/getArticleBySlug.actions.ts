"use server";

import { BlogPostWithDetails } from "@/features/blog/types/blog.types";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import { notFound } from "next/navigation";
const CommentModel = require("@/lib/db/models/Comment").default;

export async function getArticleBySlug(
  slug: string,
): Promise<BlogPostWithDetails> {
  await connectToDB();

const article = await Article.findOne({ slug })
  .populate("author", "firstName lastName avatar role")
  .populate({
    path: "comments",
    match: { isApproved: true },
    populate: [
      {
        path: "user",
        select: "name avatar role",
      },
      {
        path: "reply.user",
        select: "name avatar role",
      },
    ],
  })
  .lean();

  if (!article) {
    notFound();
  }

  await Article.findByIdAndUpdate(article._id, {
    $inc: { views: 1 },
  });

  const author = article.author as any;

  return {
    _id: article._id.toString(),
    title: article.title,
    coverImage: article.coverImage,
    mainImage: article.mainImage,
    slug: article.slug,
    excerpt: article.excerpt,
    author: {
      _id: author._id.toString(),
      firstName: author.firstName || "",
      lastName: author.lastName || "",
      avatar: author.avatar || "/static/images/default-user.webp",
      role: author.role || "admin",
    },
    category: article.category,
    views: (article.views || 0) + 1,
    publishedAt: article.publishedAt,
    content: article.content || [],
    comments: (article.comments || []).map((comment: any) => ({
      _id: comment._id.toString(),
      user: {
        _id: comment.user?._id?.toString() || "",
        name: comment.user?.name || "",
        avatar: comment.user?.avatar || "/static/images/default-user.webp",
        role: comment.user?.role || "user",
      },
      text: comment.text,
      date: comment.date,
      reply: comment.reply
        ? {
            user: {
              _id: comment.reply.user?._id?.toString() || "",
              name: comment.reply.user?.name || "",
              avatar:
                comment.reply.user?.avatar ||
                "/static/images/default-user.webp",
              role: comment.reply.user?.role || "user",
            },
            text: comment.reply.text,
            date: comment.reply.date,
          }
        : undefined,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    })),
    seo: article.seo,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}
