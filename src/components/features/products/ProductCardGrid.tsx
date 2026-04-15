import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";



export default function ProductCardGrid({
  name,
  price,
  image,
  slug = "/",
}: Product) {
  return (
    <div className="border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-6 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
      <Image
        alt={name}
        src={image}
        width={256}
        height={261}
        className="self-center object-cover aspect-square rounded-lg "
      />
      <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
        <Link href={slug}>
          <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25">
            {name}
          </p>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-sm/5.5 max-sm:text-base/7.25">قیمت:</span>
          <span className="text-lg/8 max-sm:text-base/7.25">
            {price.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
      <Link href={slug}>
        <button className="text-WHITE cursor-pointer bg-primary flex h-10 w-full items-center justify-center rounded-lg">
          <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
        </button>
      </Link>
    </div>
  );
}
