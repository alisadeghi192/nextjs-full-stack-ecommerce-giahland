"use client";

import { AdminComment } from "@/types/comment.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DoctorCommentItem from "./DoctorCommentItem";

interface DoctorCommentsListProps {
  comments: AdminComment[];
  currentPage: number;
}

export default function DoctorCommentsList({
  comments,currentPage
}: DoctorCommentsListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (comments.length === 0 && currentPage > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(currentPage - 1));
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [comments.length, currentPage]);

  if (comments.length === 0) {
    return (
      <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
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
