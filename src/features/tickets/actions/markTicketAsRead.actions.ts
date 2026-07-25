import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { revalidatePath } from "next/cache";

export async function markTicketAsRead(ticketId: string) {
  const { user } = await getMeAction();

  if (!user || user.role === "admin") {
    return {
      success: false,
      message: "شما مجاز به این کار نیستید.",
    };
  }

  await connectToDB();

  const ticket = await Ticket.findOne({ _id: ticketId, user: user._id });
  if (!ticket) {
    return {
      success: false,
      message: "تیکت یافت نشد.",
    };
  }

  if (ticket.isReadByUser) {
    return {
      success: true,
      message: "قبلاً خوانده شده.",
    };
  }

  ticket.isReadByUser = true;
  await ticket.save();

  revalidatePath("/user/tickets");
  return {
    success: true,
    message: "تیکت به‌عنوان خوانده شده علامت‌گذاری شد.",
  };
}