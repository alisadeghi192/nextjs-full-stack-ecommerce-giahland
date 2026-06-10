"use server";

import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { ITicket } from "@/features/tickets/types/ticket.types";
import { revalidatePath } from "next/cache";
import { TicketDepartment } from "@/lib/constants";

export async function getUserTickets(): Promise<ITicket[]> {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  await connectToDB();
  const tickets = await Ticket.find({ user: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return tickets.map((ticket) => ({
    ...ticket,
    _id: ticket._id.toString(),
    user: ticket.user.toString(),
  })) as ITicket[];
}

export async function getTicketById(id: string): Promise<ITicket | null> {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  await connectToDB();
  const ticket = await Ticket.findOne({ _id: id, user: user._id }).lean();
  if (!ticket) return null;

  return {
    ...ticket,
    _id: ticket._id.toString(),
    user: ticket.user.toString(),
  } as ITicket;
}

export async function createTicket(formData: FormData) {
  const { user } = await getMeAction();
  if (!user) throw new Error("Unauthorized");

  const subject = formData.get("subject") as string;
  const department = formData.get("department") as TicketDepartment;
  const message = formData.get("message") as string;

  if (!subject || !department || !message) {
    return { success: false, message: "لطفاً تمام فیلدهای الزامی را پر کنید." };
  }

  await connectToDB();

  await Ticket.create({
    user: user._id,
    subject,
    department,
    message,
    status: "pending",
  });

  revalidatePath("/user/tickets");
  return { success: true, message: "تیکت با موفقیت ثبت شد." };
}
