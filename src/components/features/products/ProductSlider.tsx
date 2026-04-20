"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { ProductType } from "@/features/products/types/product.types";
import ProductCardGrid from "./ProductCardGrid";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

interface ProductSliderProps {
  title: string;
  products: ProductType[];
  link: string;
}

export default function ProductSlider({
  title,
  products,
  link,
}: ProductSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mt-16 max-sm:mt-10">
      <Link href={link}>
        <h4 className="text-primary hover:text-shade2 mb-6 text-2xl/8.5 font-bold transition-colors max-sm:text-xl/7 max-sm:font-semibold">
          {title}
        </h4>
      </Link>
      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          navigation={false}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.25, spaceBetween: 16 },
            320: { slidesPerView: 1.25, spaceBetween: 16 },
            350: { slidesPerView: 1.5, spaceBetween: 16 },
            380: { slidesPerView: 1.5, spaceBetween: 16 },
            400: { slidesPerView: 1.75, spaceBetween: 16 },
            500: { slidesPerView: 2.25, spaceBetween: 16 },
            600: { slidesPerView: 2.5, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="h-auto">
              <ProductCardGrid {...product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="text-primary border-primary hover:bg-primary hover:border-primary absolute -top-15 left-51/100 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:text-white max-sm:hidden"
        >
          <MdOutlineNavigateNext size={24} />
        </button>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="text-primary border-primary hover:bg-primary hover:border-primary absolute -top-15 right-51/100 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:text-white max-sm:hidden"
        >
          <MdNavigateBefore size={24} />
        </button>
      </div>
    </section>
  );
}
