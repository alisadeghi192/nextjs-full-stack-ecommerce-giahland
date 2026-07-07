import DoctorCommentHeader from "@/components/doctor/DoctorCommentHeader";
import DoctorCommentsList from "@/components/doctor/DoctorCommentsList";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getDoctorComments } from "@/features/comments/actions/getDoctorComments.actions";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
}

export default async function DoctorCommentsPage({ searchParams }: PageProps) {
  const { user } = await getMeAction();

  if (!user || user.role !== "plant-doctor") {
    redirect("/user/profile");
  }

  const { page, sort } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSort = (sort as "newest" | "oldest") || "newest";
  const limit = 10;

  const result = await getDoctorComments({
    page: currentPage,
    limit,
    sort: currentSort,
  });

  const baseUrl = `?sort=${currentSort}`;

  return (
    <div>
      <SectionTitle title="کامنت‌های قابل پاسخ" />
      <DoctorCommentHeader sort={currentSort} totalCount={result.total} />
      <DoctorCommentsList comments={result.comments} currentPage={currentPage}/>
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