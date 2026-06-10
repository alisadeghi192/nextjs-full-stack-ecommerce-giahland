"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  MdKeyboardArrowLeft,
  MdNavigateBefore,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { ProductCardData } from "@/features/products/types/product.types";
import ProductCardGrid from "./ProductCardGrid";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { PRODUCT_SWIPER_AUTOPLAY_DELAY, PRODUCT_SWIPER_BREAKPOINTS, PRODUCT_SWIPER_SPACE_BETWEEN } from "@/lib/constants";

interface ProductSliderProps {
  title: string;
  products: ProductCardData[];
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
     <div className="flex items-center justify-between">
        <h4 className="text-primary mb-6 text-2xl/8.5 font-bold max-sm:text-xl/7 max-sm:font-semibold">
          {title}
        </h4>
        <Link
          href={link}
          className="text-primary hover:text-shade2 mb-6 text-xl font-semibold transition-colors max-sm:text-base"
        >
          <div className="flex items-center justify-center">
            <h4 className="">مشاهده همه</h4>
            <MdKeyboardArrowLeft className="size-5" />
          </div>
        </Link>
      </div>

      <div className="relative">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          navigation={false}
          loop={true}
          spaceBetween={PRODUCT_SWIPER_SPACE_BETWEEN}
          autoplay={{
            delay: PRODUCT_SWIPER_AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={PRODUCT_SWIPER_BREAKPOINTS}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
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
