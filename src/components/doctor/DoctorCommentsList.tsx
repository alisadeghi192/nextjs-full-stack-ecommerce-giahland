"use client";

import { IAdminComment } from "@/features/comments/types/comment.types";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import { useEffect, useState } from "react";
import DoctorCommentItem from "./DoctorCommentItem";

interface DoctorCommentsListProps {
  comments: IAdminComment[];
  currentPage: number;
}

export default function DoctorCommentsList({
  comments,
  currentPage,
}: DoctorCommentsListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { get, set } = useUrlParams();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (comments.length === 0 && currentPage > 1) {
      set("page", String(currentPage - 1));
    }
  }, [comments.length, currentPage]);

  if (comments.length === 0) {
    return (
      <div className="border-neutral3 dark:border-neutral10 dark:bg-shade4 dark:shadow-shade6 rounded-2xl border p-6 text-center text-gray-500 dark:text-gray-50 shadow-lg">
        هیچ کامنتی برای پاسخ‌گویی وجود ندارد.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <DoctorCommentItem
          key={comment._id}
          comment={comment}
          isOpen={openId === comment._id}
          onToggle={() => toggleItem(comment._id)}
        />
      ))}
    </div>
  );
}
