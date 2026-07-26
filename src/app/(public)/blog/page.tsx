import BlogCard from "@/components/features/blog/BlogCard";
import BlogHeader from "@/components/features/blog/BlogHeader";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import Pagination from "@/components/shared/ui/Pagination";
import { getArticles } from "@/features/blog/actions/getArticles.actions";
import { IBlogPostCard } from "@/features/blog/types/blog.types";
import {
  BLOG_METADATA,
  BLOG_POSTS_PER_PAGE,
  DEFAULT_SORT,
  DEFAULT_TAB,
} from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: BLOG_METADATA.title,
  description: BLOG_METADATA.description,
  keywords: BLOG_METADATA.keywords,
  openGraph: {
    title: BLOG_METADATA.title,
    description: BLOG_METADATA.description,
    images: "/static/images/logo.webp",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  const activeTab = (params.category as string) || DEFAULT_TAB;
  const selectedSort = (params.sort as string) || DEFAULT_SORT;
  const currentPage = Number(params.page) || 1;

  const result = await getArticles({
    category: activeTab,
    sort: selectedSort,
    page: currentPage,
    limit: BLOG_POSTS_PER_PAGE,
  });

  const baseUrl = `?category=${activeTab}&sort=${selectedSort}`;

  return (
    <section className="container">
      <Breadcrumb />
      <section>
        <BlogHeader activeTab={activeTab} selectedSort={selectedSort} />

        {result.articles.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            مقاله‌ای یافت نشد.
          </div>
        ) : (
          <div className="max-xs:grid-cols-1 grid grid-cols-[repeat(4,auto)] justify-center gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4">
            {result.articles.map((post:IBlogPostCard) => (
              <BlogCard key={post._id} {...post} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={result.totalPages}
          baseUrl={baseUrl}
        />
      </section>
    </section>
  );
}
