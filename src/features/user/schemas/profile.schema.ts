import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .max(10, "نام حداکثر ۱۰ کاراکتر می‌تواند باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),

  lastName: z
    .string()
    .max(12, "نام خانوادگی حداکثر ۱۲ کاراکتر می‌تواند باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),

  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "ایمیل معتبر نیست")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  address: z
    .string()
    .max(200, "آدرس حداکثر ۲۰۰ کاراکتر می‌تواند باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),

  postalCode: z
    .string()
    .regex(/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),
});

export const PlantDoctorProfileSchema = z.object({
  firstName: z
    .string()
    .max(10, "نام حداکثر ۱۰ کاراکتر می‌تواند باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),

  lastName: z
    .string()
    .max(12, "نام خانوادگی حداکثر ۱۲ کاراکتر می‌تواند باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),

  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "ایمیل معتبر نیست")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  specialties: z
    .string()
    .max(100, "تخصص حداکثر ۱۰۰ کاراکتر می‌تواند باشد")
    .or(z.literal(""))
    .optional()
    .nullable()
    .transform((val) => (val === "" || val === null ? null : val)),

  yearsOfExperience: z
    .preprocess((val) => {
      if (val === "" || val === null) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().min(0, "سال تجربه نمی‌تواند منفی باشد").max(50, "سال تجربه حداکثر ۵۰ سال می‌تواند باشد"))
    .optional(),

  consultationFee: z
    .preprocess((val) => {
      if (val === "" || val === null) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().min(0, "هزینه مشاوره نمی‌تواند منفی باشد").max(10000000, "هزینه مشاوره حداکثر ۱۰ میلیون تومان می‌تواند باشد"))
    .optional(),
});

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "رمز عبور فعلی الزامی است."),
    newPassword: z
      .string()
      .min(8, "رمز عبور جدید حداقل ۸ کاراکتر باید باشد.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد"
      ),
    confirmNewPassword: z.string().min(1, "تکرار رمز عبور الزامی است."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "رمز عبور جدید و تکرار آن مطابقت ندارند.",
    path: ["confirmNewPassword"],
  });

export type IProfileFormInput = z.infer<typeof ProfileFormSchema>;
export type IPlantDoctorProfileInput = z.infer<typeof PlantDoctorProfileSchema>;
export type IChangePasswordInput = z.infer<typeof ChangePasswordSchema>;