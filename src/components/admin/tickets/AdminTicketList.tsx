"use client";

import TicketItem from "@/components/features/tickets/TicketItem";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import TextareaField from "@/components/shared/ui/TextareaField";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import {
  deleteTicketAction,
  replyTicketAction,
} from "@/features/tickets/actions/admin.ticket.actions";
import { IAdminTicket } from "@/features/tickets/types/ticket.types";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";

interface AdminTicketListProps {
  tickets: IAdminTicket[];
}

export default function AdminTicketList({ tickets }: AdminTicketListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { refresh } = useAllNotifications();
  const router = useRouter();
  const pathname = usePathname();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleReplyChange = (ticketId: string, value: string) => {
    setReplies((prev) => ({ ...prev, [ticketId]: value }));
  };

  const handleReplySubmit = async (ticketId: string) => {
    const message = replies[ticketId]?.trim();
    if (!message) {
      toast.error("لطفاً متن پاسخ را وارد کنید.");
      return;
    }

    setIsSubmitting((prev) => ({ ...prev, [ticketId]: true }));

    const result = await replyTicketAction(ticketId, message);

    if (result.success) {
      toast.success(result.message);
      setReplies((prev) => ({ ...prev, [ticketId]: "" }));
      refresh();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting((prev) => ({ ...prev, [ticketId]: false }));
  };

  const handleDelete = async (ticketId: string) => {
    setDeletingId(ticketId);
    const result = await deleteTicketAction(ticketId);

    if (result.success) {
      toast.success(result.message);
      refresh();

      const searchParams = new URLSearchParams(window.location.search);
      const currentPage = Number(searchParams.get("page")) || 1;

      if (tickets.length === 1 && currentPage > 1) {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(currentPage - 1));
        router.push(`${pathname}?${params.toString()}`);
      }

      if (openId === ticketId) {
        setOpenId(null);
      }
    } else {
      toast.error(result.message);
    }
    setDeletingId(null);
  };

  const getUserDisplayName = (ticket: IAdminTicket) => {
    const firstName = ticket.user.firstName?.trim();
    const lastName = ticket.user.lastName?.trim();

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (firstName) {
      return firstName;
    }
    if (lastName) {
      return lastName;
    }
    return "کاربر";
  };

  const getUserLabel = (role: string) =>
    role === "plant-doctor" ? "پزشک" : "کاربر";

  if (tickets.length === 0) {
    return (
      <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
        هیچ تیکتی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => {
        const isOpen = openId === ticket._id;
        const isPending = ticket.status === "pending";
        const userLabel = getUserLabel(ticket.user.role);
        const userDisplayName = getUserDisplayName(ticket);
        return (
          <div
            key={ticket._id}
            className="border-neutral3 max-xs:p-2.5 relative rounded-2xl border p-3.5 shadow-lg"
          >
            <div className="text-neutral9 mb-2 flex items-center justify-between text-sm">
              <div className="max-xs:gap-1 flex flex-wrap items-center gap-2">
                <span className="text-primary font-medium max-sm:hidden">
                  {userLabel}:
                </span>
                <span>{userDisplayName}</span>
                <span className="text-gray-400">|</span>
                <span>{ticket.user.mobile}</span>
              </div>

              <ConfirmDialog
                onConfirm={() => handleDelete(ticket._id)}
                title="آیا از حذف این تیکت مطمئن هستید؟ این عملیات برگشت ناپذیر می باشد."
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                disabled={deletingId === ticket._id}
                className="bg-error hover:bg-bg-error hover:text-error flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-sm text-white transition disabled:opacity-50"
              >
                <MdDelete size={18} />
                <span className="max-sm:hidden">حذف</span>
              </ConfirmDialog>
            </div>

            <TicketItem
              ticket={
                {
                  ...ticket,
                  user: ticket.user._id,
                } as any
              }
              isOpen={isOpen}
              onToggle={() => toggleItem(ticket._id)}
            />

            <div
              className={`grid transition-all duration-300 ${
                isOpen && isPending
                  ? "mt-3 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-primary rounded-xl border border-dashed bg-white p-4 shadow-sm">
                  <TextareaField
                    icon={<MdDriveFileRenameOutline size={20} />}
                    id={`admin-reply-${ticket._id}`}
                    name={`admin-reply-${ticket._id}`}
                    label="پاسخ شما"
                    rows={3}
                    value={replies[ticket._id] || ""}
                    onChange={(e) =>
                      handleReplyChange(ticket._id, e.target.value)
                    }
                  />
                  <PrimaryButton
                    onClick={() => handleReplySubmit(ticket._id)}
                    disabled={isSubmitting[ticket._id]}
                    className="max-xs:w-full mt-3 h-12 w-50 justify-self-end"
                  >
                    {isSubmitting[ticket._id]
                      ? "در حال ارسال..."
                      : "ارسال پاسخ"}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
