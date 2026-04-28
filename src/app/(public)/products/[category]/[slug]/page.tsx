"use client";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { fakeProducts } from "@/data/products";
import Image from "next/image";
import LikeButton from "@/components/features/products/LikeButton";
import { productTabs } from "@/lib/constants";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineChangeCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import PriceSection from "@/components/features/products/PriceSection";
import { formatPrice } from "@/lib/utils/format";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = fakeProducts.find(
    (p) => p.category === category && p.slug === slug,
  );

  if (!product) {
    notFound();
  }

  const categoryName = productTabs.find((p) => p.id == category)?.label;

  const hasDiscount = product.discount > 0;

  return (
    <main className="container">
      <Breadcrumb title={product.name} />

      <section className="flex items-end gap-x-8">
        <div className="flex basis-220 items-start justify-center gap-x-6">
          {/* gallery */}
          <div className="flex max-h-124 basis-89 flex-col items-center justify-center gap-y-4">
            {/* big pic */}
            <div className="relative cursor-pointer overflow-hidden rounded-lg">
              <Image
                width={356}
                height={366}
                src={product.image}
                alt="babaadam"
                className="object-cover"
                priority
              ></Image>
              <LikeButton className="top-4 right-4" />
            </div>
            {/* thumbnails */}
            <div className="flex justify-between gap-x-3 *:cursor-pointer">
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                ></Image>
              </div>{" "}
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                ></Image>
              </div>{" "}
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                ></Image>
              </div>{" "}
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                ></Image>
              </div>
            </div>
          </div>
          {/* details */}
          <div className="flex basis-125 flex-col">
            {/* header */}
            <div className="border-neutral7 mb-7 flex flex-col gap-y-4 border-b pb-4">
              <span className="text-primary leading-5.5 font-medium">
                نهال و گیاهان {categoryName}
              </span>
              <h2 className="text-neutral12 text-xl font-semibold">
                گیاه طبیعی {product.name}
              </h2>
            </div>
            {/* infos */}
            <div>
              <span className="mb-4 inline-block text-lg/8 font-semibold">
                ویژگی ها
              </span>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">جنس گلدان</span>
                  <span className="text-BLACK leading-7.25">پلاستیکی</span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">خاک گیاه</span>
                  <span className="text-BLACK leading-7.25">
                    خاک گلدانی شنی و غنی
                  </span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">وزن</span>
                  <span className="text-BLACK leading-7.25">4000 گرم</span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">ابعاد</span>
                  <span className="text-BLACK leading-7.25">۲۵x۲۵x۸۰</span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">
                    وضعیت نسبت به آفتاب
                  </span>
                  <span className="text-BLACK leading-7.25">آفتاب دوست</span>
                </div>
                <div className="text-primary mx-auto flex h-10 cursor-pointer items-center gap-x-2 self-end">
                  <span className="text-sm/6.25 font-medium">
                    مشاهده همه ویژگی ها
                  </span>
                  <MdKeyboardArrowDown className="size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div className="border-neutral7 basis-78 rounded-2xl border px-6 py-7.75">
          <div className="space-y-2 border-b pb-6">
            <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
              <MdOutlineChangeCircle className="text-shade1 size-7.5" />
              <span className="text-neutral9 text-sm/6 font-medium">
                7 روز ضمانت بازگشت کالا
              </span>
            </div>
            <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
              <BiSupport className="text-shade1 size-7.5" />
              <span className="text-neutral9 text-sm/6 font-medium">
                پشتیبانی 24 ساعته
              </span>
            </div>
            <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
              <AiOutlineDollarCircle className="text-shade1 size-7.5" />
              <span className="text-neutral9 text-sm/6 font-medium">
                ضمانت بهترین قیمت
              </span>
            </div>
          </div>

          <div className="my-6 flex items-center justify-between">
            <span className="leading-7.25">قیمت:</span>
            <span className="text-xl/9">{formatPrice(product.price)} </span>
          </div>

          <PrimaryButton
            onClick={() => console.log("add to cart")}
            className="text-lg/8 w-full h-12"
          >
            افزودن به سبد خرید
          </PrimaryButton>
        </div>
      </section>
    </main>
  );
}
