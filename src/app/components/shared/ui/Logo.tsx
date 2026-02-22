import Link from "next/link";

interface LogoProps {
  pageSize: "desktop" | "mobile";
}

const Logo = ({ pageSize }: LogoProps) => {
  if (pageSize == "desktop") {
    return (
      <Link href="/">
        <h4 className="text-primary hover:text-shade3 text-2xl/8.5 font-bold transition-colors">
          گیاه لند
        </h4>
      </Link>
    );
  }

  return (
    <Link href="/">
      <h6 className="text-primary leading-5.5 font-medium sm:text-xl">
        گیاه لند
      </h6>
    </Link>
  );
};
export default Logo;
