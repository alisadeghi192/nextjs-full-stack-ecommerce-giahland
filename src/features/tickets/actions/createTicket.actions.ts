"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { TicketSchema } from "@/features/tickets/schemas/ticket.schema";
import { TICKET_DEPARTMENT } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { revalidatePath } from "next/cache";

export async function createTicket(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const rawData = {
    subject: formData.get("subject") as string,
    department: formData.get("department") as string,
    message: formData.get("message") as string,
    attachment: formData.get("attachmentBase64") as string | null,
  };

  const result = TicketSchema.safeParse(rawData);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, message: firstError };
  }

  const { subject, department, message, attachment } = result.data;

  await connectToDB();

  await Ticket.create({
    user: user._id,
    subject: subject.trim(),
    department: department as TICKET_DEPARTMENT,
    message: message.trim(),
    attachment: attachment || "",
    status: "pending",
  });

  revalidatePath("/user/tickets");
  return { success: true, message: "تیکت با موفقیت ثبت شد." };
}