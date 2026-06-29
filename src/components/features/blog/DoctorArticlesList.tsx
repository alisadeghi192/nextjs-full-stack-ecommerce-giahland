"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";

import BlogCard from "@/components/features/blog/BlogCard";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import { deleteArticleAction } from "@/features/blog/actions/deleteArticle.actions";
import { BlogPostCard } from "@/features/blog/types/blog.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";

interface DoctorArticlesListProps {
  articles: BlogPostCard[];
  showActions?: boolean;
}

export default function DoctorArticlesList({
  articles,
  showActions = false,
}: DoctorArticlesListProps) {
  const isSidebarOpen = useIsSidebarOpen();

  const gridColumns = isSidebarOpen
    ? "grid-cols-3 max-xl:grid-cols-2 max-lg:gap-4"
    : "grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1";

  const handleDelete = async (articleId: string) => {
    const result = await deleteArticleAction(articleId);

    if (result.success) {
      toast.success(result.message);
      window.location.reload();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      className={`grid gap-6 justify-self-center max-md:gap-4 ${gridColumns}`}
    >
      {articles.map((post) => (
        <div className="flex flex-col" key={post._id}>
          {showActions && (
            <div className="flex rounded-lg h-7 mb-1">
              <Link
                href={`/admin/articles/${post._id}/edit`}
                className="w-1/2 rounded-lg flex items-center justify-center text-blue-400 transition hover:bg-blue-500/20"
              >
                <MdEdit size={18} />
              </Link>

              <ConfirmDialog
                onConfirm={() => handleDelete(post._id)}
                title="آیا از حذف این مقاله مطمئن هستید؟ این عملیات برگشت ناپذیر است."
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                className="w-1/2 rounded-lg cursor-pointer flex items-center justify-center text-red-400 transition hover:bg-red-500/20"
              >
                <MdDelete size={18} />
              </ConfirmDialog>
            </div>
          )}
          <BlogCard {...post} />
        </div>
      ))}
    </div>
  );
}