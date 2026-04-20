import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import BlogsHeader from "@/components/features/blogs/BlogsHeader";
import BlogCard from "@/components/features/blogs/BlogCard";
import Pagination from "@/components/shared/ui/pagination";
import {
  getAllPosts,
  filterPostsByCategory,
  sortPosts,
  paginatePosts,
} from "@/features/blogs/utils/blogHelpers";

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const params = await searchParams;

  const activeTab = (params.category as string) || "all";
  const selectedSort = (params.sort as string) || "newest";
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
        <BlogsHeader />

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
