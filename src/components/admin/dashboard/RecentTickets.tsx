import SectionTitle from "@/components/panel/SectionTitle";
import { IDashboardTickets } from "@/features/tickets/types/ticket.types";
import { toPersianDate } from "@/lib/utils/format";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface RecentTicketsProps {
  tickets: IDashboardTickets[];
}

export default function RecentTickets({ tickets }: RecentTicketsProps) {
  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 dark:bg-shade3 flex h-full flex-col rounded-xl border bg-white p-4 shadow-lg transition-colors">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="آخرین تیکت‌ها🎫" className="mb-0!" />
        {tickets.length > 0 && (
          <Link
            href="/admin/tickets"
            className="text-primary dark:text-primary-dark dark:hover:text-primary hover:text-shade2 flex items-center justify-center text-sm"
          >
            <span className="">مشاهده همه</span>
            <MdKeyboardArrowLeft className="size-5" />
          </Link>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {tickets.length === 0 ? (
          <p className="text-neutral9 dark:text-text-dark py-4 text-center">تیکتی وجود ندارد.</p>
        ) : (
          tickets.map((ticket: IDashboardTickets) => (
            <div
              key={ticket._id}
              className={`border-r-4 dark:shadow-shade6 max-xs:px-2 max-xs:py-1 rounded-2xl p-3 shadow-lg transition max-sm:p-3 ${ticket.status === "pending" ? "border-error dark:bg-shade4 bg-yellow-50" : "border-primary"}`}
            >
              <div className="flex justify-between">
                <div className="flex flex-1 items-center gap-x-2">
                  <span className="max-xs:text-sm max-w-1/2 truncate">
                    {ticket.userName}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {ticket.status === "pending" ? (
                      <span className="rounded-full bg-red-100 dark:bg-error px-2 py-0.5 text-xs text-nowrap text-error dark:text-red-100">
                        بی پاسخ
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 dark:bg-green-700 px-2 py-0.5 text-xs text-nowrap text-green-700 dark:text-green-100">
                        پاسخ داده شده
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-neutral9 dark:text-text-dark max-xs:text-xs text-sm">
                  {ticket.createdAt && toPersianDate(ticket.createdAt)}
                </div>
              </div>

              <p className="text-neutral10 dark:text-white mt-1 truncate text-sm">
                {ticket.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
