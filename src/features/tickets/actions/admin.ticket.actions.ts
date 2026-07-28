"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import {
  IPaginatedTickets,
  ITicketFilters,
} from "@/features/tickets/types/ticket.types";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { unlink } from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import path from "path";

export async function replyTicketAction(ticketId: string, message: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به پاسخ به تیکت نیستید.",
    };
  }

  if (!message || message.trim().length < 3) {
    return {
      success: false,
      message: "متن پاسخ باید حداقل ۳ کاراکتر باشد.",
    };
  }

  await connectToDB();

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return {
      success: false,
      message: "تیکت یافت نشد.",
    };
  }

  if (ticket.status === "answered") {
    return {
      success: false,
      message: "این تیکت قبلاً پاسخ داده شده است.",
    };
  }

  ticket.adminReply = {
    message: message.trim(),
    createdAt: new Date(),
  };
  ticket.status = "answered";
  ticket.isReadByUser = false;

  await ticket.save();

  revalidatePath("/admin/tickets");
  return {
    success: true,
    message: "پاسخ با موفقیت ارسال شد.",
  };
}

export async function getAllTickets(
  page: number = 1,
  limit: number = 10,
  filters: ITicketFilters = {},
): Promise<IPaginatedTickets> {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: Only admin can view all tickets");
  }

  await connectToDB();

  const skip = (page - 1) * limit;

  const pipeline: any[] = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ];

  if (filters.role) {
    pipeline.push({
      $match: { "user.role": filters.role },
    });
  }

  if (filters.status) {
    pipeline.push({
      $match: { status: filters.status },
    });
  }

  if (filters.department) {
    pipeline.push({
      $match: { department: filters.department },
    });
  }

  const sortField = filters.sort === "oldest" ? 1 : -1;
  pipeline.push({ $sort: { createdAt: sortField } });

  const countPipeline = [...pipeline];

  const countResult = await Ticket.aggregate([
    ...countPipeline,
    { $count: "total" },
  ]);
  const total = countResult.length > 0 ? countResult[0].total : 0;

  const tickets = await Ticket.aggregate([
    ...pipeline,
    { $skip: skip },
    { $limit: limit },
  ]);

  const formattedTickets = tickets.map((ticket: any) => ({
    _id: ticket._id.toString(),
    subject: ticket.subject,
    department: ticket.department,
    message: ticket.message,
    attachment: ticket.attachment || undefined,
    status: ticket.status,
    adminReply: ticket.adminReply
      ? {
          message: ticket.adminReply.message,
          createdAt: ticket.adminReply.createdAt,
        }
      : undefined,
    isReadByUser: ticket.isReadByUser,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    user: {
      _id: ticket.user._id.toString(),
      firstName: ticket.user.firstName || "",
      lastName: ticket.user.lastName || "",
      mobile: ticket.user.mobile || "",
      role: ticket.user.role || "user",
    },
  }));

  return {
    tickets: formattedTickets,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function deleteTicketAction(ticketId: string) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به حذف تیکت نیستید.",
    };
  }

  await connectToDB();

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return {
      success: false,
      message: "تیکت یافت نشد.",
    };
  }

  if (ticket.attachment) {
    try {
      const filePath = path.join(process.cwd(), "public", ticket.attachment);
      await unlink(filePath);
    } catch (error) {
      console.error("خطا در حذف فایل پیوست:", error);
    }
  }

  await Ticket.findByIdAndDelete(ticketId);

  revalidatePath("/admin/tickets");
  revalidatePath("/user/tickets");
  revalidateTag("admin-recent-tickets");
  return {
    success: true,
    message: "تیکت با موفقیت حذف شد.",
  };
}
