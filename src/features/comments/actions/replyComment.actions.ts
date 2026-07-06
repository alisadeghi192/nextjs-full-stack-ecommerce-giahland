"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";
import { revalidatePath } from "next/cache";

export async function replyComment(commentId: string, replyText: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return { success: false, message: "شما مجاز به این کار نیستید." };
  }

  if (!replyText || replyText.trim().length < 2) {
    return { success: false, message: "متن پاسخ حداقل ۲ کاراکتر باشد." };
  }

  await connectToDB();

  const comment = await CommentModel.findById(commentId);
  if (!comment) {
    return { success: false, message: "کامنت یافت نشد." };
  }

  comment.reply = {
    user: {
      _id: user._id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "ادمین",
      avatar: user.avatar || "/static/images/default-user.webp",
      role: user.role,
    },
    text: replyText.trim(),
    date: new Date(),
  };

  comment.isApproved = true;
  comment.isReadByAdmin = true;

  await comment.save();

  revalidatePath("/admin/comments");

  return {
    success: true,
    message: "پاسخ شما با موفقیت ثبت شد و کامنت تایید شد.",
  };
}