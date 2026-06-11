import { TICKET_DEPARTMENTS } from "@/lib/constants/ticket";
import { z } from "zod";

export const TicketSchema = z.object({
  subject: z
    .string()
    .min(1, "موضوع الزامی است.")
    .min(3, "موضوع باید حداقل ۳ کاراکتر باشد.")
    .max(20, "موضوع نباید بیشتر از ۲۰ کاراکتر باشد."),

 department: z
    .union([z.string(), z.null()])
    .transform((val) => val || "")
    .refine((val) => val !== "", "انتخاب دپارتمان الزامی است.")
    .refine(
      (val) => TICKET_DEPARTMENTS.some((d) => d.value === val),
      "لطفاً دپارتمان معتبری را انتخاب کنید.",
    ),

  message: z
    .string()
    .min(1, "متن پیام الزامی است.")
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد.")
    .max(1000, "متن پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد."),

  attachment: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || file.size === 0) return true;
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      return allowedTypes.includes(file.type);
    }, "فایل پیوست باید از نوع JPEG، PNG یا WebP باشد.")
    .refine((file) => {
      if (!file || file.size === 0) return true;
      return file.size <= 4 * 1024 * 1024;
    }, "حجم فایل نباید بیشتر از ۴ مگابایت باشد."),
});

export type ITicketInput = z.infer<typeof TicketSchema>;
