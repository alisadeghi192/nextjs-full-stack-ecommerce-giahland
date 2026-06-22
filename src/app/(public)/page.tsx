import BlogSlider from "@/components/features/blog/BlogSlider";
import BannerSection from "@/components/features/landing/BannerSection";
import HeroSection from "@/components/features/landing/HeroSection";
import PlantDoctorServices from "@/components/features/landing/PlantDoctorServices";
import ServicesSection from "@/components/features/landing/ServicesSection";
import ProductSlider from "@/components/features/products/ProductSlider";
import { getArticles } from "@/features/blog/actions/getArticles.actions";
import { getLatestProductsByCategory } from "@/features/products/actions/product.actions";
import { getBulkLikeStatus } from "@/features/user/actions/wishlist.actions";

export default async function Home() {
const [indoorLatest, decorationLatest, giftLatest, latestPostsResult, mostViewedPostsResult] = await Promise.all([
    getLatestProductsByCategory("indoor", 8),
    getLatestProductsByCategory("decoration", 8),
    getLatestProductsByCategory("gift", 8),
    getArticles({ sort: "newest", limit: 4 }),
    getArticles({ sort: "most_viewed", limit: 4 }),
  ]);

  const indoorIds = indoorLatest.map((p) => p._id);
  const decorationIds = decorationLatest.map((p) => p._id);
  const giftIds = giftLatest.map((p) => p._id);

  const [indoorLikeStatuses, decorationLikeStatuses, giftLikeStatuses] = await Promise.all([
    getBulkLikeStatus(indoorIds),
    getBulkLikeStatus(decorationIds),
    getBulkLikeStatus(giftIds),
  ]);

   const latestPosts = latestPostsResult.articles;
  const mostViewedPosts = mostViewedPostsResult.articles;

  return (
    <main className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection />

      <ProductSlider
        title="گیاهان آپارتمانی"
        products={indoorLatest}
        link="/products?category=indoor&sort=newest&view=grid"
        likeStatuses={indoorLikeStatuses}
      />

      <BlogSlider posts={latestPosts} title="آخرین مقالات" link="/blog" />
      <PlantDoctorServices />

      <ProductSlider
        title="گیاهان دکوراتیو"
        products={decorationLatest}
        link="/products?category=decoration&sort=newest&view=grid"
        likeStatuses={decorationLikeStatuses}
      />

      <BlogSlider posts={mostViewedPosts} title="پربازدید ترین مقالات" link="/blog?sort=most_viewed&page=1" />

      <ProductSlider
        title="گیاهان کادویی"
        products={giftLatest}
        link="/products?category=gift&sort=newest&view=grid"
        likeStatuses={giftLikeStatuses}
      />
    </main>
  );
}