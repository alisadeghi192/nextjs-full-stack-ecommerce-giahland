"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { CreateDoctorSchema } from "@/features/user/schemas/createDoctor.schema";
import { hashPassword } from "@/lib/auth/auth.helpers";
import connectToDB from "@/lib/db/connect";
import { PlantDoctor } from "@/lib/db/models/User";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createDoctor(formData: FormData) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما دسترسی به این بخش ندارید.",
    };
  }

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    mobile: formData.get("mobile"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    specialties: formData.get("specialties") || "",
    yearsOfExperience: Number(formData.get("yearsOfExperience")) || 0,
    consultationFee: Number(formData.get("consultationFee")) || 0,
  };

  const result = CreateDoctorSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await connectToDB();

  const existingUser = await PlantDoctor.findOne({
    $or: [{ mobile: result.data.mobile }, { email: result.data.email }],
  });
  if (existingUser) {
    return {
      success: false,
      message: "این شماره موبایل یا ایمیل قبلاً ثبت شده است.",
    };
  }

  const hashedPassword = await hashPassword(result.data.password);

  await PlantDoctor.create({
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    mobile: result.data.mobile,
    email: result.data.email,
    password: hashedPassword,
    role: "plant-doctor",
    specialties: result.data.specialties || "",
    yearsOfExperience: result.data.yearsOfExperience || 0,
    consultationFee: result.data.consultationFee || 0,
    successfulConsultations: 0,
    articles: [],
    consultations: [],
  });

  revalidatePath("/admin/users");
  revalidateTag("admin-stats");
  return {
    success: true,
    message: "پزشک با موفقیت ثبت شد.",
  };
}
