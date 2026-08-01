import AdminConsultationsHeader from "@/components/admin/consultations/AdminConsultationsHeader";
import AdminConsultationsList from "@/components/admin/consultations/AdminConsultationsList";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/Pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getAllConsultations } from "@/features/consultations/actions/getAllConsultations.actions";
import { CONSULTATIONS_PER_PAGE } from "@/lib/constants";
import { toPersianNumber } from "@/lib/utils/format";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "  مشاوره‌ها | پنل مدیریت",
};

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminConsultationsPage({
  searchParams,
}: PageProps) {
  const { user } = await getMeAction();

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const params = await searchParams;
  const status = (params.status as "all" | "active" | "closed") || "all";
  const search = params.search || "";
  const currentPage = Number(params.page) || 1;

  const result = await getAllConsultations({
    status,
    search,
    page: currentPage,
    limit: CONSULTATIONS_PER_PAGE,
  });

  const baseUrl = `?status=${status}&search=${search}`;

  return (
    <section className="space-y-4">
      <SectionTitle
        title={`مدیریت مشاوره‌ها (${toPersianNumber(result.total)})`}
      />
      <AdminConsultationsHeader />

      {result.consultations.length === 0 ? (
        <div className="border-neutral3 dark:border-neutral10 dark:bg-shade4 dark:shadow-shade6 rounded-2xl border p-8 text-center text-gray-500 dark:text-gray-50 shadow-lg">
          {search
            ? "مشاوره‌ای با این مشخصات یافت نشد."
            : "هیچ مشاوره‌ای ثبت نشده است."}
        </div>
      ) : (
        <>
          <AdminConsultationsList consultations={result.consultations} />
          {result.totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={result.totalPages}
                baseUrl={baseUrl}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
