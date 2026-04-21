import { blogPosts } from "@/data/blogs";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import {
  MdOutlineAccountCircle,
  MdOutlineCalendarMonth,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Image from "next/image";
import type { ContentBlock } from "@/features/blogs/types/blog.types";

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

import React from "react";

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="text-neutral10 max-xs:text-sm/6.25 mb-10 text-justify leading-7.25 max-sm:mb-6"
        >
          {block.data.text}
        </p>
      );

    case "image":
      return (
        <figure key={index} className="my-8">
          <div className="relative aspect-video w-full">
            <Image
              src={block.data.src}
              alt={block.data.alt}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {block.data.caption && (
            <figcaption className="text-neutral8 mt-3 text-center text-sm italic">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case "heading":
      const level = block.data.level || 2;
      const HeadingTag = `h${level}` as `h${1 | 2 | 3 | 4 | 5 | 6}`;
      return (
        <HeadingTag
          key={index}
          className="text-neutral12 max-xs:mt-7 max-xs:text-base mt-10 mb-4 text-xl font-semibold max-sm:text-lg"
        >
          {block.data.text}
        </HeadingTag>
      );

    case "bulletList":
      return (
        <ul
          key={index}
          className="text-neutral10 max-xs:text-sm/6.25 mr-6 mb-4 list-disc space-y-2"
        >
          {block.data.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "orderedList":
      return (
        <ol
          key={index}
          className="text-neutral10 max-xs:text-sm/6.25 mr-6 mb-4 list-decimal space-y-2"
        >
          {block.data.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    default:
      return null;
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = params;

  const post = blogPosts.find(
    (post) => post.category === category && post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="container">
      <Breadcrumb title={post?.title} />
      <div className="mx-auto mt-10 w-80/100 max-lg:w-full max-md:mt-8 max-sm:mt-4">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <h1 className="text-3xl font-semibold max-lg:text-2xl max-sm:text-xl">
            {post.title}
          </h1>
          <div className="mr-auto flex items-center justify-center gap-x-0.5">
            <MdOutlineRemoveRedEye className="text-neutral9 size-5" />
            <span className="text-neutral9 text-sm">
              تعداد بازدید: {post.views}
            </span>
          </div>
        </div>
        <div className="border-neutral3 mt-7 rounded-xl border p-3 shadow-lg max-sm:mt-4">
          <Image
            alt={post.title}
            src={post.mainImage}
            width={914}
            height={300}
            className="w-full rounded-2xl"
          />
          <p className="text-neutral10 mt-4 text-justify leading-7.25 max-sm:text-sm/6.25">
            {post.excerpt}
          </p>
          <div className="text-neutral9 mt-4 flex items-center justify-between text-sm">
            <span className="flex items-center justify-between gap-1">
              <MdOutlineAccountCircle className="size-5" /> {post.author}
            </span>
            <span className="flex items-center justify-between gap-1">
              <MdOutlineCalendarMonth className="size-5" />{" "}
              {new Date(post.publishedAt).toLocaleDateString("fa-IR")}
            </span>
          </div>
        </div>

        <div className="mt-10">
          {post.content?.map((block, index) =>
            renderContentBlock(block, index),
          )}
        </div>
      </div>
    </main>
  );
}
