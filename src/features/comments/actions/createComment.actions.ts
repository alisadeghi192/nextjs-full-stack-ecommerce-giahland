"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";
import Product from "@/lib/db/models/Product";
import { revalidatePath } from "next/cache";
import CommentSchema from "../schemas/comment.schema";



export async function createCommentAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();

  const targetType = (formData.get("targetType") as string) || "";
  const targetId = (formData.get("targetId") as string) || "";
  const targetSlug = (formData.get("targetSlug") as string) || "";
  const targetCategory = (formData.get("targetCategory") as string) || "";
  const name = (formData.get("name") as string) || "";
  const email = (formData.get("email") as string) || "";
  const text = (formData.get("text") as string) || "";

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
    avatar: user?.avatar || DEFAULT_PROFILE_PIC,
    role: user?.role || "user",
  };

  const newComment = await CommentModel.create({
    targetType: result.data.targetType,
    targetId: result.data.targetId,
    user: author,
    text: result.data.text,
    date: new Date(),
    isApproved: false,
    isReadByAdmin: false,
  });

  if (result.data.targetType === "products") {
    await Product.findByIdAndUpdate(result.data.targetId, {
      $push: { comments: newComment._id },
    });
  } else if (result.data.targetType === "blog") {
    await Article.findByIdAndUpdate(result.data.targetId, {
      $push: { comments: newComment._id },
    });
  }

  const revalidateUrl = `/${result.data.targetType}/${result.data.targetCategory}/${result.data.targetSlug}`;
  revalidatePath(revalidateUrl);

  return {
    success: true,
    message: "کامنت شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.",
  };
}
