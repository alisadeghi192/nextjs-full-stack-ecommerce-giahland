"use client";

import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import { deleteContactMessage } from "@/features/contact/actions/deleteContactMessage.actions";
import { markContactMessageAsRead } from "@/features/contact/actions/markContactMessageAsRead.actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

interface ContactMessage {
  _id: string;
  name: string;
  mobile: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface AdminContactMessagesListProps {
  messages: ContactMessage[];
}

export default function AdminContactMessagesList({
  messages,
}: AdminContactMessagesListProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleToggleRead = async (id: string) => {
    setIsLoading(id);
    const result = await markContactMessageAsRead(id);
    if (result.success) {
      toast.success(result.message);
      window.location.reload();
    } else {
      toast.error(result.message);
    }
    setIsLoading(null);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(id);
    const result = await deleteContactMessage(id);
    if (result.success) {
      toast.success(result.message);
      window.location.reload();
    } else {
      toast.error(result.message);
    }
    setIsLoading(null);
  };

  if (messages.length === 0) {
    return (
      <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
        هیچ پیامی دریافت نشده است.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`border-neutral3 rounded-2xl border p-6 shadow-lg transition ${
            !msg.isRead ? "border-primary border-2 bg-primary/5" : ""
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold">{msg.subject}</span>
              <span className="text-neutral9 text-sm">|</span>
              <span className="text-sm">{msg.name}</span>
              <span className="text-neutral9 text-sm">|</span>
              <span className="text-sm text-gray-500">{msg.mobile}</span>
              {!msg.isRead && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                  جدید
                </span>
              )}
            </div>
            <div className="flex items-center ltr gap-2 text-sm text-gray-400">
              {new Date(msg.createdAt).toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute : "2-digit"
              })}
            </div>
          </div>

          <div className="mt-3 border-t pt-3">
            <p className="whitespace-pre-wrap text-gray-700">{msg.message}</p>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
            <button
              onClick={() => handleToggleRead(msg._id)}
              disabled={isLoading === msg._id}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition hover:bg-primary/10 disabled:opacity-50 ${
                msg.isRead ? "text-gray-500" : "text-primary"
              }`}
            >
              {msg.isRead ? (
                <>
                  <MdMarkEmailUnread size={18} />
                  <span>بازگردانی به نخوانده</span>
                </>
              ) : (
                <>
                  <MdMarkEmailRead size={18} />
                  <span>علامت‌گذاری به عنوان خوانده شده</span>
                </>
              )}
            </button>
            <ConfirmDialog
              onConfirm={() => handleDelete(msg._id)}
              disabled={isLoading === msg._id}
              title="آیا از حذف این پیام مطمئن هستید؟"
              confirmText="بله، حذف شود"
              cancelText="انصراف"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50"
            >
              <MdDelete size={18} />
              <span>حذف</span>
            </ConfirmDialog>
          </div>
        </div>
      ))}
    </div>
  );
}