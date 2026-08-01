"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import { toPersianDate } from "@/lib/utils/format";

interface UserRecentCommentsProps {
  comments: {
    _id: string;
    text: string;
    isApproved?: boolean;
    createdAt?: Date;
  }[];
}

export default function UserRecentComments({
  comments,
}: UserRecentCommentsProps) {
  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 flex h-full flex-col rounded-xl border bg-white dark:bg-shade3 p-4 shadow-lg">
      <div className="mb-4"> 
        <SectionTitle title="آخرین کامنت‌ها📃" className="mb-0!" />
      </div>

      <div className="flex-1 space-y-2">
        {comments.length === 0 ? (
          <p className="text-neutral9 dark:text-text-dark py-4 text-center">کامنتی وجود ندارد.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className={`border-neutral3 dark:border-neutral10 dark:shadow-shade6 max-xs:py-1 max-xs:px-2 rounded-2xl border p-3 shadow-lg transition max-sm:p-3 ${
                !comment.isApproved ? "border-yellow-400 bg-yellow-50 dark:bg-teal-900" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-x-2">
                  <p className="line-clamp-1">{comment.text}</p>
                </div>

                <div className="flex items-center gap-x-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {!comment.isApproved && (
                      <span className="rounded-full bg-yellow-500 dark:bg-yellow-600 px-2 py-0.5 text-xs text-nowrap text-white">
                        در انتظار تایید
                      </span>
                    )}
                    {comment.isApproved && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-nowrap text-green-700 dark:text-green-100 dark:bg-green-700">
                        تایید شده
                      </span>
                    )}
                  </div>
                  <span className="text-neutral9 dark:text-text-dark max-xs:text-xs text-sm">
                    {comment.createdAt && toPersianDate(comment.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
