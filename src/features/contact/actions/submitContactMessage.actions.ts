"use server";

import { ContactFormSchema } from "@/features/contact/schemas/contact.schema";
import connectToDB from "@/lib/db/connect";
import ContactMessage from "@/lib/db/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    mobile: formData.get("mobile"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    notRobot: formData.get("notRobot") === "on",
  };

  const result = ContactFormSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, mobile, subject, message } = result.data;

  await connectToDB();

  await ContactMessage.create({
    name,
    mobile,
    subject,
    message,
    isRead: false,
  });

  revalidatePath("/contact");

  return {
    success: true,
    message: "پیام شما با موفقیت ارسال شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.",
  };
}