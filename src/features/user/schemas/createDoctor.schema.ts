import { z } from "zod";

export const CreateDoctorSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "نام الزامی است.")
      .max(10, "نام حداکثر ۱۰ کاراکتر است."),
    lastName: z
      .string()
      .min(1, "نام خانوادگی الزامی است.")
      .max(12, "نام خانوادگی حداکثر ۱۲ کاراکتر است."),
    mobile: z
      .string()
      .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
    email: z.string().email("ایمیل معتبر نیست."),
    password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر است."),
    confirmPassword: z.string(),
    specialties: z.string().min(1, "تخصص الزامی است."),
    yearsOfExperience: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ message: "سال‌های تجربه باید عدد باشد." }).min(0, "سال‌های تجربه نمی‌تواند منفی باشد.")
    ),
    consultationFee: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number({ message: "هزینه مشاوره باید عدد باشد." }).min(0, "هزینه مشاوره نمی‌تواند منفی باشد.")
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند.",
    path: ["confirmPassword"],
  });

export type CreateDoctorInput = z.infer<typeof CreateDoctorSchema>;