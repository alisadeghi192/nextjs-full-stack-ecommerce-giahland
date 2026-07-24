"use client";

import ProductCardGrid from "@/components/features/products/ProductCardGrid";
import ProductCardList from "@/components/features/products/ProductCardList";
import { deleteProductAction } from "@/features/products/actions/deleteProduct.actions";
import { IProductCardData } from "@/features/products/types/product.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import ConfirmDialog from "../shared/ui/ConfirmDialog";

interface AdminProductsProps {
  products: IProductCardData[];
  viewMode: string;
}

export default function AdminProducts({
  products,
  viewMode,
}: AdminProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isSidebarOpen = useIsSidebarOpen();
  const gridColumns = isSidebarOpen
    ? "grid-cols-[repeat(3,auto)] justify-center max-lg:grid-cols-2"
    : "grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2";

  const listColumns = isSidebarOpen
    ? "grid-cols-2 max-xl:grid-cols-1"
    : "grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1";

  const handleDelete = async (productId: string) => {
    const result = await deleteProductAction(productId);
    if (result.success) {
      toast.success(result.message);
      const searchParams = new URLSearchParams(window.location.search);
      const currentPage = Number(searchParams.get("page")) || 1;

      if (products.length === 1 && currentPage > 1) {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(currentPage - 1));
        router.push(`${pathname}?${params.toString()}`);
      }
    } else {
      toast.error(result.message);
    }
  };

  if (viewMode === "grid") {
    return (
      <div
        className={`grid gap-6 ${gridColumns} max-[400px]:grid-cols-1! max-md:gap-4`}
      >
        {products.map((product) => (
          <div className="relative mx-auto w-fit" key={product._id}>
            <ProductCardGrid {...product} />
            <div className="relative -top-8 right-0 left-0 flex h-8 items-center">
              <Link
                href={`/admin/products/edit/${product._id}`}
                className="flex h-8 w-full cursor-pointer items-center justify-center gap-x-1 rounded-br-lg bg-blue-400 text-white transition hover:bg-blue-100 hover:text-blue-500"
              >
                <MdEdit size={18} />
                <span>ویرایش</span>
              </Link>
              <ConfirmDialog
                onConfirm={() => handleDelete(product._id)}
                title="آیا از حذف این محصول مطمئن هستید؟ این عملیات برگشت ناپذیر است."
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                className="bg-error hover:text-error hover:bg-bg-error flex h-8 w-full cursor-pointer items-center justify-center gap-x-1 rounded-bl-lg text-white transition-colors"
              >
                <MdDelete size={18} />
                <span>حذف</span>
              </ConfirmDialog>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${listColumns} max-sm:grid-cols-1`}>
      {products.map((product) => (
        <div className="relative" key={product._id}>
          <ProductCardList {...product} />
          <div className="absolute right-0 bottom-0 left-0 flex items-center">
            <Link
              href={`/admin/products/edit/${product._id}`}
              className="flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-br-lg bg-blue-400 text-white transition hover:bg-blue-100 hover:text-blue-500"
            >
              <MdEdit className="size-4" />
              <span className="text-sm">ویرایش</span>
            </Link>
            <ConfirmDialog
              onConfirm={() => handleDelete(product._id)}
              title="آیا از حذف این محصول مطمئن هستید؟ این عملیات برگشت ناپذیر است."
              confirmText="بله، حذف شود"
              cancelText="انصراف"
              className="bg-error hover:text-error hover:bg-bg-error flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-bl-lg text-white transition-colors"
            >
              <MdDelete className="size-4" />
              <span className="text-sm">حذف</span>
            </ConfirmDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
