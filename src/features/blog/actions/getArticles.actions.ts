"use server";

import { BlogPostCard } from "@/features/blog/types/blog.types";
import { blogSortOptions, blogTabs } from "@/lib/constants/blog";
import { BLOG_POSTS_PER_PAGE } from "@/lib/constants/pagination";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";

type Category = typeof blogTabs[number]["id"];
type Sort = typeof blogSortOptions[number]["value"];

interface GetArticlesParams {
  category?: Category;
  sort?: Sort;
  page?: number;
  limit?: number;
}

export async function getArticles({
  category = "all",
  sort = "newest",
  page = 1,
  limit = BLOG_POSTS_PER_PAGE,
}: GetArticlesParams = {}) {
  await connectToDB();

  const filter: any = {};
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