import AdminCommentHeader from "@/components/admin/AdminCommentHeader";
import AdminCommentsList from "@/components/admin/AdminCommentsList";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/pagination";
import { getComments } from "@/features/comments/actions/getComments.actions";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    filter?: string;
    sort?: string;
  }>;
}

export default async function AdminCommentsPage({ searchParams }: PageProps) {

  const { page, filter, sort } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const result = await getComments({
    page: currentPage,
    limit,
    filter: filter as "all" | "approved" | "pending" || "all",
    sort: sort as "newest" | "oldest" || "newest",
  });

  const baseUrl = `?filter=${filter || "all"}&sort=${sort || "newest"}`;

  return (
    <div>
      <SectionTitle title="مدیریت کامنت‌ها" />
      <AdminCommentHeader />
      <AdminCommentsList comments={result.comments} />
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