"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";

export async function deleteAvatarAction() {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  await connectToDB();

  await User.findByIdAndUpdate(user._id, { avatar: DEFAULT_PROFILE_PIC });

  return { success: true, message: "عکس پروفایل با موفقیت حذف شد." };
}