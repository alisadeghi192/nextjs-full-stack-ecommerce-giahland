"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ArticleFormSchema } from "@/features/blog/schemas/article.schema";
import type { ContentBlock } from "@/features/blog/types/blog.types";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import sharp from "sharp";


export async function createArticleAction(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}> {
  const { user } = await getMeAction();
  if (!user || (user.role !== "plant-doctor" && user.role !== "admin")) {
    return {
      success: false,
      message: "شما مجاز به ایجاد مقاله نیستید.",
    };
  }

  const title = formData.get("title") as string;
  const slugInput = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const categoryRaw = formData.get("category") as string;
  const coverImageFile = formData.get("coverImage") as File | null;
  const mainImageFile = formData.get("mainImage") as File | null;
  const contentRaw = formData.get("content") as string;
  const seoTitle = formData.get("seoTitle") as string;
  const seoDescription = formData.get("seoDescription") as string;
  const seoKeywords = formData.get("seoKeywords") as string;

  let content: ContentBlock[] = [];
  try {
    content = contentRaw ? JSON.parse(contentRaw) : [];
  } catch {
    return {
      success: false,
      message: "فرمت محتوای مقاله نامعتبر است.",
    };
  }

  const validationData = {
    title,
    slug: slugInput,
    excerpt,
    category: categoryRaw,
    coverImage: coverImageFile,
    mainImage: mainImageFile,
    content,
    seo: {
      title: seoTitle || undefined,
      description: seoDescription || undefined,
      keywords: seoKeywords || undefined,
    },
  };

  const validationResult = ArticleFormSchema.safeParse(validationData);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const validatedData = validationResult.data;

  const category = validatedData.category as "care" | "health" | "styling";
  const slug = validatedData.slug;

  await connectToDB();

  const existingArticle = await Article.findOne({ slug });
  if (existingArticle) {
    return {
      success: false,
      errors: {
        slug: ["این اسلاگ قبلاً استفاده شده است. لطفاً اسلاگ دیگری وارد کنید."],
      },
    };
  }

  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/blog",
    category,
    slug
  );
  await mkdir(uploadDir, { recursive: true });

  const saveImageAsWebP = async (
    file: File | null,
    fileName: string
  ): Promise<string | null> => {
    if (!file || file.size === 0) return null;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
    
    const fullFileName = `${fileName}.webp`;
    const filePath = path.join(uploadDir, fullFileName);
    await writeFile(filePath, webpBuffer);
    
    return `/uploads/blog/${category}/${slug}/${fullFileName}`;
  };

  const coverImageUrl = await saveImageAsWebP(coverImageFile, "cover");
  const mainImageUrl = await saveImageAsWebP(mainImageFile, "main");

  let imageCounter = 1;
  const updatedContent: ContentBlock[] = [];

  for (const block of validatedData.content) {
    if (block.type === "image" && block.data.src) {
      const imageUrl = block.data.src;
      
      if (imageUrl.startsWith("data:image")) {
        const base64Data = imageUrl.split(",")[1];
        const buffer = Buffer.from(base64Data, "base64");
        
        const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
        const fileName = `${imageCounter}.webp`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, webpBuffer);
        const newUrl = `/uploads/blog/${category}/${slug}/${fileName}`;
        
        updatedContent.push({
          ...block,
          data: {
            ...block.data,
            src: newUrl,
          },
        });
        imageCounter++;
      } else {
        updatedContent.push(block);
      }
    } else {
      updatedContent.push(block);
    }
  }

  const seoData = validatedData.seo
    ? {
        title: validatedData.seo.title,
        description: validatedData.seo.description,
        keywords: validatedData.seo.keywords
          ? validatedData.seo.keywords
              .split(/[،,、\s]+/)
              .filter((k) => k.trim())
          : [],
        ogImage: coverImageUrl || undefined,
      }
    : undefined;

  await Article.create({
    title: validatedData.title,
    slug: slug,
    excerpt: validatedData.excerpt,
    category: category,
    coverImage: coverImageUrl || "",
    mainImage: mainImageUrl || coverImageUrl || "",
    author: user._id,
    content: updatedContent,
    seo: seoData,
    publishedAt: new Date(),
    views: 0,
  });

  revalidatePath("/user/articles");
  revalidatePath("/blog");

  return {
    success: true,
    message: "مقاله با موفقیت ثبت شد!",
  };
}