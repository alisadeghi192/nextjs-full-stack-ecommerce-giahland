import { BlogPostCard } from "@/features/blog/types/blog.types";
import Link from "next/link";
import { MdOutlineAccountCircle, MdOutlineCalendarMonth } from "react-icons/md";

export default function BlogCard({
  title,
  coverImage,
  slug,
  excerpt,
  author,
  category,
  publishedAt,
  usedInSlider=false
}: BlogPostCard) {
  return (
    <>
      <div className={`text-white ${usedInSlider ? "" : "shadow-lg"} overflow-hidden rounded-xl w-full`}>
        <Link href={`/blog/${category}/${slug}`}>
          <div
            className="max-xs:h-80 relative  flex h-94.5 justify-self-center max-w-72 flex-col justify-between overflow-hidden rounded-xl bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="from-primary absolute inset-0 bg-linear-to-b to-[#75E59B] opacity-30"></div>
            <div className="border-white z-10 flex h-full flex-col justify-between border-b pb-4">
              <h5 className="max-xs:line-clamp-3 line-clamp-4 text-xl/7 font-semibold max-sm:text-lg">
                {title}
              </h5>
              <p className="max-xs:line-clamp-4 mt-auto line-clamp-5 leading-5.5">
                {excerpt}
              </p>
            </div>
            <div className="max-xs:text-xs z-10 mt-4 flex items-center justify-between gap-y-2 max-[600px]:flex-col">
              <span className="max-xs:text-xs flex items-center justify-center gap-x-0.5 self-start text-sm">
                <MdOutlineAccountCircle className="size-5" />
                {author.firstName} {author.lastName}
              </span>
              <span className="max-xs:text-xs flex items-center justify-center gap-x-0.5 self-start text-sm">
                {publishedAt?.toLocaleDateString("fa-IR")}
                <MdOutlineCalendarMonth className="size-5" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
