import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { formatDimensions } from "@/lib/utils/format";
import ProductSpecBox from "./ProductSpecBox";

interface ProductSpecsProps {
  potMaterial: string;
  soilType: string;
  weight: number;
  potDimensions: { length: number; width: number; height: number };
  sunlight: string;
}

export default function ProductSpecs({
  potMaterial,
  soilType,
  weight,
  potDimensions,
  sunlight,
}: ProductSpecsProps) {
  return (
    <div>
      <span className="mb-4 inline-block text-lg/8 font-semibold max-sm:mb-2 max-sm:text-base/7.25">
        ویژگی ها
      </span>
      <div className="border-neutral6 grid grid-cols-2 gap-x-6 gap-y-10 max-md:grid-cols-1 max-md:gap-y-2.25 max-sm:gap-y-2 max-sm:border-b max-sm:pb-4">
        <ProductSpecBox label="جنس گلدان" value={potMaterial} />
        <ProductSpecBox label="خاک گیاه" value={soilType} />
        <ProductSpecBox label="وزن" value={`${weight.toLocaleString("fa-IR")} گرم`} />
        <ProductSpecBox label="ابعاد" value={formatDimensions(potDimensions)} />
        <ProductSpecBox label="وضعیت نسبت به آفتاب" value={sunlight} />
        <div className="text-primary mx-auto flex h-10 cursor-pointer items-center gap-x-2 self-end max-md:hidden max-sm:flex">
          <Link href="#features" className="text-sm/6.25 font-medium">
            مشاهده همه ویژگی ها
          </Link>
          <MdKeyboardArrowDown className="size-6" />
        </div>
      </div>
    </div>
  );
}