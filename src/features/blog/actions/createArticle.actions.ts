"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ArticleFormSchema } from "@/features/blog/schemas/article.schema";
import type { ContentBlock } from "@/features/blog/types/blog.types";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import { revalidateTag } from "next/cache";

export async function createArticleAction(
  prevState: any,
  formData: FormData,
): Promise<{
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}> {
  const { user } = await getMeAction();
  if (!user || (user.role !== "plant-doctor" && user.role !== "admin")) {
    return { success: false, message: "شما مجاز به ایجاد مقاله نیستید." };
  }

  const title = formData.get("title") as string;
  const slugInput = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const categoryRaw = formData.get("category") as string;
  const coverImage = formData.get("coverImage") as string; // Base64
  const mainImage = formData.get("mainImage") as string; // Base64
  const contentRaw = formData.get("content") as string;
  const seoTitle = formData.get("seoTitle") as string;
  const seoDescription = formData.get("seoDescription") as string;
  const seoKeywords = formData.get("seoKeywords") as string;

  let content: ContentBlock[] = [];
  try {
    content = contentRaw ? JSON.parse(contentRaw) : [];
  } catch {
    return { success: false, message: "فرمت محتوای مقاله نامعتبر است." };
  }

  const validationResult = ArticleFormSchema.safeParse({
    title,
    slug: slugInput,
    excerpt,
    category: categoryRaw,
    coverImage: coverImage || undefined,
    mainImage: mainImage || undefined,
    content,
    seo: {
      title: seoTitle || undefined,
      description: seoDescription || undefined,
      keywords: seoKeywords || undefined,
    },
  });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const validatedData = validationResult.data;
  const category = validatedData.category as "care" | "health" | "styling";

  await connectToDB();

  const existingArticle = await Article.findOne({ slug: validatedData.slug });
  if (existingArticle) {
    return {
      success: false,
      errors: {
        slug: ["این اسلاگ قبلاً استفاده شده است."],
      },
    };
  }

  const updatedContent = validatedData.content;

  const seoData = validatedData.seo
    ? {
        title: validatedData.seo.title,
        description: validatedData.seo.description,
        keywords: validatedData.seo.keywords
          ? validatedData.seo.keywords.split(/[،,、\s]+/).filter((k) => k.trim())
          : [],
        ogImage: coverImage || undefined,
      }
    : undefined;

  await Article.create({
    title: validatedData.title,
    slug: validatedData.slug,
    excerpt: validatedData.excerpt,
    category: category,
    coverImage: coverImage || "",
    mainImage: mainImage || coverImage || "",
    author: user._id,
    content: updatedContent,
    seo: seoData,
    publishedAt: new Date(),
    views: 0,
  });

  revalidateTag("home-articles");
  revalidateTag("admin-stats");
  revalidateTag("blog");
  return { success: true, message: "مقاله با موفقیت ثبت شد!" };
}