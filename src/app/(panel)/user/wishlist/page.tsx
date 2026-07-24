import SectionTitle from "@/components/panel/SectionTitle";
import WishlistProducts from "@/components/panel/WishListProducts";
import WishlistToolbar from "@/components/panel/WishlistToolbar";
import Pagination from "@/components/shared/ui/pagination";
import { getWishlistProducts } from "@/features/products/actions/getWishlistProducts.actions";
import { DEFAULT_VIEW_MODE } from "@/lib/constants";
import { toPersianNumber } from "@/lib/utils/format";

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
  
  const result = await getWishlistProducts({
    sort: selectedSort as any,
    page: currentPage,
  });

  const baseUrl = `?view=${viewMode}&sort=${selectedSort}`;

  if (result.total === 0) {
    return (
      <div className="w-full">
        <SectionTitle title="علاقه مندی ها" />
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          محصولی در لیست علاقه‌مندی‌های شما وجود ندارد.
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <SectionTitle title={`علاقه‌مندی‌ها(${toPersianNumber(result.total)})`} />
      <WishlistToolbar />
      <WishlistProducts
        products={JSON.parse(JSON.stringify(result.products))}
        viewMode={viewMode}
      />
      {result.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={result.totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </section>
  );
}
