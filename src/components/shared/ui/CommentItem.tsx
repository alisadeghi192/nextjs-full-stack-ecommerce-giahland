import { CommentAuthor } from "@/features/comments/types/comment.types";
import { DEFAULT_PROFILE_PIC, ROLE_CONFIG } from "@/lib/constants";
import { toPersianDate } from "@/lib/utils/format";
import Image from "next/image";

interface CommentItemProps {
  user: CommentAuthor;
  date: Date;
  text: string;
  reply?: {
    user: CommentAuthor;
    date: Date;
    text: string;
  };
}

export default function CommentItem({ user, date, text, reply }: CommentItemProps) {
  return (
    <div className="bg-neutral2 dark:bg-shade2 flex flex-col transition-colors rounded-xl p-6 shadow-lg dark:shadow-shade3">
      <div className="flex flex-col">
        <div className="border-neutral5 flex items-center gap-x-2 dark:border-neutral8 border-b pb-2">
          <div className="shrink-0">
            <Image
              src={user.avatar || DEFAULT_PROFILE_PIC}
              alt={user.name}
              width={44}
              height={44}
              className="size-11 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2.5">
              <span className="text-neutral10 dark:text-white transition-colors text-sm/5 font-bold">{user.name}</span>
              <span className={`h-5 rounded-md px-1 text-xs/5 font-medium ${ROLE_CONFIG[user.role].className}`}>
                {ROLE_CONFIG[user.role].label}
              </span>
            </div>
            <span className="text-neutral8 dark:text-primary-dark transition-colors text-xs">{toPersianDate(new Date(date))}</span>
          </div>
        </div>
        <p className="text-neutral9 dark:text-text-dark transition-colors pt-2 leading-5">{text}</p>
      </div>

      {reply && (
        <div className="bg-primary/10 dark:bg-shade3 transition-colors mt-4 flex flex-col rounded-xl p-6">
          <div className="flex flex-col">
            <div className="border-neutral5 flex items-center gap-x-2 dark:border-neutral8 border-b pb-2">
              <div className="shrink-0">
                <Image
                  src={reply.user.avatar || DEFAULT_PROFILE_PIC}
                  alt={reply.user.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2.5">
                  <span className="text-neutral10 dark:text-white transition-colors text-sm/5 font-bold">{reply.user.name}</span>
                  <span className={`h-5 rounded-md px-2 text-xs/5 font-medium ${ROLE_CONFIG[reply.user.role].className}`}>
                    {ROLE_CONFIG[reply.user.role].label}
                  </span>
                </div>
                <span className="text-neutral8 dark:text-primary-dark transition-colors text-xs">{toPersianDate(new Date(reply.date))}</span>
              </div>
            </div>
            <p className="text-neutral9 dark:text-text-dark transition-colors pt-2 leading-5">{reply.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}