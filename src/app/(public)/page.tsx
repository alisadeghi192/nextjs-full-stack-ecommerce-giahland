import ServicesSection from "@/components/features/landing/ServicesSection";
import HeroSection from "@/components/features/landing/HeroSection";
import BannerSection from "@/components/features/landing/BannerSection";
import ProductSlider from "@/components/features/products/ProductSlider";
import BlogSlider from "@/components/features/blog/BlogSlider";
import PlantDoctorServices from "@/components/features/landing/PlantDoctorServices";
import { fakeProducts } from "@/data/products";
import { getLatestProducts } from "@/features/products/utils/productHelpers";
import { getLatestPosts, getMostViewedPosts } from "@/features/blog/utils/blogHelpers";



export default function Home() {
  const indoorLatest = getLatestProducts(fakeProducts, "indoor", 8);
  const decorationLatest = getLatestProducts(fakeProducts, "decoration", 8);
  const giftLatest = getLatestProducts(fakeProducts, "gift", 8);
  const latestPosts = getLatestPosts(4)
  const mostViewedPosts = getMostViewedPosts(4)
  return (
    <main className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection />
      <ProductSlider title="گیاهان آپارتمانی" products={indoorLatest} link="/products?category=indoor&sort=newest&view=grid"/>
      <BlogSlider posts={latestPosts} title="آخرین مقالات" link="/blog" />
      <PlantDoctorServices />
      <ProductSlider title="گیاهان دکوراتیو" products={decorationLatest} link="/products?category=decoration&sort=newest&view=grid" />
      <BlogSlider posts={mostViewedPosts} title="پربازدید ترین مقالات" link="/blog?sort=most_viewed&page=1"/>
      <ProductSlider title="گیاهان کادویی" products={giftLatest} link="/products?category=gift&sort=newest&view=grid"/>
    </main>
  );
}
