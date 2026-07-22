import SectionTitle from "@/components/panel/SectionTitle";
import { formatDate } from "@/lib/utils/format";
import { DashboardComment } from "@/types/comment.types";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
interface RecentCommentsProps {
  comments: DashboardComment[];
}

export default function RecentComments({ comments }: RecentCommentsProps) {
  return (
    <div className="border-neutral3 flex h-full flex-col rounded-xl border bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="آخرین کامنت‌ها📃" className="mb-0!" />
        {comments.length > 0 && (
          <Link
            href="/admin/comments"
            className="text-primary hover:text-shade2 *: flex items-center justify-center text-sm"
          >
            <span className="">مشاهده همه</span>
            <MdKeyboardArrowLeft className="size-5" />
          </Link>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {comments.length === 0 ? (
          <p className="text-neutral9 py-4 text-center">کامنتی وجود ندارد.</p>
        ) : (
          comments.map((comment: DashboardComment) => (
            <div
              key={comment._id}
              className={`border-neutral3 max-xs:py-1 max-xs:px-2 rounded-2xl border p-3 shadow-lg transition max-sm:p-3 ${
                !comment.isApproved ? "border-yellow-400 bg-yellow-50" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-x-2">
                  <span className="max-xs:text-sm max-w-1/2 truncate">
                    {comment.userName}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {!comment.isApproved && (
                      <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-nowrap text-white">
                        در انتظار تایید
                      </span>
                    )}
                    {comment.isReadByAdmin && comment.isApproved && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-nowrap text-green-700">
                        تایید شده
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-neutral9 max-xs:text-xs text-sm">
                  {comment.createdAt && formatDate(comment.createdAt)}
                </div>
              </div>

              <p className="text-neutral10 mt-1 truncate text-sm">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
