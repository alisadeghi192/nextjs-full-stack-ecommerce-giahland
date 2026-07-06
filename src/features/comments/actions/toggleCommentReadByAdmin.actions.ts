"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";
import { revalidatePath } from "next/cache";

export async function toggleCommentReadByAdmin(commentId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به این کار نیستید.",
    };
  }

  await connectToDB();

  const comment = await CommentModel.findById(commentId);
  if (!comment) {
    return {
      success: false,
      message: "کامنت یافت نشد.",
    };
  }

  comment.isReadByAdmin = !comment.isReadByAdmin;
  await comment.save();

  revalidatePath("/admin/comments");
  return {
    success: true,
    message: comment.isReadByAdmin
      ? "کامنت به‌عنوان خوانده شده علامت‌گذاری شد."
      : "کامنت به حالت خوانده نشده بازگردانده شد.",
  };
}