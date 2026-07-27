"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { validateAndProcessImage } from "@/lib/utils/image-upload";
import { mkdir, readdir, unlink, writeFile } from "fs/promises";
import path from "path";

export async function uploadAvatarAction(formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) {
    return { success: false, message: "لطفاً یک عکس انتخاب کنید." };
  }

  try {
    const webpBuffer = await validateAndProcessImage(file);

    const timestamp = Date.now();
    const webpFileName = `avatar-${timestamp}.webp`;
    
    const userDir = path.join("public/uploads/users", user._id);
    await mkdir(userDir, { recursive: true });

    const existingFiles = await readdir(userDir).catch(() => []);
    for (const f of existingFiles) {
      if (f.startsWith("avatar-") && f.endsWith(".webp")) {
        await unlink(path.join(userDir, f));
      }
    }

    const filePath = path.join(userDir, webpFileName);
    await writeFile(filePath, webpBuffer);

    const avatarPath = `/uploads/users/${user._id}/${webpFileName}`;

    await connectToDB();
    await User.findByIdAndUpdate(user._id, { avatar: avatarPath });

    return {
      success: true,
      message: "عکس پروفایل با موفقیت آپدیت شد.",
      avatar: avatarPath,
    };
  } catch (error: any) {
    return { success: false, message: error.message || "خطا در آپلود" };
  }
}