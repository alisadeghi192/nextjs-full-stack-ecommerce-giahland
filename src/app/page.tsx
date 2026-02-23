"use client";

import ServicesSection from "./components/features/landing/ServicesSection";
import HeroSection from "./components/features/landing/HeroSection";
import BannerSection from "./components/features/landing/BannerSection";
import ProductSlider from "./components/features/products/ProductSlider";
import BlogSlider from "./components/features/blog/BlogSlider";
import { RiPlantFill } from "react-icons/ri";

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
      <section className="mt-16 max-sm:mt-10">
        <h4 className="text-primary mb-6 text-2xl/8.5 font-bold max-sm:font-semibold max-sm:text-xl/7">خدمات گیاه پزشکی</h4>
        <div className="max-xs:grid-cols-1 [&>*:nth-child(even)]:max-xs:justify-self-start mt-8 grid grid-cols-4 gap-x-6 gap-y-12 max-xl:grid-cols-3 max-xl:gap-y-10 max-lg:grid-cols-2 max-lg:gap-y-8 max-sm:mt-6 max-sm:grid-cols-1 max-sm:gap-y-6 [&>*:nth-child(even)]:max-sm:justify-self-end">
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
          <div className="flex max-w-76 items-center gap-x-2.25 max-md:gap-x-2">
            <div className="bg-bg-service flex size-17 shrink-0 items-center justify-center rounded-full max-md:size-14">
              <RiPlantFill className="text-primary size-8 max-md:size-6" />
            </div>
            <div className="flex flex-col gap-y-1.5">
              <h6 className="text-neutral12 text-base/8 font-medium text-nowrap max-md:text-sm/5.5">
                از بین بردن عناصر آلوده خاک
              </h6>
              <p className="text-neutral11 text-[12px]/5.5">
                ظاهر گیاه بیانگر مسائل مهمی هست.میتوان با مشاهده ظاهر گیاه آفات
                و ...رامتوجه شد
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
