import Link from "next/link";
import Image from "next/image";

const BannerSection = () => {
  return (
    <section className="mt-20 flex items-center justify-between px-5 max-lg:mt-16 max-md:flex-col-reverse max-md:gap-y-4 max-sm:p-0">
      <div>
        <Link href="/">
          <Image
            alt="banner"
            width={600}
            height={240}
            src="/images/banner1.png"
          />
        </Link>
      </div>
      <div>
        <Link href="/">
          <Image
            alt="banner"
            width={600}
            height={240}
            src="/images/banner2.png"
          />
        </Link>
      </div>
    </section>
  );
};
export default BannerSection;
