import ContactForm from "@/components/features/contact/ContactForm";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import {
  STORE_ADDRESS,
  STORE_EMAIL_ADDRESS,
  STORE_GOOGLE_MAPS_IFRAME_LINK,
  STORE_INSTAGRAM,
  STORE_LOCATION,
  STORE_PHONE_NUMBER,
  STORE_TELEGRAM,
  STORE_WHATSAPP,
} from "@/lib/constants/";
import { toPersianCode } from "@/lib/utils/format";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <main className="container">
      <Breadcrumb />
      <section className="border-neutral4 shadow-xl rounded-xl border bg-white p-6 max-sm:px-4">
        <div className="space-y-2">
          <h4 className="leading-6 font-bold">تماس با ما</h4>
          <p className="text-neutral10 text-sm/6 font-medium">
            پیام خود را از طریق فرم زیر ارسال کنید. کارشناسان ما پس از بررسی، با
            شما تماس خواهند گرفت.
          </p>
        </div>
        <div className="mt-4 flex gap-x-8 gap-y-4 max-lg:gap-x-6 max-md:flex-col">
          <ContactForm />
          <div className="flex basis-1/2 flex-col gap-y-3">
            <div className="border-neutral3 h-61 w-full overflow-hidden rounded-xl border">
              <iframe
                src={STORE_GOOGLE_MAPS_IFRAME_LINK}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="نقشه فروشگاه"
              ></iframe>
            </div>
            <div className="border-neutral3 shadow-lg space-y-3 rounded-xl border p-3 text-sm/6">
              <div className="flex items-center justify-between">
                <span className="text-neutral9 font-medium">تلفن:</span>
                <Link
                  href="tel:09371921199"
                  className="text-primary hover:text-shade2 transition-colors"
                >
                  {toPersianCode(STORE_PHONE_NUMBER)}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral9 font-medium">ایمیل:</span>
                <span className="text-primary">{STORE_EMAIL_ADDRESS}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral9 font-medium">
                  شبکه‌های اجتماعی:
                </span>
                <div className="flex gap-x-2">
                  <Link href={STORE_INSTAGRAM}>
                    <FaInstagram className="size-6 text-[#E338C3]" />
                  </Link>
                  <Link href={STORE_TELEGRAM}>
                    <FaTelegram className="size-6 text-[#2AABEE]" />
                  </Link>
                  <Link href={STORE_WHATSAPP}>
                    <FaWhatsapp className="size-6 text-[#25D366]" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-y-2">
                <span className="text-neutral9 font-medium">آدرس فروشنده:</span>
                <Link
                  href={STORE_LOCATION}
                  className="hover:text-primary max-w-57.5 transition-colors"
                >
                  <span className="text-neutral10 hover:text-primary transition-colors">
                    {STORE_ADDRESS}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
