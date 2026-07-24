"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { BlogPostCard } from "@/features/blog/types/blog.types";
import { BLOG_SORT_OPTIONS, BLOG_TABS } from "@/lib/constants/blog";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";

type Category = typeof BLOG_TABS[number]["id"];
type Sort = typeof BLOG_SORT_OPTIONS[number]["value"];

interface GetArticlesByDoctorParams {
  category?: Category;
  sort?: Sort;
  page?: number;
  limit?: number;
}

export async function getArticlesByDoctor({
  category = "all",
  sort = "newest",
  page = 1,
  limit = 8,
}: GetArticlesByDoctorParams = {}) {
  const { user } = await getMeAction();

  if (!user || (user.role !== "plant-doctor" && user.role !== "admin")) {
    return { articles: [], total: 0, totalPages: 0, page: 1 };
  }

  await connectToDB();

  const filter: any = { author: user._id };

  if (category !== "all") {
    filter.category = category;
  }

  let sortOption: any = { publishedAt: -1 };
  if (sort === "oldest") {
    sortOption = { publishedAt: 1 };
  } else if (sort === "most_viewed") {
    sortOption = { views: -1 };
  }

  const skip = (page - 1) * limit;

  const [articles, total] = await Promise.all([
    Article.find(filter)
      .populate("author", "firstName lastName avatar")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    Article.countDocuments(filter),
  ]);

  return {
    articles: articles.map((article) => {
      const author = article.author as any;
      return {
        _id: article._id.toString(),
        title: article.title,
        coverImage: article.coverImage,
        slug: article.slug,
        excerpt: article.excerpt,
        author: {
          _id: author._id.toString(),
          firstName: author.firstName || "",
          lastName: author.lastName || "",
        },
        category: article.category,
        publishedAt: article.publishedAt,
      } as BlogPostCard;
    }),
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}