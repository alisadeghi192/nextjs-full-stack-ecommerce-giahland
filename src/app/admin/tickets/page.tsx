import AdminTicketList from "@/components/admin/tickets/AdminTicketList";
import AdminTicketsHeader from "@/components/admin/tickets/AdminTicketsHeader";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/Pagination";
import { getAllTickets } from "@/features/tickets/actions/admin.ticket.actions";
import { toPersianNumber } from "@/lib/utils/format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "  تیکت‌های پشتیبانی | پنل مدیریت",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    role?: string;
    sort?: string;
    status?: string;
    department?: string;
  }>;
}

export default async function AdminTicketsPage({ searchParams }: PageProps) {
  const { page, role, sort, status, department } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 5;

  const { tickets, totalPages, total } = await getAllTickets(
    currentPage,
    limit,
    {
      role,
      sort,
      status,
      department,
    },
  );

  const baseUrl = `?role=${role || ""}&sort=${sort || "newest"}&status=${status || ""}&department=${department || ""}`;

  return (
    <section>
      <SectionTitle title={`مدیریت تیکت‌ها (${toPersianNumber(total)})`} />
      <AdminTicketsHeader />
      <AdminTicketList tickets={tickets} />
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </section>
  );
}
