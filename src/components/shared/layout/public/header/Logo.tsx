import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-x-1">
      <Image
        alt="giahland logo"
        src={"/static/images/logo.webp"}
        width={38}
        height={38}
        className="max-lg:size-8"
      />

      <span className="text-primary text-nowrap group-hover:text-shade3 text-2xl/8.5 max-lg:text-xl font-bold transition-colors max-sm:text-lg">
        گیاه لند
      </span>
    </Link>
  );
};

export default Logo;
