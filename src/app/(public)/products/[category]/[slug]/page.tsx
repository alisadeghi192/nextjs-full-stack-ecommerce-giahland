import MobileStickyCart from "@/components/features/products/MobileStickyCart";
import ProductCaresRenderer from "@/components/features/products/ProductCaresRenderer";
import ProductDetailTabs from "@/components/features/products/ProductDetailTabs";
import ProductFeaturesRenderer from "@/components/features/products/ProductFeaturesRenderer";
import ProductGallery from "@/components/features/products/ProductGallery";
import ProductPurchaseCard from "@/components/features/products/ProductPurchaseCard";
import ProductSlider from "@/components/features/products/ProductSlider";
import ProductSpecs from "@/components/features/products/ProductSpecs";
import ProductTitleHeader from "@/components/features/products/ProductTitleHeader";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import CommentForm from "@/components/shared/ui/CommentForm";
import CommentList from "@/components/shared/ui/CommentList";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/features/products/actions/product.actions";
import { getBulkLikeStatus } from "@/features/user/actions/wishlist.actions";
import { productDetailTabs, productTabs } from "@/lib/constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// ========== SEO ==========
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "محصول یافت نشد" };
  }

  return {
    title: product.seo?.title || `${product.name} | گیاه‌لند`,
    description:
      product.seo?.description || `خرید گیاه ${product.name} با قیمت مناسب`,
    keywords: product.seo?.keywords,
    openGraph: {
      title: product.seo?.title || product.name,
      description: product.seo?.description || `خرید گیاه ${product.name}`,
      images: product.seo?.ogImage || product.image,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product || product.category !== category) {
    notFound();
  }

  const categoryName =
    productTabs.find((product) => product.id == category)?.label || "";

  const relatedProducts = await getRelatedProducts(product.category, slug, 8);
const relatedIds = relatedProducts.map((p) => p._id);
  const relatedLikeStatuses = await getBulkLikeStatus(relatedIds);
  const categoryLink = `/products?category=${category}`;

  return (
    <main className="relative container">
      <Breadcrumb title={product.name} />

      <section className="mb-10 flex items-end justify-between max-xl:flex-wrap max-xl:items-center max-xl:justify-around max-lg:justify-between max-md:items-end max-sm:mb-8 max-sm:flex-col">
        <ProductTitleHeader
          categoryName={categoryName}
          productName={product.name}
          wrapperClassName="hidden w-full max-xl:flex max-sm:mb-8 max-sm:gap-y-2 max-sm:pb-2"
          spanClassName="max-sm:text-sm/5"
          titleClassName="max-sm:text-base/5.5"
        />
        <ProductGallery
          mainImage={product.image}
          productName={product.name}
          images={product.images}
        />
        <div className="flex w-125 flex-col max-xl:mt-9 max-lg:w-100 max-md:w-65 max-sm:mt-6 max-sm:w-full">
          <ProductTitleHeader
            categoryName={categoryName}
            productName={product.name}
            wrapperClassName="max-xl:hidden"
            spanClassName=""
            titleClassName=""
          />
          <ProductSpecs
            potMaterial={product.potMaterial}
            soilType={product.soilType}
            weight={product.weight}
            potDimensions={product.potDimensions}
            sunlight={product.sunlight}
          />
        </div>
        <ProductPurchaseCard
          price={product.price}
          discount={product.discount}
          stock={product.stock}
        />
      </section>

      <section>
        <ProductDetailTabs tabs={productDetailTabs} />

        <ProductFeaturesRenderer
          overview={product.features.overview}
          appearance={product.features.appearance}
          warnings={product.features.warnings}
          propagation={product.features.propagation}
          summary={product.features.summary}
          productName={product.name}
          productImage={product.image}
        />

        <ProductCaresRenderer
          light={product.cares.light}
          watering={product.cares.watering}
          soil={product.cares.soil}
          temperature={product.cares.temperature}
          fertilization={product.cares.fertilization}
        />
        <CommentForm />
        <CommentList comments={product.comments || []} />
      </section>

      <ProductSlider
        link={categoryLink}
        products={relatedProducts}
        title="گیاه های مشابه"
        likeStatuses={relatedLikeStatuses}
      />

      <MobileStickyCart
        discount={product.discount}
        price={product.price}
        stock={product.stock}
      />
    </main>
  );
}
