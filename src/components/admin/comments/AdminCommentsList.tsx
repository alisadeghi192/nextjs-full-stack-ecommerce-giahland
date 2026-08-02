"use client";

import { IAdminComment } from "@/features/comments/types/comment.types";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AdminCommentItem from "./AdminCommentItem";
interface AdminCommentsListProps {
  comments: IAdminComment[];
}

export default function AdminCommentsList({
  comments,
}: AdminCommentsListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleAfterDelete = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = Number(searchParams.get("page")) || 1;

    if (comments.length === 1 && currentPage > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(currentPage - 1));
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  if (comments.length === 0) {
    return (
      <div className="border-neutral3 dark:border-neutral10 dark:bg-shade4 dark:shadow-shade6 rounded-2xl border p-6 text-center text-gray-500 shadow-lg dark:text-gray-50">
        هیچ کامنتی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <AdminCommentItem
          key={comment._id}
          comment={comment}
          isOpen={openId === comment._id}
          onToggle={() => toggleItem(comment._id)}
          onAfterDelete={handleAfterDelete}
        />
      ))}
    </div>
  );
}
