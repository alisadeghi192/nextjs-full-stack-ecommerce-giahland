"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Consultation from "@/lib/db/models/Consultation";
import { PlantDoctor } from "@/lib/db/models/User";
import { revalidatePath } from "next/cache";

export async function closeConsultation(consultationId: string) {
  const { user } = await getMeAction();
  if (!user) {
    return { success: false, message: "لطفاً وارد شوید." };
  }

  await connectToDB();

  const consultation = await Consultation.findById(consultationId);
  if (!consultation) {
    return { success: false, message: "مشاوره یافت نشد." };
  }

  if (consultation.doctor.toString() !== user._id && user.role !== "admin") {
    return { success: false, message: "شما مجاز به بستن این مشاوره نیستید." };
  }

  if (consultation.status === "closed") {
    return { success: false, message: "این مشاوره قبلاً بسته شده است." };
  }

  await Consultation.findByIdAndUpdate(consultationId, {
    status: "closed",
  });

  await PlantDoctor.findByIdAndUpdate(consultation.doctor, {
    $inc: { successfulConsultations: 1 },
  });

  revalidatePath("/user/consultations/list");
  revalidatePath(`/user/consultations/${consultationId}`);
  revalidatePath("/admin/consultations");

  return {
    success: true,
    message: "مشاوره با موفقیت بسته شد.",
  };
}
