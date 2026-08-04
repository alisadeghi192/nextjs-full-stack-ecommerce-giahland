import { TICKET_DEPARTMENTS } from "@/lib/constants";
import { z } from "zod";

const isValidAttachment = (val: unknown): boolean => {
  if (typeof val === "string" && val.startsWith("data:image/")) return true;
  if (val === null || val === undefined) return true;
  if (val instanceof File) {
    if (val.size > 5 * 1024 * 1024) return false;
    if (!val.type.startsWith("image/")) return false;
    return val.size > 0;
  }
  return false;
};

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
    .refine(isValidAttachment, "فایل پیوست باید یک تصویر معتبر باشد."),
});

export type ITicketInput = z.infer<typeof TicketSchema>;