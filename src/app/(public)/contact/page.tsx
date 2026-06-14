import ContactForm from "@/components/features/contact/ContactForm";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";

export default function page() {
  return (
    <main className="container">
      <Breadcrumb />
      <section className="border-neutral4 rounded-xl border bg-white p-6 max-sm:px-4">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3855.0043980227456!2d51.47482920105349!3d35.66076290704235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f91fd096f2b1da5%3A0xe5f33cd4f5d56b32!2sMahallati!5e0!3m2!1sen!2sde!4v1777991927441!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="نقشه فروشگاه"
              ></iframe>
            </div>
            <div className="border-neutral3 space-y-3 rounded-xl border p-3 text-sm/6">
              <div className="flex items-center justify-between">
                <span className="text-neutral9 font-medium">تلفن:</span>
                <span className="text-primary">09371921199</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral9 font-medium">ایمیل:</span>
                <span className="text-primary">Giahland@gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral9 font-medium">
                  شبکه‌های اجتماعی:
                </span>
                <div className="flex gap-x-2">
                  <Link href="/">
                    <FaInstagram className="size-6 text-[#E338C3]" />
                  </Link>
                  <Link href="/">
                    <FaTelegram className="size-6 text-[#2AABEE]" />
                  </Link>
                  <Link href="/">
                    <FaWhatsapp className="size-6 text-[#25D366]" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-y-2">
                <span className="text-neutral9 font-medium">آدرس فروشنده:</span>
                <Link
                  href={"https://maps.app.goo.gl/ufHFJ7L2YUCvU9mr9"}
                  className="hover:text-primary max-w-57.5 transition-colors"
                >
                  <span className="text-neutral10 hover:text-primary transition-colors">
                    آدرس: تهران ، بزرگراه محلاتی، نبرد جنوبی، خیابان زمزم، بازار
                    گل محلاتی ، گیاه لند
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
