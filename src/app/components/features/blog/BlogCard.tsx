// components/features/blog/BlogCard.tsx
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

interface BlogCardProps {
  title: string;
  image: string;
  slug?: string;
}

export default function BlogCard({ title, image, slug = "/" }: BlogCardProps) {
  return (
    <div 
      className="relative flex h-60 max-w-72 flex-col justify-between overflow-hidden rounded-lg bg-cover bg-center px-5 py-7 max-sm:max-w-54"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="from-primary absolute inset-0 bg-linear-to-b to-[#75E59B] opacity-30"></div>
      <h5 className="text-WHITE relative z-10 line-clamp-4 w-full text-xl/8 font-semibold max-sm:text-base/7 max-sm:font-medium">
        {title}
      </h5>
      <Link
        href={slug}
        className="border-WHITE relative z-10 flex max-w-fit items-center justify-between gap-x-2 rounded-xl border px-4.5 py-2 text-lg/8 text-white"
      >
        <span className="text-lg/8 max-sm:text-sm/5.5 max-sm:font-medium">
          مشاهده مقاله
        </span>
        <MdOutlineArrowBack className="text-WHITE size-6" />
      </Link>
    </div>
  );
}