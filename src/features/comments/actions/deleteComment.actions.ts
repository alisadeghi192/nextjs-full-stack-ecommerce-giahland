"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Article from "@/lib/db/models/Article";
import CommentModel from "@/lib/db/models/Comment";
import Product from "@/lib/db/models/Product";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteComment(commentId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به حذف این کامنت نیستید.",
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

  const targetId = comment.targetId;
  const targetType = comment.targetType;

  await CommentModel.findByIdAndDelete(commentId);

  if (targetType === "products") {
    await Product.findByIdAndUpdate(targetId, {
      $pull: { comments: commentId },
    });
    revalidateTag("product");
  } else if (targetType === "blog") {
    await Article.findByIdAndUpdate(targetId, {
      $pull: { comments: commentId },
    });
    revalidateTag("article");
  }

  revalidatePath("/admin/comments");

  return {
    success: true,
    message: "کامنت با موفقیت حذف شد.",
  };
}
