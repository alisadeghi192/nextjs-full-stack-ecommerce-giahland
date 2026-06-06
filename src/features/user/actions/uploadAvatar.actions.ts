"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadAvatarAction(formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) {
    return { success: false, message: "لطفاً یک عکس انتخاب کنید." };
  }

  if (file.size > 2 * 1024 * 1024) {
    return { success: false, message: "حجم عکس نباید بیشتر از ۲ مگابایت باشد." };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, message: "فقط فرمت‌های JPG، PNG و WebP مجاز هستند." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join("public/uploads/users", user._id, "avatar.jpg");
  await writeFile(filePath, buffer);

  const avatarPath = `/uploads/users/${user._id}/avatar.jpg`;

  await connectToDB();
  await User.findByIdAndUpdate(user._id, { avatar: avatarPath });

  return {
    success: true,
    message: "عکس پروفایل با موفقیت آپدیت شد.",
    avatar: avatarPath,
  };
}