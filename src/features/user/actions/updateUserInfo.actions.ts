"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import BaseUser from "@/lib/db/models/User";
import { z } from "zod";

const UpdateUserInfoSchema = z.object({
  userId: z.string().min(1, "شناسه کاربر الزامی است"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function updateUserInfo(formData: FormData) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
    };
  }

  const userId = formData.get("userId") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const result = UpdateUserInfoSchema.safeParse({
    userId,
    firstName,
    lastName,
  });
  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues[0]?.message || "اطلاعات وارد شده معتبر نیست.",
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
      message: "شما نمی‌توانید اطلاعات ادمین اصلی را ویرایش کنید.",
    };
  }

  const updateData: any = {};
  if (firstName !== undefined) {
    updateData.firstName = firstName;
  }
  if (lastName !== undefined) {
    updateData.lastName = lastName;
  }

  if (Object.keys(updateData).length === 0) {
    return {
      success: false,
      message: "هیچ تغییری اعمال نشد.",
    };
  }

  await BaseUser.findByIdAndUpdate(userId, updateData);

  return {
    success: true,
    message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد.",
  };
}
