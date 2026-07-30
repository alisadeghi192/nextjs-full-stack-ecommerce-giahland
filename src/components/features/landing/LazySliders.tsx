"use client";

import { IBlogPostCard } from "@/features/blog/types/blog.types";
import { IProductCardData } from "@/features/products/types/product.types";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LazyProductSlider = dynamic(
  () => import("@/components/features/products/ProductSlider"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-shade3" />
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-shade3" />
        </div>
        <div className="h-80 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-shade3" />
      </div>
    ),
  }
);

const LazyBlogSlider = dynamic(
  () => import("@/components/features/blog/BlogSlider"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-shade3" />
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-shade3" />
        </div>
        <div className="h-80 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-shade3" />
      </div>
    ),
  }
);

interface LazySlidersProps {
  mostViewedPosts: IBlogPostCard[];
  giftProducts: IProductCardData[];
}

export default function LazySliders({
  mostViewedPosts,
  giftProducts,
}: LazySlidersProps) {
  return (
    <>
      <Suspense
        fallback={
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-80 w-full animate-pulse rounded-2xl bg-gray-200" />
          </div>
        }
      >
        <LazyBlogSlider
          posts={mostViewedPosts}
          title="پربازدید ترین مقالات"
          link="/blog?sort=most_viewed&page=1"
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-80 w-full animate-pulse rounded-2xl bg-gray-200" />
          </div>
        }
      >
        <LazyProductSlider
          title="گیاهان کادویی"
          products={giftProducts}
          link="/products?category=gift&sort=newest&view=grid"
        />
      </Suspense>
    </>
  );
}