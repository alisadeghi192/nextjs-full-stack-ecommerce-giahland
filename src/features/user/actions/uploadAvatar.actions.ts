"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";

export async function uploadAvatarAction(base64Image: string) {
  const { user } = await getMeAction();
  if (!user) return { success: false, message: "لطفاً وارد شوید." };

  const sizeInBytes = (base64Image.length * 3) / 4;
  if (sizeInBytes > 5 * 1024 * 1024) {
    return { success: false, message: "حجم عکس نباید بیشتر از ۵ مگابایت باشد." };
  }

  await connectToDB();

  await User.findByIdAndUpdate(user._id, { avatar: base64Image });

  return { success: true, message: "عکس پروفایل با موفقیت آپدیت شد." };
}