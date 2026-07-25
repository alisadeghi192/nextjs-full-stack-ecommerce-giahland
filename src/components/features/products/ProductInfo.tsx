import { toStyledSlug } from "@/lib/utils/format";

interface ProductInfoProps {
  name: string;
  slug : string
  stock: number;
  nameClassName: string;
}

export default function ProductInfo({ 
  name, 
  slug = "plant", 
  stock, 
  nameClassName = "" 
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <p className={`group-hover:text-primary transition ${stock === 0 ? "text-neutral9" : ""} ${nameClassName}`}>
        {name}
      </p>
      <p className="text-neutral9 line-clamp-1 text-sm/6.25">
        {toStyledSlug(slug)}
      </p>
    </div>
  );
}