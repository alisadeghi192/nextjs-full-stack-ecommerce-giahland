
import ServicesSection from "./components/features/landing/ServicesSection";
import HeroSection from "./components/features/landing/HeroSection";
import BannerSection from "./components/features/landing/BannerSection";
export default function Home() {
  return (
    <section className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection/>
    </section>
  );
}
