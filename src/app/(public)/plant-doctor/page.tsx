import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import Image from "next/image";
import React from "react";

export default function PlantDoctorPage() {
  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <div className="border-neutral4 m-auto flex w-80/100 items-center justify-center gap-x-20 rounded-2xl border max-xl:w-full max-lg:gap-x-10 max-md:flex-col max-md:p-4">
          <Image
            alt="plant-doctor"
            src={"/images/plantDoctor.png"}
            width={600}
            height={380}
            className="max-lg:w-100"
          />
          <div className="text-center">
            <h1 className="text-primary text-2xl/11 font-bold">
              گیاه پزشک آنلاین
            </h1>
            <p className="mt-4 mb-6 text-lg/8">عکس بفرست ، نسخه بگیر</p>
            <button className="text-WHITE bg-primary m-auto flex h-10 w-34 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-shade2">
              مشاره با پزشک
            </button>
          </div>
        </div>
        <div className="mx-auto w-80/100 max-xl:w-full">
          <h2 className="max-xs:text-base max-xs:mt-8 mt-10 mb-4 text-lg/8 font-bold">
            گیاه پزشک آنلاین؛ نجات‌دهنده سبز خانه شما
          </h2>
          <p className="text-neutral10 max-xs:text-sm/6.25 text-justify leading-7.25">
            در سال‌های اخیر، بسیاری از علاقه‌مندان به گل و گیاه با مشکلاتی مانند
            زرد شدن برگ‌ها، آفات، قارچ‌ها و پوسیدگی ریشه مواجه‌اند. اما همیشه
            وقت یا امکان مراجعه حضوری به متخصص وجود ندارد. در چنین شرایطی، گیاه
            پزشک آنلاین به‌عنوان یک راه‌حل سریع، آسان و کارآمد وارد میدان شده
            است. در مجموعه گل و گیاه آبشاری ما با فراهم کردن امکان مشاوره رایگان
            گیاهپزشکی به‌صورت آنلاین، تلاش کرده‌ایم تا هرکسی بتواند بدون نیاز به
            جابجایی گیاه، از راهنمایی یک کارشناس واقعی بهره‌مند شود.
          </p>
          <h2 className="max-xs:text-base max-xs:mt-8 mt-10 mb-4 text-lg/8 font-bold">
            گیاه پزشک آنلاین دقیقاً چیست؟
          </h2>
          <p className="text-neutral10 max-xs:text-sm/6.25 text-justify leading-7.25">
            گیاه پزشک آنلاین یک کارشناس متخصص در زمینه سلامت گیاهان است که
            به‌صورت غیرحضوری (از طریق واتساپ، تماس تصویری یا ارسال عکس) وضعیت
            گیاه شما را بررسی و علت مشکل را تشخیص می‌دهد. این نوع مشاوره به‌ویژه
            برای افرادی که در خانه گل‌های متنوع دارند اما زمان کافی برای مراجعه
            حضوری ندارند، بسیار مفید است.
            <br /> در این خدمات، شما کافی است چند عکس واضح از گیاه و محیط
            نگهداری آن ارسال کنید تا کارشناس پس از بررسی، علت مشکل را تشخیص داده
            و راهکار درمانی ارائه دهد. در صورت نیاز، حتی برنامه‌ای برای آبیاری،
            کوددهی یا سم‌پاشی مناسب برای همان گیاه به شما داده می‌شود.
          </p>
        </div>
        <div className="border-neutral4 mx-auto mt-10 w-fit overflow-hidden rounded-2xl border">
          <Image
            alt="plant-doctor"
            src={"/images/plantDoctor2.jpg"}
            width={450}
            height={350}
          />
        </div>
        <div className="mx-auto w-80/100 max-xl:w-full">
          <h2 className="max-xs:text-base max-xs:mt-8 mt-10 mb-4 text-lg/8 font-bold">
            چه مشکلاتی با گیاه پزشک آنلاین قابل حل است؟
          </h2>
          <p className="text-neutral10 max-xs:text-sm/6.25 text-justify leading-7.25">
            بسیاری از مشکلات رایج گیاهان آپارتمانی را می‌توان با یک مشاوره
            آنلاین دقیق برطرف کرد، از جمله:
          </p>
          <ul className="text-neutral10 max-xs:text-sm/6.25 list-disc pr-6 text-justify leading-7.25">
            <li>زرد یا قهوه‌ای شدن برگ‌ها</li>
            <li>خشک شدن ساقه یا نوک برگ‌ها</li>
            <li>آفات ریز مانند کنه، شپشک یا مگس سفید</li>
            <li>قارچ‌های سفید یا خاک کپک‌زده</li>
            <li>پوسیدگی ریشه</li>
            <li>توقف رشد گیاه</li>
            <li>لکه‌های سیاه یا سوختگی برگ‌ها</li>
          </ul>
          <p className="text-neutral10 max-xs:text-sm/6.25 text-justify leading-7.25">
            کارشناس با توجه به نوع گیاه (مثلاً پتوس، فیکوس، بنجامین، سانسوریا،
            آگلونما و...) و شرایط محیطی (نور، خاک، دما و رطوبت)، علت را شناسایی
            کرده و نسخه درمانی متناسب ارائه می‌کند.
          </p>
          <button className="text-WHITE bg-primary max-xs:mt-8 max-xs:w-full m-auto mt-10 flex h-10 w-52.5 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-shade2">
            شروع مشاوره
          </button>
        </div>
      </section>
    </main>
  );
}
