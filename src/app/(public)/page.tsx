import ServicesSection from "@/components/features/landing/ServicesSection";
import HeroSection from "@/components/features/landing/HeroSection";
import BannerSection from "@/components/features/landing/BannerSection";
import ProductSlider from "@/components/features/products/ProductSlider";
import BlogSlider from "@/components/features/blog/BlogSlider";
import PlantDoctorServices from "@/components/features/landing/PlantDoctorServices";
import { fakeProducts } from "@/data/products";
import { getLatestProducts } from "@/features/products/utils/productHelpers";


const blogPosts = [
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/images/blog-covers/plant5.png",
    slug: "/blog/bonsai-care",
  },
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/images/blog-covers/plant6.png",
    slug: "/blog/bonsai-care",
  },
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/images/blog-covers/plant7.png",
    slug: "/blog/bonsai-care",
  },
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/images/blog-covers/plant8.png",
    slug: "/blog/bonsai-care",
  },
];

export default function Home() {
  const indoorLatest = getLatestProducts(fakeProducts , "indoor" , 8)
  const decorationLatest = getLatestProducts(fakeProducts , "decoration" , 8)
  const giftLatest = getLatestProducts(fakeProducts , "gift" , 8)
  return (
    <main className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection />
      <ProductSlider title="گیاهان آپارتمانی" products={indoorLatest} />
      <BlogSlider posts={blogPosts} title="مقالات" />
      <PlantDoctorServices />
      <ProductSlider title="گیاهان تزئینی" products={decorationLatest} />
      <BlogSlider posts={blogPosts} title="مقالات" />
      <ProductSlider title="گیاهان کادویی" products={giftLatest} />
    </main>
  );
}