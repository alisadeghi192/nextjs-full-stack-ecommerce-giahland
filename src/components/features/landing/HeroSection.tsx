"use client";

import Image from "next/image";
import { MdOutlineArrowBack } from "react-icons/md";
import HeroStatsItem from "./HeroStatsItem";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import OutlineButton from "@/components/shared/ui/OutlineButton";

const HeroSection = () => {
  return (
    <section className="mt-19 flex items-center justify-between max-xl:gap-x-10 max-md:mt-15 max-md:flex-col-reverse">
      <div className="basis-1/2 max-md:mt-10">
        <h1 className="text-BLACK mb-8 text-[40px]/14 font-bold max-lg:mb-4 max-lg:text-3xl max-md:text-center max-md:text-2xl/7 max-md:font-semibold max-sm:text-xl/7">
          خرید راحت گیاه با،<span className="text-primary"> گیاه لند!</span>
        </h1>
        <p className="text-neutral11 mb-8 max-w-134.75 text-[20px]/9 max-lg:mb-4 max-lg:text-base max-md:mb-6 max-md:text-center max-md:text-base/6.25 max-sm:text-sm">
          با گیاه لند،آنلاین گیاه خودت رو سفارش بده و از تخفیف های ویژه استفاده
          کن.علاوه بر اینها میتونی به صورت رایگان از گیاه پزشک سایت مشاوره
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
          <OutlineButton className=" h-14 flex-1 gap-x-2 border-dashed text-lg max-lg:basis-14 max-md:h-10 max-[350px]:gap-x-0.5">
            <span className="text-lg/8 max-md:text-sm/6.25 max-md:font-medium">
              مشاوره با گیاه پزشک
            </span>
            <MdOutlineArrowBack className="size-6 max-md:size-4" />
          </OutlineButton>
        </div>
        <div className="font-modam flex gap-x-12 max-md:gap-x-2">
          <HeroStatsItem end={943} label="گیاه خانگی" />
          <HeroStatsItem end={234} label="گیاه دکوراتیو" />
          <HeroStatsItem end={128} label="گیاه کادویی" />
        </div>
      </div>
      <div className="basis-1/2">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/static/images/hero-mobile.png"
          />
          <Image
            alt="giahland"
            src="/static/images/hero-desktop.png"
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
