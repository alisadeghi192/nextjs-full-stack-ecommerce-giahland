"use server";

import connectToDB from "@/lib/db/connect";
import { PlantDoctor } from "@/lib/db/models/User";
import { DoctorCardInfo } from "../types/consultation.types";

export async function getDoctors(): Promise<DoctorCardInfo[]> {
  await connectToDB();

  const doctors = await PlantDoctor.find({})
    .select("firstName lastName avatar specialties yearsOfExperience consultationFee successfulConsultations")
    .lean();

  return doctors.map((doctor) => ({
    _id: doctor._id.toString(),
    firstName: doctor.firstName || "",
    lastName: doctor.lastName || "",
    avatar: doctor.avatar || "/static/images/default-user.webp",
    specialties: doctor.specialties || "",
    yearsOfExperience: doctor.yearsOfExperience || 0,
    consultationFee: doctor.consultationFee || 0,
    successfulConsultations: doctor.successfulConsultations || 0,
  }));
}