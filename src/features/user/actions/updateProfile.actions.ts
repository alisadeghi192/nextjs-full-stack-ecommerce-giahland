"use server";

import { revalidatePath } from "next/cache";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ProfileFormSchema } from "@/features/user/schemas/profile.schema";
import connectToDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";

export async function updateProfileAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  };

  const result = ProfileFormSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const updateData: any = {};
  if (result.data.firstName !== undefined) {
    updateData.firstName = result.data.firstName || "";
  }
  if (result.data.lastName !== undefined) {
    updateData.lastName = result.data.lastName || "";
  }
  if (result.data.email !== undefined) {
    updateData.email = result.data.email || "";
  }

  if (user.role === "user") {
    const postalCode = formData.get("postalCode");
    const address = formData.get("address");

    if (postalCode !== undefined) {
      updateData.postalCode = postalCode || "";
    }
    if (address !== undefined) {
      updateData.address = address || "";
    }
  }

  let isSame = false;
  if (user.role === "plant-doctor") {
    isSame =
      rawData.firstName === user.firstName &&
      rawData.lastName === user.lastName &&
      rawData.email === user.email;
  } else {
    isSame =
      rawData.firstName === user.firstName &&
      rawData.lastName === user.lastName &&
      rawData.email === user.email &&
      formData.get("postalCode") === (user as any).postalCode &&
      formData.get("address") === (user as any).address;
  }

  if (isSame) {
    return { success: false, message: "تغییری در اطلاعات ایجاد نشده است." };
  }

  await connectToDB();
  await User.findByIdAndUpdate(user._id, updateData);

  revalidatePath("/user");

  return { success: true, message: "اطلاعات با موفقیت به‌روزرسانی شد." };
}