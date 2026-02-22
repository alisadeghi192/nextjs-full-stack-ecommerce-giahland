import ServicesSection from "./components/features/landing/ServicesSection";
import HeroSection from "./components/features/landing/HeroSection";
import BannerSection from "./components/features/landing/BannerSection";
import ProductSlider from "./components/features/products/ProductSlider";

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

export default function Home() {
  return (
    <section className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection />
      <ProductSlider title="گیاهان آپارتمانی" products={indoorPlants} />
    </section>
  );
}
