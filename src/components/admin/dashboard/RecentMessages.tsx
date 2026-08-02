import SectionTitle from "@/components/panel/SectionTitle";
import { IContactMessage } from "@/lib/db/models/ContactMessage";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
interface RecentMessages {
  messages: IContactMessage[];
}

export default function RecentMessages({ messages }: RecentMessages) {
  return (
    <div className="border-neutral3 dark:border-neutral10 transition-colors dark:shadow-shade6 flex h-full flex-col rounded-xl border bg-white dark:bg-shade3 p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="آخرین پیام‌ها📥" className="mb-0!" />
        {messages.length > 0 && (
          <Link
            href="/admin/contact-messages"
            className="text-primary dark:text-primary-dark hover:text-shade2 dark:hover:text-primary flex items-center justify-center text-sm"
          >
            <span className="">مشاهده همه</span>
            <MdKeyboardArrowLeft className="size-5" />
          </Link>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {messages.length === 0 ? (
          <p className="text-neutral9 dark:text-text-dark py-4 text-center">
            پیام جدیدی وجود ندارد.
          </p>
        ) : (
          messages.map((msg: IContactMessage) => (
            <div
              key={msg._id}
              className={`max-xs:px-2 rounded-xl  border-r-4 p-1 px-3 shadow dark:shadow-shade6 transition ${
                !msg.isRead
                  ? "border-yellow-500 dark:border-yellow-600 bg-yellow-50 dark:bg-shade4"
                  : "border-primary dark:bg-shade3 bg-white"
              }`}
            >
              <div className="max-xs:gap-1 flex items-center gap-3">
                <span className="max-w-1/4 truncate font-medium">
                  {msg.subject}
                </span>
                <span className="text-neutral9 dark:text-text-dark text-sm">|</span>
                <span className="max-w-1/4 truncate text-sm">{msg.name}</span>
                <span className="text-neutral9 dark:text-text-dark text-sm">|</span>
                <span className="text-sm text-gray-500 dark:text-text-dark">{msg.mobile}</span>
                {!msg.isRead && (
                  <>
                    <span className="text-neutral9 dark:text-text-dark text-sm">|</span>
                    <span className="rounded-full bg-yellow-500 dark:bg-yellow-600 px-2 py-0.5 text-xs text-white">
                      جدید
                    </span>
                  </>
                )}
              </div>

              <div className="mt-1">
                <p className="truncate text-sm text-gray-700 dark:text-white transition-colors">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
