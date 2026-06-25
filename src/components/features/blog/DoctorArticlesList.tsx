"use client";

import BlogCard from "@/components/features/blog/BlogCard";
import { BlogPostCard } from "@/features/blog/types/blog.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
interface DoctorArticlesListProps {
  articles: BlogPostCard[];
}

export default function DoctorArticlesList({
  articles,
}: DoctorArticlesListProps) {
  const isSidebarOpen = useIsSidebarOpen();
  const gridColumns = isSidebarOpen
    ? "grid-cols-3 max-xl:grid-cols-2  max-lg:gap-4"
    : "grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2  max-xs:grid-cols-1";
  return (
    <div
      className={`grid gap-6 justify-self-center max-md:gap-4 ${gridColumns}`}
    >
      {articles.map((post) => (
        <BlogCard key={post._id} {...post} />
      ))}
    </div>
  );
}
