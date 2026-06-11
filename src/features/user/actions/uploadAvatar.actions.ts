"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { mkdir, readdir, unlink, writeFile } from "fs/promises";
import path from "path";

export async function uploadAvatarAction(formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) {
    return { success: false, message: "لطفاً یک عکس انتخاب کنید." };
  }

  if (file.size > 4 * 1024 * 1024) {
    return { success: false, message: "حجم عکس نباید بیشتر از ۴ مگابایت باشد." };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, message: "فقط فرمت‌های JPG، PNG و WebP مجاز هستند." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const userDir = path.join("public/uploads/users", user._id);
  await mkdir(userDir, { recursive: true });

  const existingFiles = await readdir(userDir).catch(() => []);
  for (const f of existingFiles) {
    if (f.includes("avatar")) {
      await unlink(path.join(userDir, f));
    }
  }

  const fileName = `${Date.now()}-avatar.jpg`;
  const filePath = path.join(userDir, fileName);
  await writeFile(filePath, buffer);

  const avatarPath = `/uploads/users/${user._id}/${fileName}`;

  await connectToDB();
  await User.findByIdAndUpdate(user._id, { avatar: avatarPath });

  return {
    success: true,
    message: "عکس پروفایل با موفقیت آپدیت شد.",
    avatar: avatarPath,
  };
}