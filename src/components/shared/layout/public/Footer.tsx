"use client";
import {
  FOOTER_PRODUCTS,
  STORE_INSTAGRAM,
  STORE_LOCATION,
  STORE_PHONE_NUMBER,
  STORE_TELEGRAM,
} from "@/lib/constants";
import { toPersianCode } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiInstagramFill,
  RiMapPin2Fill,
  RiTelegram2Fill,
} from "react-icons/ri";

export default function Footer() {
  const pathname = usePathname();
  const shoudAdjust = pathname === "/cart" || pathname === "/checkout";
  return (
    <footer
      id="footer"
      className={`bg-neutral2 dark:bg-shade5 dark:border-t dark:border-shade4 transition-colors max-xs:mt-6 mt-10 pt-7 pb-10 ${shoudAdjust ? "pb-10 max-md:pb-30" : ""}`}
    >
      <div className="container flex items-baseline justify-between max-xl:gap-12 max-sm:flex-col-reverse">
        <div className="flex basis-124 flex-col gap-x-10 max-sm:basis-full max-sm:gap-x-4">
          <div className="flex flex-col gap-y-6 max-lg:gap-y-4 max-md:gap-y-3">
            <Link
              href="/"
              className="text-primary hover:text-shade2 dark:text-primary-dark transition-colors dark:hover:text-primary max-xs:text-base max-xs:font-medium text-2xl/8.5 font-bold max-md:text-xl"
            >
              گیاه لند
            </Link>
            <p className="text-neutral10 dark:text-text-dark transition-colors max-xs:text-[12px] text-justify leading-7.25 max-md:text-sm/6">
              گیاه لند سعی بر این دارد با ارائه خدمات نوین در حوزه فروش گیاهان
              باعث راحتی شما در خرید انواع گیاه شود.تنوع گیاهان و همچنین ایجاد
              بستری مناسب برای مشاوره با گیاه پزشک از دیگر مزیت های گیاه لند
              می‌باشد.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-between max-xl:mt-8">
            <div className="flex flex-col gap-y-4">
              <p className="text-neutral10 text-xl max-md:text-base">
                <span className="dark:text-text-dark transition-colors"> تلفن پشتیبانی :</span>
                <Link
                  href="tel:09371921199"
                  className="hover:text-primary transition-colors dark:text-text-dark"
                >
                  {toPersianCode(STORE_PHONE_NUMBER)}
                </Link>
              </p>
              <div className="flex gap-x-6">
                <Link href={STORE_LOCATION}>
                  <RiMapPin2Fill className="text-neutral10 dark:text-text-dark transition-colors hover:text-primary size-6 cursor-pointer" />
                </Link>
                <Link href={STORE_TELEGRAM}>
                  <RiTelegram2Fill className="text-neutral10 dark:text-text-dark transition-colors hover:text-primary size-6 cursor-pointer" />
                </Link>
                <Link href={STORE_INSTAGRAM}>
                  <RiInstagramFill className="text-neutral10 dark:text-text-dark transition-colors hover:text-primary size-6 cursor-pointer" />
                </Link>
              </div>
            </div>
            <Image
              alt="license"
              src="/static/images/license1.webp"
              height={76}
              width={76}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex basis-150 items-center justify-between max-sm:w-full max-sm:basis-auto">
          {FOOTER_PRODUCTS.map((category) => (
            <div
              className="flex basis-46 flex-col gap-y-2 max-xl:basis-40 max-sm:w-1/3"
              key={category.categoryLink}
            >
              <Link
                href={category.categoryLink}
                className="text-neutral10 dark:text-text-dark dark:border-primary hover:text-primary border-neutral4 max-xs:text-[12px] border-b pb-2 text-xl/7 font-semibold transition-colors max-md:text-base"
              >
                {category.category}
              </Link>
              <div className="flex flex-col gap-y-2">
                {category.data.map((product) => (
                  <Link
                    key={product.label}
                    href={product.link}
                    className="text-neutral10 dark:text-text-dark hover:text-primary max-xs:text-[12px] text-xl/9 transition-colors max-md:text-base"
                  >
                    {product.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
