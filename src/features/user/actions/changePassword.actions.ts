"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { ChangePasswordSchema } from "@/features/user/schemas/profile.schema";
import { verifyPassword, hashPassword } from "@/lib/auth/auth.helpers";

export async function changePasswordAction(prevState: any,formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const rawData = {
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  };

  const result = ChangePasswordSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  await connectToDB();

  const userFromDB = await User.findById(user._id);
  if (!userFromDB) return { success: false, message: "کاربر یافت نشد." };

  const isPasswordValid = await verifyPassword(result.data.oldPassword, userFromDB.password);
  if (!isPasswordValid) {
    return { success: false, errors: { oldPassword: ["رمز عبور فعلی اشتباه است."] } };
  }

  const hashedPassword = await hashPassword(result.data.newPassword);
  await User.findByIdAndUpdate(user._id, { password: hashedPassword });

  return { success: true, message: "رمز عبور با موفقیت تغییر کرد." };
}