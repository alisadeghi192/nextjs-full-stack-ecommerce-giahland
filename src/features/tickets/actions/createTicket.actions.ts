import { getMeAction } from "@/features/auth/actions/me.actions";
import { TICKET_DEPARTMENT } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { revalidatePath } from "next/cache";
import { TicketSchema } from "../schemas/ticket.schema";
import { uploadAttachment } from "../utils/uploadAttachment";

export async function createTicket(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const rawData = {
    subject: formData.get("subject") as string,
    department: formData.get("department") as string,
    message: formData.get("message") as string,
    attachment: formData.get("attachment") as File | null,
  };

  const result = TicketSchema.safeParse(rawData);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, message: firstError };
  }

  const { subject, department, message, attachment } = result.data;

  await connectToDB();

  let attachmentUrl = "";
  if (attachment && attachment.size > 0) {
    attachmentUrl = await uploadAttachment(attachment);
  }

  await Ticket.create({
    user: user._id,
    subject: subject.trim(),
    department: department as TICKET_DEPARTMENT,
    message: message.trim(),
    attachment: attachmentUrl,
    status: "pending",
  });

  revalidatePath("/user/tickets");
  return { success: true, message: "تیکت با موفقیت ثبت شد." };
}