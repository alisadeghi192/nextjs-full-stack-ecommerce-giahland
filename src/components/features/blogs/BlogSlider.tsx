"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import BlogCard from "./BlogCard";

import "swiper/css";

interface BlogPost {
  title: string;
  coverImage: string;
  slug?: string;
}

interface BlogSliderProps {
  posts: BlogPost[];
  title?: string;
  link: string;
}

export default function BlogSlider({
  posts,
  title = "مقالات",
  link,
}: BlogSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative mt-16 max-sm:mt-10">
      <div className="flex items-center justify-between">
        <Link href={link}>
          <h4 className="text-primary hover:text-shade2 mb-6 text-2xl/8.5 font-bold transition-colors max-sm:text-xl/7 max-sm:font-semibold">
            {title}
          </h4>
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
            500: { slidesPerView: 2, spaceBetween: 16 },
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
