import { BANNERS } from "@/lib/constants";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

const BannerSection = () => {
  return (
    <section className="mt-20 flex items-center justify-between gap-x-6 max-lg:mt-16 max-lg:gap-x-4 max-md:flex-col-reverse max-md:gap-y-4 max-sm:mt-10">
      {BANNERS.map((banner) => (
        <div
          key={banner.id}
          className="group relative shadow-xl dark:shadow-shade6 w-full overflow-hidden rounded-2xl bg-cover bg-center p-6 font-bold text-white md:h-38 lg:h-51"
          style={{ backgroundImage: `url(${banner.background})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.3),rgba(0,0,0,0.3)),linear-gradient(180deg,rgba(65,127,86,0)_0%,rgba(65,127,86,0.2)_100%)]"></div>
          <div className="transition-transform duration-200 md:group-hover:-translate-x-3 md:group-hover:scale-110 lg:group-hover:-translate-x-5 lg:group-hover:scale-110 xl:group-hover:-translate-x-15 xl:group-hover:scale-120">
            <h3 className="relative z-10 text-start text-[30px]/13.5 max-lg:text-xl max-sm:text-lg/8">
              {banner.title}
            </h3>
            <p className="relative z-10 text-2xl/10.75 max-lg:text-base max-sm:text-sm/6.25">
              {banner.subTitle}
            </p>
          </div>

          <div className="relative z-10 mr-auto w-fit transition-transform duration-200 md:absolute md:left-0 md:-translate-x-50 md:group-hover:translate-x-6">
            <Link
              href={banner.href}
              className="text-primary dark:text-shade4 dark:bg-primary-dark hover:text-shade2 mt-2.5 mr-auto flex cursor-pointer items-center gap-x-2 rounded-lg border bg-[#E3F7EA] px-5 py-2 transition-colors max-lg:px-3 max-sm:gap-x-1 max-sm:px-2 max-sm:py-1 max-sm:text-sm"
            >
              <span className="text-lg/8 max-lg:text-base max-sm:text-sm">
                {banner.buttonText}
              </span>
              <MdKeyboardArrowLeft className="size-6" />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};
export default BannerSection;
