import { toPersianDate } from "@/lib/utils/format";
import Image from "next/image";
import { MdOutlineAccountCircle, MdOutlineCalendarMonth } from "react-icons/md";

interface PostMetaProps {
  title: string;
  mainImage: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
}

export default function PostMeta({
  title,
  mainImage,
  excerpt,
  author,
  publishedAt,
}: PostMetaProps) {
  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade3 mt-7 rounded-xl border p-3 shadow-lg max-sm:mt-4">
      <Image
        alt={title}
        src={mainImage}
        width={914}
        height={300}
        className="w-full rounded-2xl"
      />
      <p className="text-neutral10 dark:text-text-dark transition-colors mt-4 text-justify leading-7.25 max-sm:text-sm/6.25">
        {excerpt}
      </p>
      <div className="text-neutral9 dark:text-text-dark transition-colors mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center justify-between gap-1">
          <MdOutlineAccountCircle className="size-5" /> {author}
        </span>
        <span className="flex items-center justify-between gap-1">
          {toPersianDate(new Date(publishedAt))}
          <MdOutlineCalendarMonth className="size-5" />{" "}
        </span>
      </div>
    </div>
  );
}