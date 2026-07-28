"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import { rm, stat } from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import path from "path";

export async function deleteArticleAction(articleId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return { success: false, message: "شما مجاز به حذف مقاله نیستید." };
  }

  await connectToDB();

  const article = await Article.findById(articleId);
  if (!article) {
    return { success: false, message: "مقاله یافت نشد." };
  }

  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/blog",
    article.category,
    article.slug,
  );

  const staticDir = path.join(
    process.cwd(),
    "public/static/images/blog",
    article.category,
    article.slug,
  );

  const deleteFolderIfExists = async (folderPath: string) => {
    try {
      await stat(folderPath);
      await rm(folderPath, { recursive: true, force: true });
      console.log(`✅ پوشه حذف شد: ${folderPath}`);
    } catch {
      console.log(`ℹ️ پوشه یافت نشد: ${folderPath}`);
    }
  };

  await Promise.all([
    deleteFolderIfExists(uploadDir),
    deleteFolderIfExists(staticDir),
  ]);

  await Article.findByIdAndDelete(articleId);

  revalidatePath("/admin/articles");
  revalidatePath("/user/articles");
  revalidatePath("/blog");
  revalidateTag("home-articles");
  revalidateTag("admin-stats");
  return {
    success: true,
    message: "مقاله و تمام فایل‌های آن با موفقیت حذف شد.",
  };
}
