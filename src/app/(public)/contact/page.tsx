import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import FormField from "@/components/shared/ui/FormField";
import TextareaField from "@/components/shared/ui/TextareaField";
import Image from "next/image";
import React from "react";
import {
  MdDriveFileRenameOutline,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";

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
          <form className="basis-1/2 space-y-3">
            <FormField
              icon={<MdDriveFileRenameOutline size={22} />}
              type="text"
              name="contact-name"
              label="نام و نام خانوادگی"
            />
            <FormField
              icon={<MdDriveFileRenameOutline size={22} />}
              type="text"
              name="contact-phone"
              label="شماره موبایل"
            />
            <FormField
              icon={<MdDriveFileRenameOutline size={22} />}
              type="text"
              name="contact-subject"
              label="موضوع"
            />
            <TextareaField
              icon={<MdDriveFileRenameOutline size={22} />}
              name="contact-message"
              label="متن پیام"
              rows={3}
            />
            <div className="text-neutral9 border-neutral6 rounded-xl border px-4 py-2.5">
              <label className="flex items-center justify-between rounded-xl leading-6 font-medium">
                <div className="flex gap-x-2">
                  <input type="checkbox" hidden className="peer" />
                  <MdCheckBoxOutlineBlank className="text-primary size-6 peer-checked:hidden" />
                  <MdCheckBox className="text-primary hidden size-6 peer-checked:block" />
                  من ربات نیستم
                </div>
                <Image
                  alt="recaptcha"
                  src={"/static/images/recaptcha.png"}
                  width={44}
                  height={44}
                />
              </label>
            </div>
            <PrimaryButton className="mt-4 h-12 w-full text-lg">
              ارسال
            </PrimaryButton>
          </form>
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
                  <span className="text-neutral10 hover:text-primary  transition-colors">
                    آدرس: تهران ، بزرگراه محلاتی، نبرد جنوبی، خیابان زمزم، بازار
                    گل محلاتی
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
