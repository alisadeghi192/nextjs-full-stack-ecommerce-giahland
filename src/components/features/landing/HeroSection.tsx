import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import Image from "next/image";
import ConsultationButton from "../plant-doctor/ConsultationButton";
import HeroStatsItem from "./HeroStatsItem";

interface HeroSectionProps {
  indoorCount: number;
  decorationCount: number;
  giftCount: number;
}

const HeroSection = ({
  indoorCount,
  decorationCount,
  giftCount,
}: HeroSectionProps) => {
  return (
    <section className="mt-19 flex items-center justify-between max-xl:gap-x-10 max-md:mt-15 max-md:flex-col-reverse">
      <div className="basis-1/2 max-md:mt-10">
        <h1 className="text-BLACK mb-8 text-[40px]/14 font-bold max-lg:mb-4 max-lg:text-3xl max-md:text-center max-md:text-2xl/7 max-md:font-semibold max-sm:text-xl/7">
          خرید راحت گیاه با،<span className="text-primary"> گیاه لند!</span>
        </h1>
        <p className="text-neutral11 mb-8 max-w-134.75 text-[20px]/9 max-lg:mb-4 max-lg:text-base max-md:mb-6 max-md:text-center max-md:text-base/6.25 max-sm:text-sm">
          با گیاه لند،آنلاین گیاه خودت رو سفارش بده و از تخفیف های ویژه استفاده
          کن.علاوه بر اینها میتونی در قسمت پنل کاربری از گیاه پزشک سایت مشاوره
          بگیری.
        </p>
        <div className="mb-12 flex max-w-134.75 gap-x-5.5 max-lg:flex-col max-lg:gap-y-2 max-md:mb-10 max-md:flex-row max-md:gap-x-3">
          <PrimaryButton
            href="/products?category=discounted&sort=newest&view=grid"
            className="h-14 flex-1 max-lg:basis-14 max-md:h-10"
          >
            <span className="text-lg/8 max-md:text-sm/6.25 max-md:font-medium">
              گیاهان تخفیف دار
            </span>
          </PrimaryButton>
          <ConsultationButton
            className="h-14 flex-1 gap-x-2 border-dashed text-lg max-[350px]:gap-x-0.5 max-lg:basis-14 max-md:h-10"
            variant="outline"
          >
            <span className="text-lg/8 max-md:text-sm/6.25 max-md:font-medium">
              مشاوره با گیاه پزشک
            </span>
          </ConsultationButton>
        </div>
        <div className="font-modam flex gap-x-12 max-md:gap-x-2">
          <HeroStatsItem end={indoorCount} label="گیاه خانگی" />
          <HeroStatsItem end={decorationCount} label="گیاه دکوراتیو" />
          <HeroStatsItem end={giftCount} label="گیاه کادویی" />
        </div>
      </div>
      <div className="basis-1/2">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/static/images/hero-mobile.webp"
          />
          <Image
            alt="giahland"
            src="/static/images/hero-desktop.webp"
            width={574}
            height={558}
            className="justify-self-end"
            priority
          />
        </picture>
      </div>
    </section>
  );
};
export default HeroSection;
