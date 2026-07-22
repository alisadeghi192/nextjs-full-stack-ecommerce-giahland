"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { UpdateUserInfoSchema } from "@/features/user/schemas/updateUserInfo.schema";
import connectToDB from "@/lib/db/connect";
import BaseUser, { PlantDoctor } from "@/lib/db/models/User";
import { revalidatePath } from "next/cache";

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
  const specialties = formData.get("specialties") as string;
  const yearsOfExperience = formData.get("yearsOfExperience") as string;
  const consultationFee = formData.get("consultationFee") as string;

  const result = UpdateUserInfoSchema.safeParse({
    userId,
    firstName,
    lastName,
    specialties,
    yearsOfExperience,
    consultationFee,
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
  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;

  if (targetUser.role === "plant-doctor") {
    if (specialties !== undefined) updateData.specialties = specialties;
    if (yearsOfExperience !== undefined)
      updateData.yearsOfExperience = Number(yearsOfExperience);
    if (consultationFee !== undefined)
      updateData.consultationFee = Number(consultationFee);

    await PlantDoctor.findByIdAndUpdate(userId, updateData);
  } else {
    await BaseUser.findByIdAndUpdate(userId, updateData);
  }

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);

  return {
    success: true,
    message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد.",
  };
}
