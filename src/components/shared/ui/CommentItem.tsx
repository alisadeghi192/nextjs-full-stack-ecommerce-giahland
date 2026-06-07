import Image from "next/image";
import { formatDate } from "@/lib/utils/format";
import { roleConfig } from "@/lib/constants";
import { CommentAuthor } from "@/types/comment.types";

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
    <div className="bg-neutral2 flex flex-col rounded-xl p-6">
      <div className="flex flex-col">
        <div className="border-neutral5 flex items-center gap-x-2 border-b pb-2">
          <div className="shrink-0">
            <Image
              src={user.avatar || "/static/images/default-user.jpg"}
              alt={user.name}
              width={44}
              height={44}
              className="size-11 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2.5">
              <span className="text-neutral10 text-sm/5 font-bold">{user.name}</span>
              <span className={`h-5 rounded-md px-1 text-xs/5 font-medium ${roleConfig[user.role].className}`}>
                {roleConfig[user.role].label}
              </span>
            </div>
            <span className="text-neutral8 text-xs">{formatDate(date)}</span>
          </div>
        </div>
        <p className="text-neutral9 pt-2 leading-5">{text}</p>
      </div>

      {reply && (
        <div className="bg-primary/10 mt-4 flex flex-col rounded-xl p-6">
          <div className="flex flex-col">
            <div className="border-neutral5 flex items-center gap-x-2 border-b pb-2">
              <div className="shrink-0">
                <Image
                  src={reply.user.avatar || "/static/images/default-user.jpg"}
                  alt={reply.user.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2.5">
                  <span className="text-neutral10 text-sm/5 font-bold">{reply.user.name}</span>
                  <span className={`h-5 rounded-md px-1 text-xs/5 font-medium ${roleConfig[reply.user.role].className}`}>
                    {roleConfig[reply.user.role].label}
                  </span>
                </div>
                <span className="text-neutral8 text-xs">{formatDate(reply.date)}</span>
              </div>
            </div>
            <p className="text-neutral9 pt-2 leading-5">{reply.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}