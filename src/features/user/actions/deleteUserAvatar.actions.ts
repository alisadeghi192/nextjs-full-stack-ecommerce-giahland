"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import BaseUser from "@/lib/db/models/User";
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function deleteUserAvatar(userId: string) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
    };
  }

  if (!userId) {
    return {
      success: false,
      message: "شناسه کاربر معتبر نیست.",
    };
  }

  await connectToDB();

  const targetUser = await BaseUser.findById(userId);
  if (!targetUser) {
    return {
      success: false,
      message: "کاربر یافت نشد.",
    };
  }

  if (targetUser.isSuperAdmin) {
    return {
      success: false,
      message: "شما نمی‌توانید عکس ادمین اصلی را حذف کنید.",
    };
  }

  if (targetUser.avatar && !targetUser.avatar.includes("default-user.webp")) {
    const filePath = path.join(process.cwd(), "public", targetUser.avatar);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error("Failed to delete avatar:", error);
    }
  }

  await BaseUser.findByIdAndUpdate(userId, {
    avatar: DEFAULT_PROFILE_PIC,
  });

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${userId}`)

  return {
    success: true,
    message: "عکس پروفایل با موفقیت حذف شد.",
  };
}
