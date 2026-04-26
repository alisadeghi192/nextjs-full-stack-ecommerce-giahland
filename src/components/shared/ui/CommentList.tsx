"use client";

import { useState } from "react";
import CommentItem from "./CommentItem";
import { Comment } from "@/features/blog/types/blog.types";

const COMMENTS_PER_PAGE = 5;

interface CommentListProps {
  comments?: Comment[];
}

export default function CommentList({ comments = [] }: CommentListProps) {
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);
  const hasMore = visibleCount < comments.length;

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + COMMENTS_PER_PAGE, comments.length),
    );
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="text-neutral9 py-6 text-center">
        هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که نظر می‌دهید.
      </div>
    );
  }

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <div className="flex flex-col space-y-4 ">
      {visibleComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}

      {hasMore && (
        <button
          onClick={loadMore}
          className="text-primary hover:text-shade2 hover:border-shade2 border-primary mx-auto max-xs:text-base max-xs:w-full cursor-pointer rounded-xl border px-4 py-2 text-lg transition-colors"
        >
          نمایش بیشتر ({comments.length - visibleCount})
        </button>
      )}
    </div>
  );
}
