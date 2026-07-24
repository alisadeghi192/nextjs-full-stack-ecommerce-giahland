import AdminContactMessagesHeader from "@/components/admin/AdminContactMessagesHeader";
import AdminContactMessagesList from "@/components/admin/AdminContactMessagesList";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/pagination";
import { getContactMessages } from "@/features/contact/actions/getContactMessages.actions";
import { toPersianNumber } from "@/lib/utils/format";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function AdminContactMessagesPage({
  searchParams,
}: PageProps) {

  const { page, status, sort } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 5;

  const result = await getContactMessages({
    page: currentPage,
    limit,
    status: status as "all" | "read" | "unread" || "all",
    sort: sort as "newest" | "oldest" || "newest",
  });

  const baseUrl = `?status=${status || "all"}&sort=${sort || "newest"}`;

  return (
    <section>
      <SectionTitle title={`پیام‌های دریافتی (${toPersianNumber(result.total)})`} />
      <AdminContactMessagesHeader
        currentStatus={status || "all"}
        currentSort={sort || "newest"}
      />
      <AdminContactMessagesList messages={result.messages} />
      {result.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={result.totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </section>
  );
}