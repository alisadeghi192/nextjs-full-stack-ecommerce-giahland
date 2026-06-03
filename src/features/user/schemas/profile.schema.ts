import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .max(10, "نام حداکثر ۱۰ کاراکتر می‌تواند باشد")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  lastName: z
    .string()
    .max(12, "نام خانوادگی حداکثر ۱۲ کاراکتر می‌تواند باشد")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "ایمیل معتبر نیست")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  address: z
    .string()
    .max(200, "آدرس حداکثر ۲۰۰ کاراکتر می‌تواند باشد")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  postalCode: z
    .string()
    .regex(/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
});

export type IProfileFormInput = z.infer<typeof ProfileFormSchema>;

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "رمز عبور فعلی الزامی است."),
    newPassword: z
      .string()
      .min(8, "رمز عبور جدید حداقل ۸ کاراکتر باید باشد.")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 
        "رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد"),
    confirmNewPassword: z.string().min(1, "تکرار رمز عبور الزامی است."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "رمز عبور جدید و تکرار آن مطابقت ندارند.",
    path: ["confirmNewPassword"],
  });

export type IChangePasswordInput = z.infer<typeof ChangePasswordSchema>;