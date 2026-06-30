"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import {
  ITicket,
  PaginatedTickets,
  TicketFilters,
} from "@/features/tickets/types/ticket.types";
import { TicketDepartment } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Ticket from "@/lib/db/models/Ticket";
import { unlink } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import { TicketSchema } from "../schemas/ticket.schema";
import { uploadAttachment } from "../utils/uploadAttachment";

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
    department: department as TicketDepartment,
    message: message.trim(),
    attachment: attachmentUrl,
    status: "pending",
  });

  revalidatePath("/user/tickets");
  return { success: true, message: "تیکت با موفقیت ثبت شد." };
}

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
  filters: TicketFilters = {},
): Promise<PaginatedTickets> {
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

  return {
    success: true,
    message: "تیکت با موفقیت حذف شد.",
  };
}

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
