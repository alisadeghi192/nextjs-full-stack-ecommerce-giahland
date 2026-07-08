"use client";

import ProductCardGrid from "@/components/features/products/ProductCardGrid";
import ProductCardList from "@/components/features/products/ProductCardList";
import { ProductCardData } from "@/features/products/types/product.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { MdDelete, MdEdit } from "react-icons/md";
import ConfirmDialog from "../shared/ui/ConfirmDialog";

interface WishlistProductsProps {
  products: ProductCardData[];
  viewMode: string;
}

export default function AdminProducts({
  products,
  viewMode,
}: WishlistProductsProps) {
  const isSidebarOpen = useIsSidebarOpen();
  const gridColumns = isSidebarOpen
    ? "grid-cols-[repeat(3,auto)] justify-center max-lg:grid-cols-2"
    : "grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2";

  const listColumns = isSidebarOpen
    ? "grid-cols-2 max-xl:grid-cols-1"
    : "grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1";

  if (viewMode === "grid") {
    return (
      <div
        className={`grid gap-6 ${gridColumns} max-[400px]:grid-cols-1! max-md:gap-4`}
      >
        {products.map((product) => (
          <div className="relative mx-auto w-fit" key={product._id}>
            <ProductCardGrid {...product} />
            <div className="relative -top-8 right-0 left-0 flex h-8 items-center">
              <button className="flex h-8 w-full cursor-pointer items-center justify-center rounded-br-lg bg-blue-400 text-white transition hover:bg-blue-100 hover:text-blue-500">
                <MdEdit size={18} />
                <span>ویرایش</span>
              </button>
              <ConfirmDialog
                onConfirm={() => {}}
                title="آیا از حذف این محصول مطمئن هستید؟ این عملیات برگشت ناپذیر است."
                confirmText="بله، حذف شود"
                cancelText="انصراف"
                className="bg-error hover:text-error hover:bg-bg-error flex h-8 w-full cursor-pointer items-center justify-center rounded-bl-lg text-white transition-colors"
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
          <div className="relative -top-2 right-0 shadow-lg left-0 flex h-6 items-center">
            <button className="flex h-6 w-full cursor-pointer items-center justify-center rounded-br-lg bg-blue-400 text-white transition hover:bg-blue-100 hover:text-blue-500">
              <MdEdit size={18} />
              <span>ویرایش</span>
            </button>
            <ConfirmDialog
              onConfirm={() => {}}
              title="آیا از حذف این محصول مطمئن هستید؟ این عملیات برگشت ناپذیر است."
              confirmText="بله، حذف شود"
              cancelText="انصراف"
              className="bg-error hover:text-error hover:bg-bg-error flex h-6 w-full cursor-pointer items-center justify-center rounded-bl-lg text-white transition-colors"
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
