import BlogSlider from "@/components/features/blog/BlogSlider";
import BannerSection from "@/components/features/landing/BannerSection";
import HeroSection from "@/components/features/landing/HeroSection";
import PlantDoctorServices from "@/components/features/landing/PlantDoctorServices";
import ServicesSection from "@/components/features/landing/ServicesSection";
import ProductSlider from "@/components/features/products/ProductSlider";
import { getArticles } from "@/features/blog/actions/getArticles.actions";
import { getCategoryCounts } from "@/features/products/actions/getCategoryCounts.actions";
import { getProducts } from "@/features/products/actions/getProducts.actions";
import { getBulkLikeStatus } from "@/features/user/actions/wishlist.actions";

export default async function Home() {
  const [
    indoorLatest,
    decorationLatest,
    giftLatest,
    latestPostsResult,
    mostViewedPostsResult,
    categoryCounts,
  ] = await Promise.all([
    getProducts({ category: "indoor", sort: "newest", limit: 8 }),
    getProducts({ category: "decoration", sort: "newest", limit: 8 }),
    getProducts({ category: "gift", sort: "newest", limit: 8 }),
    getArticles({ sort: "newest", limit: 6 }),
    getArticles({ sort: "most_viewed", limit: 6 }),
    getCategoryCounts(),
  ]);

  const indoorIds = indoorLatest.products.map((p) => p._id);
  const decorationIds = decorationLatest.products.map((p) => p._id);
  const giftIds = giftLatest.products.map((p) => p._id);

  const [indoorLikeStatuses, decorationLikeStatuses, giftLikeStatuses] =
    await Promise.all([
      getBulkLikeStatus(indoorIds),
      getBulkLikeStatus(decorationIds),
      getBulkLikeStatus(giftIds),
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
        likeStatuses={indoorLikeStatuses}
      />

      <BlogSlider posts={latestPosts} title="آخرین مقالات" link="/blog" />
      <PlantDoctorServices />

      <ProductSlider
        title="گیاهان دکوراتیو"
        products={decorationLatest.products}
        link="/products?category=decoration&sort=newest&view=grid"
        likeStatuses={decorationLikeStatuses}
      />

      <BlogSlider
        posts={mostViewedPosts}
        title="پربازدید ترین مقالات"
        link="/blog?sort=most_viewed&page=1"
      />

      <ProductSlider
        title="گیاهان کادویی"
        products={giftLatest.products}
        link="/products?category=gift&sort=newest&view=grid"
        likeStatuses={giftLikeStatuses}
      />
    </section>
  );
}
