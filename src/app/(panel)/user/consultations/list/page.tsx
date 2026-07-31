import ConsultationsList from "@/components/features/consultations/ConsultationsList";
import ConsultationsListHeader from "@/components/features/consultations/ConsultationsListHeader";
import Pagination from "@/components/shared/ui/Pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getUserConsultations } from "@/features/consultations/actions/getUserConsultations.actions";
import { CONSULTATIONS_PER_PAGE } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مشاوره‌های من | پنل کاربری",
};
interface PageProps {
  searchParams: Promise<{ sort?: string; search?: string; page?: string }>;
}

export default async function UserConsultationsPage({
  searchParams,
}: PageProps) {
  const { sort, search, page } = await searchParams;
  const selectedSort = (sort as "newest" | "oldest") || "newest";
  const searchQuery = search || "";
  const currentPage = Number(page) || 1;

  const result = await getUserConsultations({
    sort: selectedSort,
    search: searchQuery,
    page: currentPage,
    limit: CONSULTATIONS_PER_PAGE,
  });

  const { user } = await getMeAction();
  const isDoctor = user?.role === "plant-doctor";
  const baseUrl = `?sort=${selectedSort}&search=${searchQuery}`;

  return (
    <section className="w-full">
      <ConsultationsListHeader searchQuery={searchQuery} isDoctor={isDoctor} />

      {result.total === 0 ? (
        <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 dark:bg-shade4 rounded-2xl border p-6 text-center text-gray-500 dark:text-gray-50 shadow-lg">
          مشاوره ای پیدا نشد.
        </div>
      ) : (
        <>
          <ConsultationsList consultations={result.consultations} />
          {result.totalPages > 1 && (
            <div className="flex justify-center">
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
