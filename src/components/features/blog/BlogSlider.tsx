'use client'

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import BlogCard from "./BlogCard";

import "swiper/css";

interface BlogPost {
  title: string;
  image: string;
  slug?: string;
}

interface BlogSliderProps {
  posts: BlogPost[];
  title?: string;
}

export default function BlogSlider({ 
  posts, 
  title = "مقالات", 
}: BlogSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mt-16 max-sm:mt-10">
      {/* هدر سکشن */}
      <div className="flex items-center justify-between">
        <h4 className="text-primary mb-6 text-2xl/8.5 font-bold max-sm:font-semibold max-sm:text-xl/7">
          {title}
        </h4>
        <Link className="text-shade3 mb-6 flex items-center gap-x-1" href="/blog">
          <span className="text-xl font-medium max-sm:text-lg">مشاهده همه</span>
          <IoIosArrowBack className="size-6" />
        </Link>
      </div>

      {/* اسلایدر */}
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
          className="blogSwiper"
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <BlogCard {...post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}