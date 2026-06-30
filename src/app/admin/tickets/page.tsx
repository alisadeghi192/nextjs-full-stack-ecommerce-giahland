import AdminTicketList from "@/components/admin/AdminTicketList";
import AdminTicketsHeader from "@/components/admin/AdminTicketsHeader";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getAllTickets } from "@/features/tickets/actions/admin.ticket.actions";
import { redirect } from "next/navigation";

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
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    redirect("/admin/dashboard");
  }

  const { page, role, sort, status, department } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 5;

  const { tickets, totalPages } = await getAllTickets(currentPage, limit, {
    role,
    sort,
    status,
    department,
  });

  const baseUrl = `?role=${role || ""}&sort=${sort || "newest"}&status=${status || ""}&department=${department || ""}`;

  return (
    <div>
      <SectionTitle title="مدیریت تیکت‌ها" />
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
    </div>
  );
}
