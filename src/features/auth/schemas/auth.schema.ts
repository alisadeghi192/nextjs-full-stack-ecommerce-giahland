// src/features/auth/schemas/auth.schema.ts
import { z } from "zod";

const mobileRegex = /^09[0-9]{9}$/;
const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const RegisterSchema = z.object({
  mobile: z
    .string()
    .regex(mobileRegex, "شماره موبایل معتبر نیست. (مثال: 09123456789)"),

  email: z
    .string()
    .regex(emailRegex, "ایمیل معتبر نیست. (مثال: name@example.com)"),

  password: z
    .string()
    .min(8, "رمز عبور حداقل ۸ کاراکتر باید باشد.")
    .regex(passwordRegex, "رمز عبور باید شامل حرف بزرگ، حرف کوچک و عدد باشد."),

  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تکرار آن مطابقت ندارند.",
  path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  mobile: z
    .string()
    .regex(mobileRegex, "شماره موبایل معتبر نیست. (مثال: 09123456789)"),
  password: z.string().min(1, "رمز عبور الزامی است."),
});


export type IRegisterInput = z.infer<typeof RegisterSchema>;
export type ILoginInput = z.infer<typeof LoginSchema>;