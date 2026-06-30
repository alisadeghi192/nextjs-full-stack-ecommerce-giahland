// src/app/admin/contact-messages/page.tsx
import AdminContactMessagesHeader from "@/components/admin/AdminContactMessagesHeader";
import AdminContactMessagesList from "@/components/admin/AdminContactMessagesList";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getContactMessages } from "@/features/contact/actions/getContactMessages.actions";
import { redirect } from "next/navigation";

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
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    redirect("/admin/dashboard");
  }

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
    <div>
      <SectionTitle title="پیام‌های تماس" />
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
    </div>
  );
}