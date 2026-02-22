import ServicesSection from "./components/features/landing/ServicesSection";
import HeroSection from "./components/features/landing/HeroSection";
export default function Home() {
  return (
    <section className="container">
      <HeroSection />
      <ServicesSection />
    </section>
  );
}
