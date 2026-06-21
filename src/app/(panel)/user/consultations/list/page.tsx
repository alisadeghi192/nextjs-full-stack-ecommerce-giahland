import ConsultationsList from "@/components/features/consultations/ConsultationsList";
import ConsultationsListHeader from "@/components/features/consultations/ConsultationsListHeader";
import Pagination from "@/components/shared/ui/pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getUserConsultations } from "@/features/consultations/actions/getUserConsultations.actions";
import { paginateProducts } from "@/features/products/utils/productHelpers";
interface PageProps {
  searchParams: Promise<{ sort?: string; search?: string; page?: string }>;
}

export default async function UserConsultationsPage({
  searchParams,
}: PageProps) {
  const { sort, search, page } = await searchParams;
  const selectedSort = sort || "newest";
  const searchQuery = search || "";
  const currentPage = Number(page) || 1;

  const consultations = await getUserConsultations();
  const { user } = await getMeAction();
  const isDoctor = user?.role === "plant-doctor";

  const filtered = searchQuery
    ? consultations.filter((c) => c.code.includes(searchQuery))
    : consultations;

  const sortedConsultations = [...filtered].sort((a, b) => {
    if (selectedSort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const paginated = paginateProducts(sortedConsultations, currentPage, 6);
  const totalPages = Math.ceil(sortedConsultations.length / 6);
  const baseUrl = `?sort=${selectedSort}&search=${searchQuery}`;

  const hasConsultations = sortedConsultations.length > 0;

  return (
    <div className="w-full">
      <ConsultationsListHeader searchQuery={searchQuery} isDoctor={isDoctor} />

      {!hasConsultations ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          مشاوره ای پیدا نشد.
        </div>
      ) : (
        <>
          <ConsultationsList consultations={paginated} />
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={baseUrl}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
