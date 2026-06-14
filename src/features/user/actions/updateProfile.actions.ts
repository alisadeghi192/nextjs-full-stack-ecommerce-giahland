"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ProfileFormSchema } from "@/features/user/schemas/profile.schema";
import connectToDB from "@/lib/db/connect";
import BaseUser, { PlantDoctor, User } from "@/lib/db/models/User";

export async function updateProfileAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  await connectToDB();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const postalCode = formData.get("postalCode") as string;
  const address = formData.get("address") as string;

  const data: any = { firstName, lastName, email };
  if (user.role === "user") {
    data.postalCode = postalCode;
    data.address = address;
  }

  const result = ProfileFormSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  if (email && email !== (user.email || "")) {
    const emailExists = await BaseUser.findOne({
      email: email,
      _id: { $ne: user._id },
    });
    if (emailExists) {
      return { success: false, message: "این ایمیل قبلاً توسط کاربر دیگری ثبت شده است." };
    }
  }

  const isFirstNameSame = firstName === (user.firstName || "");
  const isLastNameSame = lastName === (user.lastName || "");
  const isEmailSame = email === (user.email || "");
  const isPostalCodeSame = postalCode === (user.postalCode || "");
  const isAddressSame = address === (user.address || "");

  const isSame =
    isFirstNameSame && isLastNameSame && isEmailSame &&
    (user.role !== "user" || (isPostalCodeSame && isAddressSame));

  if (isSame) {
    return { success: false, message: "تغییری در اطلاعات ایجاد نشده است." };
  }

  const doc = await BaseUser.findById(user._id);
  const updateData: any = {};

  if (!isFirstNameSame) updateData.firstName = firstName;
  if (!isLastNameSame) updateData.lastName = lastName;
  if (!isEmailSame) updateData.email = email;
  if (user.role === "user") {
    if (!isPostalCodeSame) updateData.postalCode = postalCode;
    if (!isAddressSame) updateData.address = address;
  }

  if (doc?.__t === "PlantDoctor") {
    await PlantDoctor.findByIdAndUpdate(user._id, updateData);
  } else if (doc?.__t === "User") {
    await User.findByIdAndUpdate(user._id, updateData);
  } else {
    await BaseUser.findByIdAndUpdate(user._id, updateData);
  }

  return { success: true, message: "اطلاعات با موفقیت به‌روزرسانی شد." };
}