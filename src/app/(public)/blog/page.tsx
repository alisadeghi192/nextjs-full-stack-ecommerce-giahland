import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import BlogHeader from "@/components/features/blog/BlogHeader";
import BlogCard from "@/components/features/blog/BlogCard";
import Pagination from "@/components/shared/ui/pagination";
import {
  getAllPosts,
  filterPostsByCategory,
  sortPosts,
  paginatePosts,
} from "@/features/blog/utils/blogHelpers";
import { DEFAULT_TAB, DEFAULT_SORT } from "@/lib/constants";

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  const activeTab = (params.category as string) || DEFAULT_TAB;
  const selectedSort = (params.sort as string) || DEFAULT_SORT;
  const currentPage = Number(params.page) || 1;
  const pageSize = 12;

  const allPosts = getAllPosts();

  const filteredPosts = filterPostsByCategory(allPosts, activeTab);

  const sortedPosts = sortPosts(filteredPosts, selectedSort);

  const paginatedPosts = paginatePosts(sortedPosts, currentPage, pageSize);
  const totalPages = Math.ceil(sortedPosts.length / pageSize);

  const baseUrl = `?category=${activeTab}&sort=${selectedSort}`;

  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <BlogHeader />

        <div className="max-xs:grid-cols-1 grid grid-cols-4 gap-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      </section>
    </main>
  );
}
