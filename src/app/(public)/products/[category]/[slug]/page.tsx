import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { fakeProducts } from "@/data/products";
import { formatPrice, formatDimensions, toPersianNumber } from "@/lib/utils/format";
import AddToCartButton from "@/components/features/products/AddToCartButton";
import LikeButton from "@/components/features/products/LikeButton";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = fakeProducts.find(
    (p) => p.category === category && p.slug === slug
  );

  if (!product) {
    notFound();
  }

  const hasDiscount = product.discount > 0;
  const finalPrice = product.price - (product.price * product.discount) / 100;

  return (
    <main className="container">
      <Breadcrumb title={product.name} />

      <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-2">
        {/* ستون راست: گالری تصاویر */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ستون چپ: اطلاعات محصول */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* قیمت */}
          <div className="mt-4 flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-sm text-red-600">
                  {product.discount}٪ تخفیف
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* مشخصات */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">وضعیت موجودی:</span>
              <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                {product.stock > 0 ? `${toPersianNumber(product.stock)} عدد موجود` : "ناموجود"}
              </span>
            </div>
            {product.potDimensions && (
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">ابعاد گلدان:</span>
                <span>{formatDimensions(product.potDimensions)}</span>
              </div>
            )}
          </div>

          {/* دکمه‌ها */}
          <div className="mt-8 flex gap-4">
            {product.stock > 0 && (
              <>
                <AddToCartButton className="bg-primary hover:bg-primary/90 flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-white transition-colors" />
                <LikeButton className="border-primary text-primary hover:bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl border transition-colors" mobileResponsive={false} />
              </>
            )}
          </div>

          {/* توضیحات */}
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">توضیحات محصول:</h3>
            <p className="text-gray-600 leading-7">{product.name} لورم ایپسوم...</p>
          </div>
        </div>
      </div>
    </main>
  );
}