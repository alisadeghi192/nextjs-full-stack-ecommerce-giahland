"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import { User } from "@/lib/db/models/User";
import { revalidatePath } from "next/cache";

export async function toggleUserBlock(userId: string) {
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

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return {
      success: false,
      message: "کاربر یافت نشد.",
    };
  }

  if (targetUser.role !== "user") {
    return {
      success: false,
      message: "فقط کاربران عادی قابل مسدود شدن هستند.",
    };
  }

  if (targetUser.isSuperAdmin) {
    return {
      success: false,
      message: "شما نمی‌توانید ادمین اصلی را مسدود کنید.",
    };
  }

  if (targetUser._id.toString() === user._id) {
    return {
      success: false,
      message: "شما نمی‌توانید خودتان را مسدود کنید.",
    };
  }

  const newStatus = !targetUser.isBlocked;
  await User.findByIdAndUpdate(userId, {
    isBlocked: newStatus,
  });

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${userId}`)

  return {
    success: true,
    message: newStatus
      ? "کاربر با موفقیت مسدود شد."
      : "مسدودیت کاربر با موفقیت برداشته شد.",
  };
}