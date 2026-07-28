"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";
import { revalidatePath, revalidateTag } from "next/cache";

export async function approveComment(commentId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return { success: false, message: "شما مجاز به این کار نیستید." };
  }

  await connectToDB();

  const comment = await CommentModel.findById(commentId);
  if (!comment) {
    return { success: false, message: "کامنت یافت نشد." };
  }

  if (comment.isApproved) {
    return { success: false, message: "این کامنت قبلاً تایید شده است." };
  }

  comment.isApproved = true;
  comment.isReadByAdmin = true;
  await comment.save();

   if (comment.targetType === "products") {
    revalidateTag("product");
  } else if (comment.targetType === "blog") {
    revalidateTag("article");
  }

  revalidatePath("/admin/comments");
  revalidateTag("admin-stats");

  return { success: true, message: "کامنت با موفقیت تایید شد." };
}
