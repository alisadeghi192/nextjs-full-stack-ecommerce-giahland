"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import BaseUser from "@/lib/db/models/User";
import AdminProfileSchema from "../schemas/adminProfile.schema";



export async function updateAdminProfileAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;

  const result = AdminProfileSchema.safeParse({ firstName, lastName, email });
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await connectToDB();

  const updateData: any = {};
  if (result.data.firstName !== undefined && result.data.firstName !== user.firstName) {
    updateData.firstName = result.data.firstName;
  }
  if (result.data.lastName !== undefined && result.data.lastName !== user.lastName) {
    updateData.lastName = result.data.lastName;
  }
  if (result.data.email !== undefined && result.data.email !== user.email) {
    const emailExists = await BaseUser.findOne({
      email: result.data.email,
      _id: { $ne: user._id },
    });
    if (emailExists) {
      return {
        success: false,
        message: "این ایمیل قبلاً توسط کاربر دیگری ثبت شده است.",
      };
    }
    updateData.email = result.data.email;
  }

  if (Object.keys(updateData).length === 0) {
    return {
      success: false,
      message: "تغییری در اطلاعات ایجاد نشده است.",
    };
  }

  await BaseUser.findByIdAndUpdate(user._id, updateData);

  return {
    success: true,
    message: "اطلاعات با موفقیت به‌روزرسانی شد.",
  };
}