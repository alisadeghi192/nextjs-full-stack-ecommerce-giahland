import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { fakeProducts } from "@/data/products";
import { productTabs } from "@/lib/constants";
import ProductDetailTabs from "@/components/features/products/ProductDetailTabs";
import { productDetailTabs } from "@/lib/constants";
import CommentForm from "@/components/shared/ui/CommentForm";
import CommentList from "@/components/shared/ui/CommentList";
import ProductTitleHeader from "@/components/features/products/ProductTitleHeader";
import ProductGallery from "@/components/features/products/ProductGallery";
import ProductSpecs from "@/components/features/products/ProductSpecs";
import ProductPurchaseCard from "@/components/features/products/ProductPurchaseCard";
import ProductFeaturesRenderer from "@/components/features/products/ProductFeaturesRenderer";
import ProductCaresRenderer from "@/components/features/products/ProductCaresRenderer";

import MobileStickyCart from "@/components/features/products/MobileStickyCart";
import ProductSlider from "@/components/features/products/ProductSlider";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = fakeProducts.find(
    (p) => p.category === category && p.slug === slug,
  );

  if (!product) {
    notFound();
  }

  const categoryName = productTabs.find((p) => p.id == category)?.label || "";

  const relatedProducts = fakeProducts
    .filter((p) => p.category === category && p.slug !== slug)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 4);

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
        <CommentList comments={product.comments || []}  />
      </section>

      <ProductSlider
        link={categoryLink}
        products={relatedProducts}
        title="گیاه های مشابه"
      />

      <MobileStickyCart discount={product.discount} price={product.price} />
    </main>
  );
}
