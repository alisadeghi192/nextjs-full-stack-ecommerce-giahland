"use client";

import { BlogPostCard } from "@/features/blog/types/blog.types";
import { BLOG_SWIPER_AUTOPLAY_DELAY, BLOG_SWIPER_BREAKPOINTS, BLOG_SWIPER_SPACE_BETWEEN } from "@/lib/constants";
import Link from "next/link";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";


import { MdKeyboardArrowLeft } from "react-icons/md";
import "swiper/css";

interface BlogSliderProps {
  posts: BlogPostCard[];
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
          spaceBetween={BLOG_SWIPER_SPACE_BETWEEN}
          autoplay={{
            delay: BLOG_SWIPER_AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={BLOG_SWIPER_BREAKPOINTS}
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
