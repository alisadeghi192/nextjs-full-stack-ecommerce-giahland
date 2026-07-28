
import BlogSlider from "@/components/features/blog/BlogSlider";
import BannerSection from "@/components/features/landing/BannerSection";
import HeroSection from "@/components/features/landing/HeroSection";
import LazySliders from "@/components/features/landing/LazySliders";
import PlantDoctorServices from "@/components/features/landing/PlantDoctorServices";
import ServicesSection from "@/components/features/landing/ServicesSection";
import ProductSlider from "@/components/features/products/ProductSlider";

import { getArticles } from "@/features/blog/actions/getArticles.actions";
import { getCategoryCounts } from "@/features/products/actions/getCategoryCounts.actions";
import { getProducts } from "@/features/products/actions/getProducts.actions";
import { HOME_METADATA } from "@/lib/constants";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: HOME_METADATA.title,
  description: HOME_METADATA.description,
  keywords: HOME_METADATA.keywords,
  openGraph: {
    title: HOME_METADATA.title,
    description: HOME_METADATA.description,
    images: "/static/images/logo.webp",
  },
};

const cachedGetProducts = (category: string, sort: string, limit: number) =>
  unstable_cache(
    async () => getProducts({ category, sort, limit }),
    [`home-products-${category}-${sort}`],
    { revalidate: 86400, tags: ["home-products"] }
  );

const cachedGetArticles = (sort: string, limit: number) =>
  unstable_cache(
    async () => getArticles({ sort, limit }),
    [`home-articles-${sort}`],
    { revalidate: 86400, tags: ["home-articles"] }
  );

export default async function Home() {
  const [
    indoorLatest,
    decorationLatest,
    giftLatest,
    latestPostsResult,
    mostViewedPostsResult,
    categoryCounts,
  ] = await Promise.all([
    cachedGetProducts("indoor", "newest", 8)(),
    cachedGetProducts("decoration", "newest", 8)(),
    cachedGetProducts("gift", "newest", 8)(),
    cachedGetArticles("newest", 6)(),
    cachedGetArticles("most_viewed", 6)(),
    getCategoryCounts(),
  ]);

  const latestPosts = latestPostsResult.articles;
  const mostViewedPosts = mostViewedPostsResult.articles;

  return (
    <section className="container">
      <HeroSection
        indoorCount={categoryCounts.indoor}
        decorationCount={categoryCounts.decoration}
        giftCount={categoryCounts.gift}
      />
      <ServicesSection />
      <BannerSection />

      <ProductSlider
        title="گیاهان آپارتمانی"
        products={indoorLatest.products}
        link="/products?category=indoor&sort=newest&view=grid"
      />

      <BlogSlider posts={latestPosts} title="آخرین مقالات" link="/blog" />
      <PlantDoctorServices />

      <ProductSlider
        title="گیاهان دکوراتیو"
        products={decorationLatest.products}
        link="/products?category=decoration&sort=newest&view=grid"
      />

      <LazySliders
        mostViewedPosts={mostViewedPosts}
        giftProducts={giftLatest.products}
      />
    </section>
  );
}