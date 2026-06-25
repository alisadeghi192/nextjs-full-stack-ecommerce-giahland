import DoctorArticlesHeader from "@/components/features/blog/DoctorArticlesHeader";
import DoctorArticlesList from "@/components/features/blog/DoctorArticlesList";
import Pagination from "@/components/shared/ui/pagination";
import { getArticlesByDoctor } from "@/features/blog/actions/getArticlesByDoctor.actions";
import {
  BLOG_POSTS_PER_PAGE,
  DEFAULT_SORT,
  DEFAULT_TAB,
} from "@/lib/constants";
interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

export default async function DoctorArticlesPage({ searchParams }: PageProps) {
  const { sort, page, category } = await searchParams;
  const activeTab = (category as string) || DEFAULT_TAB;
  const selectedSort = (sort as string) || DEFAULT_SORT;
  const currentPage = Number(page) || 1;

  const result = await getArticlesByDoctor({
    category: activeTab,
    sort: selectedSort,
    page: currentPage,
    limit: BLOG_POSTS_PER_PAGE,
  });

  const baseUrl = `?sort=${selectedSort}&category=${activeTab}`;

  return (
    <div className="w-full">
      <DoctorArticlesHeader activeTab={activeTab} selectedSort={selectedSort} />
      {result.total === 0 ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          هنوز مقاله ای ننوشتید.
        </div>
      ) : (
        <>
          <DoctorArticlesList articles={result.articles} />
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
    </div>
  );
}
