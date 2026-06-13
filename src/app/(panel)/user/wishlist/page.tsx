import SectionTitle from "@/components/panel/SectionTitle";
import WishlistProducts from "@/components/panel/WishListProducts";
import WishlistToolbar from "@/components/panel/WishlistToolbar";
import Pagination from "@/components/shared/ui/pagination";
import {
  paginateProducts,
  sortProducts,
} from "@/features/products/utils/productHelpers";
import { getUserWishlist } from "@/features/user/actions/wishlist.actions";
import { DEFAULT_VIEW_MODE, PRODUCTS_PER_PAGE } from "@/lib/constants";

interface WishListPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WishListPage({
  searchParams,
}: WishListPageProps) {
  const params = await searchParams;

  const viewMode = (params.view as string) || DEFAULT_VIEW_MODE;
  const selectedSort = (params.sort as string) || "newest";
  const currentPage = Number(params.page) || 1;

  const allWishlistProducts = await getUserWishlist();

  if (allWishlistProducts.length === 0) {
    return (
      <div className="w-full">
        <SectionTitle title="علاقه مندی ها" />
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          محصولی در لیست علاقه‌مندی‌های شما وجود ندارد.
        </div>
      </div>
    );
  }

  const sortedProducts = sortProducts(allWishlistProducts, selectedSort);
  const paginatedProducts = paginateProducts(
    sortedProducts,
    currentPage,
    PRODUCTS_PER_PAGE,
  );
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const baseUrl = `?view=${viewMode}&sort=${selectedSort}`;

  return (
    <div className="w-full">
      <SectionTitle title="علاقه مندی ها" />
      <WishlistToolbar />
      <WishlistProducts
        products={JSON.parse(JSON.stringify(paginatedProducts))}
        viewMode={viewMode}
      />
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
}
