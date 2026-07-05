"use client";

import { formatDate } from "@/lib/utils/format";
import { IComment } from "@/types/comment.types";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdCheck, MdDelete, MdReply } from "react-icons/md";

interface AdminCommentsListProps {
  comments: IComment[];
}

export default function AdminCommentsList({ comments }: AdminCommentsListProps) {
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("pending");

  const filteredComments = comments.filter((c) => {
    if (filter === "approved") return c.isApproved === true;
    if (filter === "pending") return c.isApproved === false;
    return true;
  });

  if (comments.length === 0) {
    return (
      <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
        هیچ کامنتی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* فیلتر */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "all" ? "bg-primary text-white" : "border hover:bg-gray-50"}`}
        >
          همه
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "pending" ? "bg-yellow-500 text-white" : "border hover:bg-gray-50"}`}
        >
          در انتظار تایید
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`rounded-lg px-4 py-2 text-sm ${filter === "approved" ? "bg-green-500 text-white" : "border hover:bg-gray-50"}`}
        >
          تایید شده
        </button>
      </div>

      {filteredComments.map((comment) => (
        <div
          key={comment._id}
          className={`border-neutral3 rounded-2xl border p-6 shadow-lg ${
            !comment.isApproved ? "border-yellow-400 bg-yellow-50" : ""
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold">{comment.user.name}</span>
              <span className="text-neutral9 text-sm">|</span>
              <span className="text-sm text-gray-500">
                {comment.targetType === "products" ? "محصول" : "مقاله"}
              </span>
              {!comment.isApproved && (
                <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-white">
                  در انتظار تایید
                </span>
              )}
            </div>
            <div className="ltr text-sm text-gray-400">
              {formatDate(new Date(comment.date))}
            </div>
          </div>

          <div className="mt-3 pt-3">
            <p className="whitespace-pre-wrap text-gray-700">{comment.text}</p>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 pt-3">
            {!comment.isApproved && (
              <button
                onClick={() => {
                  toast.success("کامنت تایید شد!");
                }}
                className="hover:bg-green/10 flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-green-600 transition"
              >
                <MdCheck size={18} />
                <span>تایید</span>
              </button>
            )}
            <button
              onClick={() => {
                toast.success("پاسخ به کامنت");
              }}
              className="hover:bg-primary/10 flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-primary transition"
            >
              <MdReply size={18} />
              <span>پاسخ</span>
            </button>
            <button
              onClick={() => {
                toast.success("کامنت حذف شد!");
              }}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-red-500 transition hover:bg-red-50"
            >
              <MdDelete size={18} />
              <span>حذف</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}