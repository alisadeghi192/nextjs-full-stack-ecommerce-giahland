"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { unlink } from "fs/promises";
import path from "path";

export async function deleteAvatarAction() {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  if (user.avatar) {
    const filePath = path.join(process.cwd(), "public", user.avatar);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error("Failed to delete avatar file:", error);
    }
  }

  await connectToDB();
  await User.findByIdAndUpdate(user._id, { avatar: "/static/images/default-user.jpg" });

  return { success: true, message: "عکس پروفایل با موفقیت حذف شد." };
}
