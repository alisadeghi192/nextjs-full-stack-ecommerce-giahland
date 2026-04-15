import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";


export default function ProductCardList({
  name,
  price,
  image,
  slug = "/",
  category,
  discount
}: Product) {
  return (
    <div className="border border-neutral5 rounded-lg p-4 flex gap-x-6">
      <div className="rounded-lg overflow-hidden">
        <Image alt={name} src={image} width={150} height={150} className="object-cover aspect-square rounded-lg"></Image>
      </div>
      <div className="grow justify-between flex flex-col">
        <div className="flex flex-col ">
          <Link href={slug}>
            <p className=" text-lg/8">{name}</p>
          </Link>
          <p className="text-neutral9 leading-7">{category} </p>
        <p>تخفیف: {discount}%</p>

        </div>
        <div className="flex justify-between  gap-x-6">
          <div className="flex justify-between items-center basis-2/3">
            <span className="text-sm/6.25 ">قیمت:</span>
            <span className="text-lg/8">
            {price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
          <Link href={slug} className="grow">
            <button className="text-WHITE cursor-pointer bg-primary flex h-10 w-full items-center justify-center rounded-lg">
              <span className="text-sm/5.5 font-medium">مشاهده بیشتر</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
