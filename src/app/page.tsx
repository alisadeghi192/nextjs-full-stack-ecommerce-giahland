"use client";
import ServicesSection from "./components/features/landing/ServicesSection";
import HeroSection from "./components/features/landing/HeroSection";
import BannerSection from "./components/features/landing/BannerSection";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  MdNavigateBefore,
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineNavigateNext,
} from "react-icons/md";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
export default function Home() {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className="container">
      <HeroSection />
      <ServicesSection />
      <BannerSection />

      <div className="relative mt-16">
        <h4 className="text-primary mb-6 text-2xl/8.5 font-bold">
          گیاهان آپارتمانی
        </h4>
        <div className="relative">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onMouseEnter={() => {
              if (swiperRef.current?.autoplay) {
                swiperRef.current.autoplay.stop();
              }
            }}
            onMouseLeave={() => {
              if (swiperRef.current?.autoplay) {
                swiperRef.current.autoplay.start();
              }
            }}
            navigation={false}
            rewind={true}
            loop={true}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              380: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              400: {
                slidesPerView: 1.75,
                spaceBetween: 16,
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              600: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            slidesPerView={4}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
                <Image
                  alt="succulent"
                  src="/Houseplant/BabaAdam.png"
                  width={256}
                  height={261}
                  className="self-center"
                />
                <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
                  <Link href="/">
                    <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
                      گیاه طبیعی بابا آدم
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm/5.5 max-sm:text-base/7.25">
                      قیمت:
                    </span>
                    <span className="text-lg/8 max-sm:text-base/7.25">
                      {(852000).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <button className="text-WHITE bg-primary flex h-10 w-full items-center justify-center rounded-lg">
                  <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
                <Image
                  alt="succulent"
                  src="/Houseplant/BabaAdam.png"
                  width={256}
                  height={261}
                  className="self-center"
                />
                <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
                  <Link href="/">
                    <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
                      گیاه طبیعی بابا آدم
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm/5.5 max-sm:text-base/7.25">
                      قیمت:
                    </span>
                    <span className="text-lg/8 max-sm:text-base/7.25">
                      {(852000).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <button className="text-WHITE bg-primary flex h-10 w-full items-center justify-center rounded-lg">
                  <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
                <Image
                  alt="succulent"
                  src="/Houseplant/BabaAdam.png"
                  width={256}
                  height={261}
                  className="self-center"
                />
                <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
                  <Link href="/">
                    <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
                      گیاه طبیعی بابا آدم
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm/5.5 max-sm:text-base/7.25">
                      قیمت:
                    </span>
                    <span className="text-lg/8 max-sm:text-base/7.25">
                      {(852000).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <button className="text-WHITE bg-primary flex h-10 w-full items-center justify-center rounded-lg">
                  <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
                <Image
                  alt="succulent"
                  src="/Houseplant/BabaAdam.png"
                  width={256}
                  height={261}
                  className="self-center"
                />
                <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
                  <Link href="/">
                    <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
                      گیاه طبیعی بابا آدم
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm/5.5 max-sm:text-base/7.25">
                      قیمت:
                    </span>
                    <span className="text-lg/8 max-sm:text-base/7.25">
                      {(852000).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <button className="text-WHITE bg-primary flex h-10 w-full items-center justify-center rounded-lg">
                  <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
                <Image
                  alt="succulent"
                  src="/Houseplant/BabaAdam.png"
                  width={256}
                  height={261}
                  className="self-center"
                />
                <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
                  <Link href="/">
                    <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
                      گیاه طبیعی بابا آدم
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm/5.5 max-sm:text-base/7.25">
                      قیمت:
                    </span>
                    <span className="text-lg/8 max-sm:text-base/7.25">
                      {(852000).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <button className="text-WHITE bg-primary flex h-10 w-full items-center justify-center rounded-lg">
                  <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
                <Image
                  alt="succulent"
                  src="/Houseplant/BabaAdam.png"
                  width={256}
                  height={261}
                  className="self-center"
                />
                <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
                  <Link href="/">
                    <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
                      گیاه طبیعی بابا آدم
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm/5.5 max-sm:text-base/7.25">
                      قیمت:
                    </span>
                    <span className="text-lg/8 max-sm:text-base/7.25">
                      {(852000).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>
                <button className="text-WHITE bg-primary flex h-10 w-full items-center justify-center rounded-lg">
                  <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="text-primary max-sm:hidden border-primary absolute -top-15 left-51/100 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white"
          >
            <MdOutlineNavigateNext size={24} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="text-primary max-sm:hidden border-primary absolute -top-15 right-51/100 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white"
          >
            <MdNavigateBefore size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
