import SectionTitle from "@/components/panel/SectionTitle";
import { DashboardTickets } from "@/features/tickets/types/ticket.types";
import { formatDate } from "@/lib/utils/format";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface RecentTicketsProps {
  tickets: DashboardTickets[];
}

export default function RecentTickets({ tickets }: RecentTicketsProps) {
  return (
    <div className="border-neutral3 flex h-full flex-col rounded-xl border bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title="آخرین تیکت‌ها🎫" className="mb-0!" />
        {tickets.length > 0 && (
          <Link
            href="/admin/tickets"
            className="text-primary hover:text-shade2 *: flex items-center justify-center text-sm"
          >
            <span className="">مشاهده همه</span>
            <MdKeyboardArrowLeft className="size-5" />
          </Link>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {tickets.length === 0 ? (
          <p className="text-neutral9 py-4 text-center">تیکتی وجود ندارد.</p>
        ) : (
          tickets.map((ticket: DashboardTickets) => (
            <div
              key={ticket._id}
              className={`border-neutral3 max-xs:px-2 max-xs:py-1 rounded-2xl border p-3 shadow-lg transition max-sm:p-3 ${ticket.status === "pending" ? "border-yellow-400 bg-yellow-50" : ""}`}
            >
              <div className="flex justify-between">
                <div className="flex flex-1 items-center gap-x-2">
                  <span className="max-xs:text-sm max-w-1/2 truncate">
                    {ticket.userName}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {ticket.status === "pending" ? (
                      <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-nowrap text-white">
                        بی پاسخ
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-nowrap text-green-700">
                        پاسخ داده شده
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-neutral9 max-xs:text-xs text-sm">
                  {ticket.createdAt && formatDate(ticket.createdAt)}
                </div>
              </div>

              <p className="text-neutral10 mt-1 truncate text-sm">
                {ticket.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
