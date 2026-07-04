"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CommentSchema = z.object({
  targetType: z.enum(["product", "blog"]),
  targetId: z.string().min(1, "شناسه هدف الزامی است."),
  targetSlug: z.string().min(1, "اسلاگ هدف الزامی است."),
  targetCategory: z.string().min(1, "دسته‌بندی هدف الزامی است."),
  name: z.string().min(2, "نام حداقل ۲ کاراکتر است.").max(50),
  email: z.string().email("ایمیل معتبر نیست.").optional().nullable(),
  text: z.string().min(3, "متن کامنت حداقل ۳ کاراکتر است.").max(1000),
});

export async function createCommentAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();

  const targetType = formData.get("targetType") as "product" | "blog";
  const targetId = formData.get("targetId") as string;
  const targetSlug = formData.get("targetSlug") as string;
  const targetCategory = formData.get("targetCategory") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const text = formData.get("text") as string;

  const result = CommentSchema.safeParse({
    targetType,
    targetId,
    targetSlug,
    targetCategory,
    name,
    email,
    text,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await connectToDB();

  const author = {
    _id: user?._id || `guest_${Date.now()}`,
    name: result.data.name,
    avatar: user?.avatar || "/static/images/default-user.webp",
    role: user?.role || "user",
  };

  await CommentModel.create({
    targetType: result.data.targetType,
    targetId: result.data.targetId,
    user: author,
    text: result.data.text,
    date: new Date(),
    isApproved: false,
    isReadByAdmin: false,
  });

  // ✅ فقط صفحه جزئیات رو revalidate کن
  const revalidateUrl = `/${result.data.targetType}/${result.data.targetCategory}/${result.data.targetSlug}`;
  revalidatePath(revalidateUrl);

  return {
    success: true,
    message: "کامنت شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.",
  };
}