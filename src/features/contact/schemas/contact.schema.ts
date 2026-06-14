import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(100, "نام و نام خانوادگی حداکثر ۱۰۰ کاراکتر می‌تواند باشد"),

  mobile: z
    .string()
    .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),

  subject: z
    .string()
    .min(3, "موضوع باید حداقل ۳ کاراکتر باشد")
    .max(200, "موضوع حداکثر ۲۰۰ کاراکتر می‌تواند باشد"),

  message: z
    .string()
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(5000, "متن پیام حداکثر ۵۰۰۰ کاراکتر می‌تواند باشد"),

  notRobot: z.boolean().refine((val) => val === true, {
    message: "لطفاً تأیید کنید که ربات نیستید",
  }),
});

export type IContactFormInput = z.infer<typeof ContactFormSchema>;