"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { ProfileFormSchema } from "@/features/user/schemas/profile.schema";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    postalCode: formData.get("postalCode"),
    address: formData.get("address"),
  };

  const isSame =
    rawData.firstName === user.firstName &&
    rawData.lastName === user.lastName &&
    rawData.email === user.email &&
    rawData.postalCode === user.postalCode &&
    rawData.address === user.address;

  if (isSame) {
    return { success: false, message: "تغییری در اطلاعات ایجاد نشده است." };
  }

  const result = ProfileFormSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  await connectToDB();

  const updateData: any = {};
  if (result.data.firstName !== undefined)
    updateData.firstName = result.data.firstName || "";
  if (result.data.lastName !== undefined)
    updateData.lastName = result.data.lastName || "";
  if (result.data.email !== undefined)
    updateData.email = result.data.email || "";
  if (result.data.postalCode !== undefined)
    updateData.postalCode = result.data.postalCode || "";
  if (result.data.address !== undefined)
    updateData.address = result.data.address || "";

  await User.findByIdAndUpdate(user._id, updateData);

  revalidatePath("/user");

  return { success: true, message: "اطلاعات با موفقیت به‌روزرسانی شد." };
}
