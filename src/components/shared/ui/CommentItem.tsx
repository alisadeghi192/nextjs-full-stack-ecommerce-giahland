import Image from "next/image";
import { formatDate } from "@/lib/utils/format";

interface CommentItemProps {
  name: string;
  role: "admin" | "user" | "plant-doctor";
  date: Date;
  text: string;
  reply?: {
    name: string;
    role: "admin" | "user" | "plant-doctor";
    date: Date;
    text: string;
  };
}

const roleConfig = {
  admin: { label: "ادمین", className: "bg-primary/10 text-primary" },
  user: { label: "کاربر", className: "bg-neutral3 text-neutral9" },
  "plant-doctor": { label: "گیاه پزشک", className: "bg-blue-50 text-blue-600" },
};

export default function CommentItem({ name, role, date, text, reply }: CommentItemProps) {
  return (
    <div className="bg-neutral2 flex flex-col rounded-xl p-6">
      <div className="flex flex-col">
        <div className="border-neutral5 flex items-center gap-x-2 border-b pb-2">
          <div className="shrink-0">
            <Image
              src="/images/default-user.jpg"
              alt="user profile"
              width={44}
              height={44}
              className="size-11 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2.5">
              <span className="text-neutral10 text-sm/5 font-bold">{name}</span>
              <span className={`h-5 rounded-md px-1 text-xs/5 font-medium ${roleConfig[role].className}`}>
                {roleConfig[role].label}
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
                  src="/images/default-user.jpg"
                  alt="user profile"
                  width={44}
                  height={44}
                  className="size-11 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2.5">
                  <span className="text-neutral10 text-sm/5 font-bold">{reply.name}</span>
                  <span className={`h-5 rounded-md px-1 text-xs/5 font-medium ${roleConfig[reply.role].className}`}>
                    {roleConfig[reply.role].label}
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