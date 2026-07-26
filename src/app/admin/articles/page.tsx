import DoctorArticlesHeader from "@/components/doctor/DoctorArticlesHeader";
import DoctorArticlesList from "@/components/doctor/DoctorArticlesList";
import Pagination from "@/components/shared/ui/Pagination";
import { getArticles } from "@/features/blog/actions/getArticles.actions";
import {
  BLOG_POSTS_PER_PAGE,
  DEFAULT_SORT,
  DEFAULT_TAB,
} from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " مقاله ها | پنل مدیریت",
};
interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

export default async function AdminArticlesPage({ searchParams }: PageProps) {
  const { sort, page, category } = await searchParams;
  const activeTab = (category as string) || DEFAULT_TAB;
  const selectedSort = (sort as string) || DEFAULT_SORT;
  const currentPage = Number(page) || 1;

  const result = await getArticles({
    category: activeTab,
    sort: selectedSort,
    page: currentPage,
    limit: BLOG_POSTS_PER_PAGE,
  });

  const baseUrl = `?sort=${selectedSort}&category=${activeTab}`;

  return (
    <section className="w-full">
      <DoctorArticlesHeader
        activeTab={activeTab}
        selectedSort={selectedSort}
        total={result.total}
      />
      {result.total === 0 ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          مقاله ای یافت نشد.
        </div>
      ) : (
        <>
          <DoctorArticlesList articles={result.articles} showActions={true} />
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
