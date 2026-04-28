"use client";

import { useState } from "react";
import CommentItem from "./CommentItem";
import { Comment } from "@/features/blog/types/blog.types";
import OutlineButton from "./OutlineButton";
import { COMMENTS_PER_PAGE } from "@/lib/constants";


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
    <div className="flex flex-col space-y-4">
      {visibleComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}

      {hasMore && (
        <OutlineButton
          onClick={loadMore}
          className="max-xs:w-full  max-xs:text-base mx-auto px-4 py-2 text-lg"
        >
          نمایش بیشتر ({comments.length - visibleCount})
        </OutlineButton>
      )}
    </div>
  );
}
