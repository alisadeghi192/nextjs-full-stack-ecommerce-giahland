"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import CommentModel from "@/lib/db/models/Comment";
import { revalidatePath } from "next/cache";

interface ReplyDoctorCommentParams {
  commentId: string;
  replyText: string;
}

export async function replyDoctorComment({
  commentId,
  replyText,
}: ReplyDoctorCommentParams) {
  const { user } = await getMeAction();
  if (!user || user.role !== "plant-doctor") {
    return {
      success: false,
      message: "شما مجاز به پاسخ به این کامنت نیستید.",
    };
  }

  if (!commentId) {
    return { success: false, message: "شناسه کامنت الزامی است." };
  }
  if (!replyText || replyText.trim().length < 2) {
    return { success: false, message: "متن پاسخ حداقل ۲ کاراکتر باشد." };
  }

  await connectToDB();

  const comment = await CommentModel.findById(commentId);
  if (!comment) {
    return { success: false, message: "کامنت یافت نشد." };
  }

  if (comment.reply && comment.reply.text && comment.reply.user) {
    return { success: false, message: "این کامنت قبلاً پاسخ داده شده است." };
  }

  comment.reply = {
    user: {
      _id: user._id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "پزشک",
      avatar: user.avatar || "/static/images/default-user.webp",
      role: "plant-doctor",
    },
    text: replyText.trim(),
    date: new Date(),
  };

  await comment.save();

  revalidatePath("/user/comments");
  revalidatePath("/");

  return {
    success: true,
    message: "پاسخ شما با موفقیت ثبت شد.",
  };
}