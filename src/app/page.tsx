
import ServicesSection from "./components/features/landing/ServicesSection";
import HeroSection from "./components/features/landing/HeroSection";
import BannerSection from "./components/features/landing/BannerSection";
import ProductSlider from "./components/features/products/ProductSlider";
import BlogSlider from "./components/features/blog/BlogSlider";
import PlantDoctorServices from "./components/features/landing/PlantDoctorServices";

const indoorPlants = [
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/Succulent.png",
    slug: "/",
  },
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/BabaAdam.png",
    slug: "/",
  },
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/BabaAdam.png",
    slug: "/",
  },
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/BabaAdam.png",
    slug: "/",
  },
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/BabaAdam.png",
    slug: "/",
  },
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/BabaAdam.png",
    slug: "/",
  },
  {
    name: "گیاه طبیعی بابا آدم",
    price: 852000,
    image: "/Houseplant/BabaAdam.png",
    slug: "/",
  },
];

const blogPosts = [
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/blog-covers/plant5.png",
    slug: "/blog/bonsai-care",
  },
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/blog-covers/plant6.png",
    slug: "/blog/bonsai-care",
  },
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/blog-covers/plant7.png",
    slug: "/blog/bonsai-care",
  },
  {
    title: "چطور . چگونه نگهداری کنیم : تاریخچه بونسای و شرایط نگهداری اصولی",
    image: "/blog-covers/plant8.png",
    slug: "/blog/bonsai-care",
  },
];

export default function Home() {
  return (
    <section className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection />
      <ProductSlider title="گیاهان آپارتمانی" products={indoorPlants} />
      <BlogSlider posts={blogPosts} title="مقالات" />
      <PlantDoctorServices />
      <ProductSlider title="گیاهان تزئینی" products={indoorPlants} />
      <BlogSlider posts={blogPosts} title="مقالات" />

    </section>
  );
}