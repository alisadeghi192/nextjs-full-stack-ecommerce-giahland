"use client";

import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

import BlogCard from "@/components/features/blog/BlogCard";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import { deleteArticleAction } from "@/features/blog/actions/deleteArticle.actions";
import { IBlogPostCard } from "@/features/blog/types/blog.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";

interface DoctorArticlesListProps {
  articles: IBlogPostCard[];
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
          <BlogCard {...post} />

          {showActions && (
            <div className="mb-1 flex h-8 relative -top-2 ">
              <ConfirmDialog
                onConfirm={() => handleDelete(post._id)}
                title="آیا از حذف این مقاله مطمئن هستید؟ این عملیات برگشت ناپذیر است."
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                className="flex w-full cursor-pointer items-center justify-center rounded-b-lg text-white bg-error transition hover:text-error hover:bg-bg-error"
              >
                <MdDelete size={18} />
                <span>حذف</span>
              </ConfirmDialog>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
