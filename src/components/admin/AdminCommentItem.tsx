"use client";

import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import TextareaField from "@/components/shared/ui/TextareaField";
import { approveComment } from "@/features/comments/actions/approveComment.actions";
import { deleteComment } from "@/features/comments/actions/deleteComment.actions";
import { replyComment } from "@/features/comments/actions/replyComment.actions";
import { toggleCommentReadByAdmin } from "@/features/comments/actions/toggleCommentReadByAdmin.actions";
import { AdminComment } from "@/features/comments/types/comment.types";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    MdCheck,
    MdDelete,
    MdDriveFileRenameOutline,
    MdKeyboardArrowDown,
    MdMarkEmailRead,
    MdMarkEmailUnread,
    MdReply,
} from "react-icons/md";

interface AdminCommentItemProps {
  comment: AdminComment;
  isOpen: boolean;
  onToggle: () => void;
  onAfterDelete?: () => void;
}

export default function AdminCommentItem({
  comment,
  isOpen,
  onToggle,
  onAfterDelete,
}: AdminCommentItemProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useAllNotifications();

  const handleToggleRead = async () => {
    setIsLoading(true);
    const result = await toggleCommentReadByAdmin(comment._id);
    if (result.success) {
      toast.success(result.message);
      refresh();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleApprove = async () => {
    setIsLoading(true);
    const result = await approveComment(comment._id);
    if (result.success) {
      toast.success(result.message);
      refresh();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) {
      toast.error("لطفاً متن پاسخ را وارد کنید.");
      return;
    }

    setIsLoading(true);
    const result = await replyComment(comment._id, replyText);
    if (result.success) {
      toast.success(result.message);
      setReplyText("");
      setIsReplyOpen(false);
      refresh();
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteComment(comment._id);
    if (result.success) {
      toast.success(result.message);
      refresh();
      if (onAfterDelete) {
        onAfterDelete();
      }
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`border-neutral3 rounded-2xl border p-6 shadow-lg transition max-sm:p-3 ${
        !comment.isApproved ? "border-yellow-400 bg-yellow-50" : ""
      }`}
    >
      <div
        className="flex cursor-pointer items-start justify-between gap-2"
        onClick={onToggle}
      >
        <div className="flex flex-wrap items-center gap-3">
          {comment.targetInfo ? (
            <Link
              href={comment.targetInfo.url}
              className="text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm font-medium">
                {comment.targetInfo.name.length > 20
                  ? comment.targetInfo.name.slice(0, 20) + "..."
                  : comment.targetInfo.name}
              </span>
            </Link>
          ) : (
            <span className="text-sm text-gray-400">
              {comment.targetType === "products" ? "محصول" : "مقاله"}
            </span>
          )}
          {!comment.isApproved && (
            <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-white">
              در انتظار تایید
            </span>
          )}
          {comment.isReadByAdmin && comment.isApproved && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
              تایید شده
            </span>
          )}
          {comment.reply && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              پاسخ داده شده
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <MdKeyboardArrowDown
            className={`size-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="custom-scroll border-primary bg-neutral2 flex h-30 w-full flex-col overflow-y-auto rounded-lg border-r-4 px-3 py-4">
            <div className="flex items-center justify-between max-md:items-start">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-bold">
                  {comment.user.name}
                </span>
                <span className="text-gray-400">|</span>
                <div className="ltr text-sm text-gray-400">
                  {new Date(
                    comment.createdAt || comment.date || new Date(),
                  ).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
            <p className="text-neutral10 mt-1 whitespace-pre-wrap max-md:text-sm">
              {comment.text}
            </p>
          </div>

          {comment.reply && (
            <div className="border-primary mt-3 h-30 rounded-xl border-r-4 bg-[#E3F7EA] p-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-bold">
                  {comment.reply.user.name}
                </span>
                <span className="text-gray-400">|</span>
                <span className="ltr text-gray-400">
                  {new Date(comment.reply.date).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.reply.text}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2 pt-3 max-[550px]:justify-between">
            {!comment.isApproved && (
              <div className="flex items-center gap-2 max-[550px]:flex-col max-[550px]:items-start">
                <button
                  onClick={handleToggleRead}
                  disabled={isLoading}
                  className={`hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition disabled:opacity-50 ${
                    comment.isReadByAdmin ? "text-gray-500" : "text-primary"
                  }`}
                >
                  {comment.isReadByAdmin ? (
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

                <button
                  onClick={handleApprove}
                  disabled={isLoading}
                  className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-green-600 transition hover:bg-green-50 disabled:opacity-50"
                >
                  <MdCheck size={18} />
                  <span>تایید</span>
                </button>
              </div>
            )}
            <div
              className={`flex items-center gap-2 ${!comment.isApproved ? "max-[550px]:flex-col max-[550px]:items-start" : "max-[550px]:mr-auto"} `}
            >
              <button
                onClick={() => setIsReplyOpen((prev) => !prev)}
                className="text-primary hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition"
              >
                <MdReply size={18} />
                <span>{comment.reply ? "پاسخ جدید" : "پاسخ"}</span>
              </button>

              <ConfirmDialog
                onConfirm={handleDelete}
                disabled={isLoading}
                title="آیا از حذف این کامنت مطمئن هستید؟"
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                className="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50"
              >
                <MdDelete size={18} />
                <span>حذف</span>
              </ConfirmDialog>
            </div>
          </div>

          <div
            className={`grid transition-all duration-300 ${
              isReplyOpen
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-primary max-xs:p-3 rounded-xl border border-dashed bg-white p-4">
                <TextareaField
                  icon={<MdDriveFileRenameOutline size={20} />}
                  id={`admin-reply-${comment._id}`}
                  name={`admin-reply-${comment._id}`}
                  label="پاسخ شما"
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={isLoading}
                />
                <PrimaryButton
                  onClick={handleReplySubmit}
                  disabled={isLoading || !replyText.trim()}
                  className="max-xs:w-full mt-3 h-12 w-50 justify-self-end"
                >
                  {isLoading ? "در حال ارسال..." : "ارسال پاسخ"}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
