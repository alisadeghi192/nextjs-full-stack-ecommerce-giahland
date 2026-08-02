import SectionTitle from "@/components/panel/SectionTitle";
import { IDashboardComment } from "@/features/comments/types/comment.types";
import { toPersianDate } from "@/lib/utils/format";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
interface RecentCommentsProps {
  comments: IDashboardComment[];
}

export default function RecentComments({ comments }: RecentCommentsProps) {
  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 flex h-full flex-col rounded-xl border bg-white dark:bg-shade3 transition-colors p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="آخرین کامنت‌ها📃" className="mb-0!" />
        {comments.length > 0 && (
          <Link
            href="/admin/comments"
            className="text-primary dark:text-primary-dark dark:hover:text-primary hover:text-shade2 flex items-center justify-center text-sm"
          >
            <span className="">مشاهده همه</span>
            <MdKeyboardArrowLeft className="size-5" />
          </Link>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {comments.length === 0 ? (
          <p className="text-neutral9 dark:text-text-dark py-4 text-center">کامنتی وجود ندارد.</p>
        ) : (
          comments.map((comment: IDashboardComment) => (
            <div
              key={comment._id}
              className={` border-r-4 dark:shadow-shade6 max-xs:py-1 max-xs:px-2 rounded-2xl  p-3 shadow-lg transition max-sm:p-3 ${
                !comment.isApproved ? "border-yellow-400 dark:border-yellow-600 dark:bg-shade4 bg-yellow-50" : "dark:bg-teal-900 border-primary"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-x-2">
                  <span className="max-xs:text-sm max-w-1/2 truncate">
                    {comment.userName}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {!comment.isApproved && (
                      <span className="rounded-full bg-yellow-500 dark:bg-yellow-600 px-2 py-0.5 text-xs text-nowrap text-white">
                        در انتظار تایید
                      </span>
                    )}
                    {comment.isReadByAdmin && comment.isApproved && (
                      <span className="rounded-full bg-green-100 dark:bg-green-700 dark:text-green-100 px-2 py-0.5 text-xs text-nowrap text-green-700">
                        تایید شده
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-neutral9 dark:text-text-dark max-xs:text-xs text-sm">
                  {comment.createdAt && toPersianDate(comment.createdAt)}
                </div>
              </div>

              <p className="text-neutral10 dark:text-white mt-1 truncate text-sm">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
