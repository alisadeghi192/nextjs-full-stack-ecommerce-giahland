import ConsultationsList from "@/components/features/consultations/ConsultationsList";
import SectionTitle from "@/components/panel/SectionTitle";
import SortDropdownWrapper from "@/components/shared/ui/SortDropdownWrapper";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getUserConsultations } from "@/features/consultations/actions/getUserConsultations.actions";
import { consultationSortOptions } from "@/lib/constants";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function UserConsultationsPage({
  searchParams,
}: PageProps) {
  const { sort } = await searchParams;
  const selectedSort = sort || "newest";
  const consultations = await getUserConsultations();
  const { user } = await getMeAction();
  const isDoctor = user?.role === "plant-doctor";
  const hasConsultations = consultations.length > 0;

  const sortedConsultations = [...consultations].sort((a, b) => {
    if (selectedSort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between ">
        <SectionTitle title="مشاوره های من" className="mb-0!" />
        <div className="flex items-center gap-4 [&>*:nth-child(1)]:[&>*:nth-child(1)]:h-10 " >
          <SortDropdownWrapper options={consultationSortOptions} />
          <Link
            href="/user/consultations"
            className={`text-primary border-primary shrink-0 flex h-10 w-37.5 items-center justify-center rounded-xl border text-center font-medium ${isDoctor ? "hidden" : ""}`}
          >
            شروع مشاوره جدید
          </Link>
        </div>
      </div>

      {!hasConsultations ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          شما هیچ مشاوره‌ای ندارید.
        </div>
      ) : (
        <ConsultationsList consultations={sortedConsultations} />
      )}
    </div>
  );
}
