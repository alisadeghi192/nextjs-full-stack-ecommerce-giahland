import ConsultationButton from "@/components/features/plant-doctor/ConsultationButton";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { PLANT_DOCTOR_METADATA } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: PLANT_DOCTOR_METADATA.title,
  description: PLANT_DOCTOR_METADATA.description,
  keywords: PLANT_DOCTOR_METADATA.keywords,
  openGraph: {
    title: PLANT_DOCTOR_METADATA.title,
    description: PLANT_DOCTOR_METADATA.description,
    images: "/static/images/logo.webp",
  },
};

export default function PlantDoctorPage() {
  return (
    <section className="container">
      <Breadcrumb />
      <section className="border-neutral4 dark:bg-shade4 dark:border-neutral10 dark:shadow-shade3 m-auto flex w-80/100 items-center justify-center gap-x-20 rounded-2xl border shadow-xl max-xl:w-full max-lg:gap-x-10 max-md:flex-col max-md:p-4">
        <Image
          alt="plant-doctor"
          src={"/static/images/plantDoctor.webp"}
          width={600}
          height={380}
          className="max-lg:w-100 dark:hidden"
        />
        <Image
          alt="plant-doctor"
          src={"/static/images/plantDoctor-dark.webp"}
          width={600}
          height={380}
          className="hidden max-lg:w-100 dark:block"
        />
        <div className="text-center">
          <h1 className="text-primary text-2xl/11 font-bold transition-colors">
            گیاه پزشک آنلاین
          </h1>
          <p className="mt-4 mb-6 text-lg/8 transition-colors">عکس بفرست ، نسخه بگیر</p>
          <ConsultationButton
            className="m-auto h-10 w-34 rounded-lg!"
            variant="primary"
          >
            مشاوره با پزشک
          </ConsultationButton>
        </div>
      </section>
      <section className="mx-auto w-80/100 max-xl:w-full">
        <h2 className="max-xs:text-base max-xs:mt-8 mt-10 mb-4 text-lg/8 font-bold">
          گیاه پزشک آنلاین؛ نجات‌دهنده سبز خانه شما
        </h2>
        <p className="text-neutral10 dark:text-text-dark max-xs:text-sm/6.25 text-justify leading-7.25">
          در سال‌های اخیر، بسیاری از علاقه‌مندان به گل و گیاه با مشکلاتی مانند
          زرد شدن برگ‌ها، آفات، قارچ‌ها و پوسیدگی ریشه مواجه‌اند. اما همیشه وقت
          یا امکان مراجعه حضوری به متخصص وجود ندارد. در چنین شرایطی، گیاه پزشک
          آنلاین به‌عنوان یک راه‌حل سریع، آسان و کارآمد وارد میدان شده است. در
          مجموعه گل و گیاه آبشاری ما با فراهم کردن امکان مشاوره رایگان گیاهپزشکی
          به‌صورت آنلاین، تلاش کرده‌ایم تا هرکسی بتواند بدون نیاز به جابجایی
          گیاه، از راهنمایی یک کارشناس واقعی بهره‌مند شود.
        </p>
        <h2 className="max-xs:text-base max-xs:mt-8 mt-10 mb-4 text-lg/8 font-bold">
          گیاه پزشک آنلاین دقیقاً چیست؟
        </h2>
        <p className="text-neutral10 dark:text-text-dark max-xs:text-sm/6.25 text-justify leading-7.25">
          گیاه پزشک آنلاین یک کارشناس متخصص در زمینه سلامت گیاهان است که به‌صورت
          غیرحضوری (از طریق واتساپ، تماس تصویری یا ارسال عکس) وضعیت گیاه شما را
          بررسی و علت مشکل را تشخیص می‌دهد. این نوع مشاوره به‌ویژه برای افرادی
          که در خانه گل‌های متنوع دارند اما زمان کافی برای مراجعه حضوری ندارند،
          بسیار مفید است.
          <br /> در این خدمات، شما کافی است چند عکس واضح از گیاه و محیط نگهداری
          آن ارسال کنید تا کارشناس پس از بررسی، علت مشکل را تشخیص داده و راهکار
          درمانی ارائه دهد. در صورت نیاز، حتی برنامه‌ای برای آبیاری، کوددهی یا
          سم‌پاشی مناسب برای همان گیاه به شما داده می‌شود.
        </p>
      </section>
      <section className="border-neutral4 dark:border-neutral10 dark:shadow-shade3 mx-auto mt-10 w-5/10 overflow-hidden rounded-2xl border shadow-lg max-sm:w-full">
        <Image
          alt="plant-doctor"
          src="/static/images/plantDoctor2.webp"
          width={735}
          height={549}
          className="w-full dark:hidden"
        />
        <Image
          alt="plant-doctor"
          src="/static/images/plantDoctor2-dark.webp"
          width={735}
          height={549}
          className="w-full dark:block hidden"
        />
      </section>
      <section className="mx-auto w-80/100 max-xl:w-full">
        <h2 className="max-xs:text-base max-xs:mt-8 mt-10 mb-4 text-lg/8 font-bold">
          چه مشکلاتی با گیاه پزشک آنلاین قابل حل است؟
        </h2>
        <div className="text-neutral10 dark:text-text-dark max-xs:text-sm/6.25 text-justify leading-7.25">
          <p>
            بسیاری از مشکلات رایج گیاهان آپارتمانی را می‌توان با یک مشاوره
            آنلاین دقیق برطرف کرد، از جمله:
          </p>
          <ul className="list-disc pr-6">
            <li>زرد یا قهوه‌ای شدن برگ‌ها</li>
            <li>خشک شدن ساقه یا نوک برگ‌ها</li>
            <li>آفات ریز مانند کنه، شپشک یا مگس سفید</li>
            <li>قارچ‌های سفید یا خاک کپک‌زده</li>
            <li>پوسیدگی ریشه</li>
            <li>توقف رشد گیاه</li>
            <li>لکه‌های سیاه یا سوختگی برگ‌ها</li>
          </ul>
          <p>
            کارشناس با توجه به نوع گیاه (مثلاً پتوس، فیکوس، بنجامین، سانسوریا،
            آگلونما و...) و شرایط محیطی (نور، خاک، دما و رطوبت)، علت را شناسایی
            کرده و نسخه درمانی متناسب ارائه می‌کند.
          </p>
        </div>

        <ConsultationButton
          variant="primary"
          className="max-xs:mt-8 max-xs:w-full m-auto mt-10 h-10 w-52.5 rounded-lg!"
        >
          شروع مشاوره
        </ConsultationButton>
      </section>
    </section>
  );
}
